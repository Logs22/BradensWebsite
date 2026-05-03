import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { media } from 'sanity-plugin-media'
import { schemaTypes } from './schemaTypes'

export default defineConfig({
  name: 'braden-blackburn-photography',
  title: 'Braden Blackburn Photography',

  // ⚠️  REPLACE with your actual Sanity project ID and dataset
  projectId: '23vvbmgr',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Hero Section')
              .child(
                S.document()
                  .schemaType('hero')
                  .documentId('hero')
              ),
            S.listItem()
              .title('About Section')
              .child(
                S.document()
                  .schemaType('about')
                  .documentId('about')
              ),
            S.listItem()
              .title('Contact Info')
              .child(
                S.document()
                  .schemaType('contact')
                  .documentId('contact')
              ),
            S.divider(),
            S.documentTypeListItem('portfolioImage').title('Portfolio Images'),
            S.documentTypeListItem('service').title('Services'),
          ]),
    }),
    visionTool(),
    media(), // Enables the Media Library for bulk upload
  ],

  schema: {
    types: schemaTypes,
  },
})
