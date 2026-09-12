import { BulkPhotosInput } from '../components/BulkPhotosInput'

export default {
  name: 'about',
  title: 'About Me',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Section Title',
      type: 'string',
      description: 'The heading for the section (e.g., "About Me" or "Meet Braden").',
      initialValue: 'About Me',
    },
    {
      name: 'tagline',
      title: 'Intro Tagline / Quote',
      type: 'text',
      description: 'The prominent intro quote (e.g., "Hi, I\'m Braden Blackburn — a photographer passionate about capturing the beauty in everyday moments.").',
      initialValue: "Hi, I'm Braden Blackburn — a photographer passionate about capturing the beauty in everyday moments.",
    },
    {
      name: 'profileImage',
      title: 'Main Profile Picture',
      type: 'image',
      description: 'Main portrait photo displayed alongside your biography.',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'photos',
      title: 'About Photos & Gallery (Bulk Drag & Drop)',
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
      description: 'Upload multiple photos (behind-the-scenes, gear, lifestyle, portraits) to show on the About page! Includes Clear All and Select to Delete.',
    },
    {
      name: 'bio',
      title: 'Biography / Story',
      type: 'array',
      of: [{ type: 'block' }], // Enables rich text editor (paragraphs, bold, italics)
      description: 'Write about Braden and his photography experience.',
    },
  ],
  preview: {
    select: {
      title: 'title',
      media: 'profileImage',
    },
    prepare({ title, media }) {
      return {
        title: title || 'About Me',
        subtitle: 'About page & home preview content',
        media,
      }
    },
  },
}