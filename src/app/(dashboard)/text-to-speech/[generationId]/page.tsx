import TextToSpeechDetailView from '@/features/text-to-speech/views/text-to-speech-detail-view'
import { HydrateClient, prefetch, trpc } from '@/trpc/server'

interface PageProps {
  params: Promise<{ generationId: string }>
}

const Page = async ({ params }: PageProps) => {
  const { generationId } = await params

  prefetch(trpc.generations.getById.queryOptions({ id: generationId }))
  prefetch(trpc.voices.getAll.queryOptions())

  return (
    <HydrateClient>
      <TextToSpeechDetailView generationId={generationId} />
    </HydrateClient>
  )
}

export default Page
