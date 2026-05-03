import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

// ⚠️  REPLACE with your actual Sanity project ID
export const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || '23vvbmgr',
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
  useCdn: true,
  apiVersion: '2024-01-01',
})

const builder = imageUrlBuilder(client)

export function urlFor(source) {
  return builder.image(source)
}
