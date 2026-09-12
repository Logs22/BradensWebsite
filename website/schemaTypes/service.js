import { BulkPhotosInput } from '../components/BulkPhotosInput'

export default {
  name: 'service',
  title: 'Service Package',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Service Name',
      type: 'string',
      description: 'The name of the package or service (e.g., Weddings, Portraits, Real Estate).',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order in which this service appears (1 = first, 2 = second, etc.).',
      initialValue: 1,
    },
    {
      name: 'price',
      title: 'Starting Price',
      type: 'string',
      description: 'Starting price for this service (e.g., "Starting at $500" or "Custom Quote").',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'A short description explaining what is included in this service.',
    },
    {
      name: 'features',
      title: 'Features / What is Included',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Bullet points shown with a checkmark (e.g. "Up to 8 hours coverage", "Online gallery with high-res downloads", "Print release").',
    },
    {
      name: 'image',
      title: 'Cover Image (Optional)',
      type: 'image',
      options: {
        hotspot: true, // Lets Braden crop the image perfectly inside Sanity
      },
    },
    {
      name: 'photos',
      title: 'Sample Work / Package Gallery (Bulk Drag & Drop)',
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
      description: 'Drag & drop multiple sample photos to showcase work for this specific service package. Includes Clear All and Select to Delete.',
    },
  ],
  preview: {
    select: {
      title: 'title',
      price: 'price',
      media: 'image',
    },
    prepare({ title, price, media }) {
      return {
        title: title || 'Untitled Service',
        subtitle: price || 'No price set',
        media,
      }
    },
  },
}