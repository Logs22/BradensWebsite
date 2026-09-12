export default {
  name: 'portfolioImage',
  title: 'Portfolio Photo',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title / Alt Text',
      type: 'string',
      description: 'A brief title or description of the photo (e.g., "Sam & Nicole Wedding" or "Senior Portrait").',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'image',
      title: 'Photograph',
      type: 'image',
      options: {
        hotspot: true, // Allows Braden to adjust the focal point/crop inside Sanity
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      description: 'Choose which portfolio tab this photo will appear under.',
      options: {
        list: [
          { title: 'Weddings', value: 'weddings' },
          { title: 'Portraits', value: 'portraits' },
          { title: 'Events', value: 'events' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'featured',
      title: 'Feature on Home Page',
      type: 'boolean',
      description: 'Turn this on to display this image in the "Featured Work" section on the home page.',
      initialValue: false,
    },
    {
      name: 'caption',
      title: 'Caption (Optional)',
      type: 'string',
      description: 'An optional short caption to display under the photo.',
    },
  ],
  preview: {
    select: {
      title: 'title',
      category: 'category',
      featured: 'featured',
      media: 'image',
    },
    prepare({ title, category, featured, media }) {
      const categoryLabel = category ? category.charAt(0).toUpperCase() + category.slice(1) : 'No category'
      const featuredLabel = featured ? ' ⭐ Featured' : ''
      return {
        title: title || 'Untitled Photo',
        subtitle: `${categoryLabel}${featuredLabel}`,
        media,
      }
    },
  },
}