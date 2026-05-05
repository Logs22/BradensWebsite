export default {
  name: 'portfolio',
  title: 'Portfolio Gallery',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Gallery Title',
      type: 'string',
      description: 'Name of the shoot or category (e.g., Weddings, Senior Portraits).',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      description: 'Used for the URL of this gallery page.',
    },
    {
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'images',
      title: 'Gallery Images',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'portfolioImage' }] }],
      description: 'Select the individual photos that belong in this gallery.',
    },
  ],
}