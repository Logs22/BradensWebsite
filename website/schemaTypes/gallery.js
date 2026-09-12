export default {
  name: 'gallery',
  title: 'Photoshoot / Bulk Gallery',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Shoot / Gallery Name',
      type: 'string',
      description: 'e.g. "Sam & Nicole Wedding", "High School Senior Portraits", "NKU Soccer Game"',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      description: 'Which category tab all photos in this gallery belong to.',
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
      description: 'Showcase images from this shoot in the "Featured Work" section on the home page.',
      initialValue: false,
    },
    {
      name: 'images',
      title: 'Photos (Bulk Drag & Drop)',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'caption',
              type: 'string',
              title: 'Caption / Alt Text (Optional)',
            },
          ],
        },
      ],
      options: {
        layout: 'grid',
      },
      description: 'Select multiple photos on your computer and drag & drop them here all at once to upload in bulk!',
      validation: (Rule) => Rule.required().min(1),
    },
  ],
  preview: {
    select: {
      title: 'title',
      category: 'category',
      images: 'images',
    },
    prepare({ title, category, images }) {
      const count = images ? images.length : 0
      const firstImage = images && images[0]
      const categoryLabel = category ? category.charAt(0).toUpperCase() + category.slice(1) : ''
      return {
        title: title || 'Untitled Gallery',
        subtitle: `${categoryLabel} (${count} photo${count === 1 ? '' : 's'})`,
        media: firstImage,
      }
    },
  },
}
