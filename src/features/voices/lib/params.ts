import { createSearchParamsCache, parseAsString } from 'nuqs/server'

// For client components
export const voicesSearchParams = {
  query: parseAsString.withDefault(''),
}

// For server components
export const voicesSearchParamsCache = createSearchParamsCache(voicesSearchParams)
