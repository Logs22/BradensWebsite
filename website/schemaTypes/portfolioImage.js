import { BulkPhotosInput } from '../components/BulkPhotosInput'

export default {
  name: 'portfolioImage',
  title: 'Film Photos',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Roll / Shoot Title',
      type: 'string',
      description: 'A brief title or roll name (e.g., "35mm Film Shoot", "The Aaron\'s Wedding", "Medium Format Portraits").',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'category',
      title: 'Film Format / Category',
      type: 'string',
      description: 'Choose the film format or style for this photo set.',
      initialValue: 'film',
      options: {
        list: [
          { title: 'Film (General)', value: 'film' },
          { title: '35mm Film', value: '35mm' },
          { title: '120 Medium Format', value: '120' },
          { title: 'Weddings', value: 'weddings' },
          { title: 'Portraits', value: 'portraits' },
          { title: 'Sporting Events', value: 'sporting events' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'featured',
      title: 'Feature Entire Shoot on Home Page',
      type: 'boolean',
      description: 'Turn this on to feature this whole shoot, OR use the individual "⭐ Feature Photos" toggle below to pick specific photos.',
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
          fields: [
            {
              name: 'featured',
              title: 'Feature this photo on Home Page',
              type: 'boolean',
              initialValue: false,
              description: 'Turn on to feature this individual photo in "Featured Work" on the home page.',
            },
            {
              name: 'caption',
              title: 'Caption / Title (Optional)',
              type: 'string',
              description: 'Optional caption or title for this photo.',
            },
          ],
        },
      ],
      options: {
        layout: 'grid',
      },
      components: {
        input: BulkPhotosInput,
      },
      description: 'Drag & drop multiple photos from your folder to bulk upload! Use Clear All, Select to Delete, or the Feature Photos star button.',
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
      const categoryMap = {
        '35mm': '35mm Film',
        '120': '120 Medium Format',
        'film': 'Film',
        'weddings': 'Weddings (Film)',
        'portraits': 'Portraits (Film)',
        'sporting events': 'Sporting Events (Film)',
        'events': 'Sporting Events (Film)',
      }
      const categoryLabel = (category && categoryMap[category.toLowerCase()]) || (category ? category.charAt(0).toUpperCase() + category.slice(1) : 'Film')
      const featuredLabel = featured ? ' ⭐ Featured' : ''
      const count = photos ? photos.length : 0
      const countLabel = count > 0 ? ` (${count} photo${count === 1 ? '' : 's'})` : ''
      const firstMedia = media || (photos && photos[0])
      return {
        title: title || 'Untitled Film Photo',
        subtitle: `${categoryLabel}${countLabel}${featuredLabel}`,
        media: firstMedia,
      }
    },
  },
}