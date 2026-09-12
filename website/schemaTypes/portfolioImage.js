import { BulkPhotosInput } from '../components/BulkPhotosInput'

export default {
  name: 'portfolioImage',
  title: 'Portfolio Photos',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title / Shoot Name',
      type: 'string',
      description: 'A brief title or description (e.g., "35mm Film Shoot", "Sam & Nicole Wedding", "Senior Portrait").',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      description: 'Choose which portfolio tab these photos will appear under.',
      options: {
        list: [
          { title: 'Weddings', value: 'weddings' },
          { title: 'Portraits', value: 'portraits' },
          { title: 'Events', value: 'events' },
          { title: 'Film', value: 'film' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'featured',
      title: 'Feature on Home Page',
      type: 'boolean',
      description: 'Turn this on to display these photos in the "Featured Work" section on the home page.',
      initialValue: false,
    },
    {
      name: 'photos',
      title: 'Photos (Bulk Drag & Drop)',
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
      description: 'Drag & drop multiple photos from your folder to bulk upload! Use Clear All or Select to Delete if needed.',
    },
    {
      name: 'image',
      title: 'Single Photograph (Optional)',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Optional: Use this if you are uploading only a single photograph instead of a batch.',
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
      photos: 'photos',
    },
    prepare({ title, category, featured, media, photos }) {
      const categoryLabel = category ? category.charAt(0).toUpperCase() + category.slice(1) : 'No category'
      const featuredLabel = featured ? ' ⭐ Featured' : ''
      const count = photos ? photos.length : 0
      const countLabel = count > 0 ? ` (${count} photo${count === 1 ? '' : 's'})` : ''
      const firstMedia = media || (photos && photos[0])
      return {
        title: title || 'Untitled Portfolio Photo',
        subtitle: `${categoryLabel}${countLabel}${featuredLabel}`,
        media: firstMedia,
      }
    },
  },
}