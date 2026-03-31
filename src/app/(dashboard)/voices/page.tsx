import type { Metadata } from 'next'
import type { SearchParams } from 'nuqs/server'

import { voicesSearchParamsCache } from '@/features/voices/lib/params'
import { HydrateClient, prefetch, trpc } from '@/trpc/server'
import VoicesView from '@/app/(dashboard)/voices/views/voices-view'

export const metadata: Metadata = {
  title: 'Voices',
}

interface PageProps {
  searchParams: Promise<SearchParams>
}

const Page = async ({ searchParams }: PageProps) => {
  const { query } = await voicesSearchParamsCache.parse(searchParams)

  prefetch(trpc.voices.getAll.queryOptions({ query }))

  return (
    <HydrateClient>
      <VoicesView />
    </HydrateClient>
  )
}

export default Page
