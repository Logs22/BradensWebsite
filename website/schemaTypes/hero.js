export default {
  name: 'hero',
  title: 'Hero Banner',
  type: 'document',
  fields: [
    {
      name: 'heading',
      title: 'Heading',
      type: 'string',
      description: 'The main catchphrase or title at the top of the site (e.g., "Capturing").',
      initialValue: 'Capturing',
    },
    {
      name: 'highlightWord',
      title: 'Italic Highlight Word (Optional)',
      type: 'string',
      description: 'An optional accented/italicized word placed below the main heading (e.g., "Moments").',
      initialValue: 'Moments',
    },
    {
      name: 'subheading',
      title: 'Subheading',
      type: 'text',
      description: 'A brief sentence or two below the main heading (e.g., "Through the lens of Braden Blackburn").',
      initialValue: 'Through the lens of Braden Blackburn',
    },
    {
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'image',
      options: {
        hotspot: true, // Allows Braden to crop the image inside Sanity
      },
    },
  ],
  preview: {
    select: {
      title: 'heading',
      subtitle: 'subheading',
      media: 'backgroundImage',
    },
  },
}