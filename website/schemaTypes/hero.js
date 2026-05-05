export default {
  name: 'hero',
  title: 'Hero Section',
  type: 'document',
  fields: [
    {
      name: 'heading',
      title: 'Heading',
      type: 'string',
      description: 'The main catchphrase or title at the top of the site.',
    },
    {
      name: 'subheading',
      title: 'Subheading',
      type: 'text',
      description: 'A brief sentence or two below the main heading.',
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
}