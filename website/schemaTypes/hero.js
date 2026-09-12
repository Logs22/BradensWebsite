import { BulkPhotosInput } from '../components/BulkPhotosInput'

export default {
  name: 'hero',
  title: 'Hero Banner',
  type: 'document',
  fields: [
    {
      name: 'heading',
      title: 'Main Heading (Title)',
      type: 'string',
      description: 'The main headline displayed on the home page hero image (e.g., "Braden Blackburn Photography").',
    },
    {
      name: 'subheading',
      title: 'Subheading (Optional)',
      type: 'text',
      description: 'An optional tagline or subtitle below the heading. Leave blank if you do not want a subheading.',
    },
    {
      name: 'photos',
      title: 'Background Images (Slideshow / Bulk Drag & Drop)',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
        },
      ],
      options: {
        layout: 'grid',
      },
      components: {
        input: BulkPhotosInput,
      },
      description: 'Upload multiple photos to create a rotating full-screen background slideshow on the home page! Includes Clear All and Select to Delete.',
    },
    {
      name: 'backgroundImage',
      title: 'Single Background Image (Optional)',
      type: 'image',
      description: 'Optional: Use this if you only want a single static background photo instead of a slideshow.',
      options: {
        hotspot: true,
      },
    },
  ],
  preview: {
    select: {
      title: 'heading',
      subtitle: 'subheading',
      media: 'backgroundImage',
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || 'Hero Banner',
        subtitle: subtitle || 'No subheading',
        media,
      }
    },
  },
}