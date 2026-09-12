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
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'image',
      description: 'The full-screen background image displayed behind the title.',
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