export default {
  name: 'portfolioImage',
  title: 'Portfolio Image',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title / Alt Text',
      type: 'string',
      description: 'A brief description of the photo (important for SEO and screen readers).',
    },
    {
      name: 'image',
      title: 'Photograph',
      type: 'image',
      options: {
        hotspot: true, // Allows Braden to adjust the focal point/crop inside Sanity
      },
    },
    {
      name: 'caption',
      title: 'Caption',
      type: 'string',
      description: 'An optional short caption to display under the photo.',
    },
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
    },
  },
}