export default {
  name: 'about',
  title: 'About Section',
  type: 'document',
  fields: [
    {
      name: 'aboutImage',
      title: 'About Image',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'aboutTitle',
      title: 'About Title',
      type: 'string',
    },
    {
      name: 'aboutText',
      title: 'About Text',
      type: 'text',
      rows: 6,
    },
  ],
}
