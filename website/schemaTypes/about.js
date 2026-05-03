export default {
  name: 'about',
  title: 'About Section',
  type: 'document',
  fields: [
    {
      name: 'aboutTitle',
      title: 'Section Title',
      type: 'string',
    },
    {
      name: 'aboutText',
      title: 'Biography Text',
      type: 'text', // Text type gives a larger text area for multiple paragraphs
    },
    {
      name: 'aboutImage',
      title: 'Profile Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
  ],
}