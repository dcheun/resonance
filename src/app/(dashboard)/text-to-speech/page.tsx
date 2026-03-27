import type { Metadata } from 'next'

import TextToSpeechView from '@/features/text-to-speech/views/text-to-speech-view'
import { HydrateClient, prefetch, trpc } from '@/trpc/server'

export const metadata: Metadata = {
  title: 'Text to Speech',
}

interface TextToSpeechPageProps {
  searchParams: Promise<{ text?: string; voiceId?: string }>
}

const TextToSpeechPage = async ({ searchParams }: TextToSpeechPageProps) => {
  const { text, voiceId } = await searchParams

  prefetch(trpc.voices.getAll.queryOptions())
  prefetch(trpc.generations.getAll.queryOptions())

  return (
    <HydrateClient>
      <TextToSpeechView initialValues={{ text, voiceId }} />
    </HydrateClient>
  )
}

export default TextToSpeechPage
