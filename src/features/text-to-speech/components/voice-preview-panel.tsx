'use client'

import { format } from 'date-fns'
import { DownloadIcon, PauseIcon, PlayIcon, RedoIcon, UndoIcon } from 'lucide-react'
import { useState } from 'react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import VoiceAvatar from '@/components/voice-avatar/voice-avatar'
import { useWaveSurfer } from '@/features/text-to-speech/hooks/use-wavesurfer'
import { cn } from '@/lib/utils'

function formatTime(seconds: number): string {
  return format(new Date(seconds * 1000), 'mm:ss')
}

type VoicePreviewPanelVoice = {
  id?: string
  name: string
}

interface VoicePreviewPanelProps {
  audioUrl: string
  voice: VoicePreviewPanelVoice | null
  text: string
}

const VoicePreviewPanel = ({ audioUrl, voice, text }: VoicePreviewPanelProps) => {
  const [isDownloading, setIsDownloading] = useState(false)

  const selectedVoiceName = voice?.name ?? null
  const selectedVoiceSeed = voice?.id ?? null

  const {
    containerRef,
    isPlaying,
    isReady,
    currentTime,
    duration,
    togglePlayPause,
    seekBackward,
    seekForward,
  } = useWaveSurfer({
    url: audioUrl,
    autoplay: true,
  })

  const handleDownload = () => {
    setIsDownloading(true)

    const safeName =
      text
        .slice(0, 50)
        .trim()
        .replace(/[^a-zA-Z0-9]+/g, '-')
        .replace(/^-|-$/g, '')
        .toLowerCase() || 'speech'

    const link = document.createElement('a')
    link.href = audioUrl
    link.download = `${safeName}.mp3`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    setTimeout(() => setIsDownloading(false), 1000)
  }

  return (
    <div className='hidden h-full flex-1 flex-col gap-8 border-t lg:flex'>
      {/* Header */}
      <div className='p-6 pb-0'>
        <h3 className='text-foreground font-semibold'>Voice preview</h3>
      </div>

      {/* Content */}
      <div className='relative flex flex-1 items-center justify-center'>
        {!isReady && (
          <div className='absolute inset-0 z-10 flex items-center justify-center'>
            <Badge
              variant='outline'
              className='bg-background/90 text-muted-foreground gap-2 px-3 py-1.5 text-sm'
            >
              <Spinner className='size-4' />
              <span>Loading audio...</span>
            </Badge>
          </div>
        )}
        <div
          ref={containerRef}
          className={cn(
            'w-full cursor-pointer transition-opacity duration-200',
            !isReady && 'opacity-0',
          )}
        />
      </div>
      {/* Time Display */}
      <div className='flex items-center justify-center'>
        <p className='text-foreground text-3xl font-semibold tracking-tight tabular-nums'>
          {formatTime(currentTime)}&nbsp;
          <span className='text-muted-foreground'>/&nbsp;{formatTime(duration)}</span>
        </p>
      </div>

      {/* Footer */}
      <div className='flex flex-col items-center p-6'>
        <div className='grid w-full grid-cols-3'>
          {/* Metadata */}
          <div className='flex min-w-0 flex-col gap-0.5'>
            <p className='text-foreground truncate text-sm font-medium'>{text}</p>
            {selectedVoiceName && (
              <div className='text-muted-foreground flex items-center gap-1 text-xs'>
                <VoiceAvatar
                  seed={selectedVoiceSeed ?? selectedVoiceName}
                  name={selectedVoiceName}
                  className='shrink-0'
                />
                <span className='truncate'>{selectedVoiceName}</span>
              </div>
            )}
          </div>

          {/* Player controls */}
          <div className='flex items-center justify-center gap-3'>
            <Button
              variant='ghost'
              size='icon-lg'
              className='flex-col'
              onClick={() => seekBackward(10)}
              disabled={!isReady}
            >
              <UndoIcon className='-mb-1 size-4' />
              <span className='text-[10px] font-medium'>10</span>
            </Button>

            <Button
              variant='default'
              size='icon-lg'
              className='rounded-full'
              onClick={togglePlayPause}
            >
              {isPlaying ? (
                <PauseIcon className='fill-background' />
              ) : (
                <PlayIcon className='fill-background' />
              )}
            </Button>

            <Button
              variant='ghost'
              size='icon-lg'
              className='flex-col'
              onClick={() => seekForward(10)}
              disabled={!isReady}
            >
              <RedoIcon className='-mb-1 size-4' />
              <span className='text-[10px] font-medium'>10</span>
            </Button>
          </div>

          {/* Download  */}
          <div className='flex justify-end'>
            <Button variant='outline' size='sm' onClick={handleDownload} disabled={isDownloading}>
              {isDownloading ? (
                <>
                  <Spinner className='size-4' />
                  <span className='ml-2'>Download</span>
                </>
              ) : (
                <>
                  <DownloadIcon className='size-4' />
                  <span className='ml-2'>Download</span>
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VoicePreviewPanel
