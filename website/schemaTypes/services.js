export default {
  name: 'services',
  title: 'Services & Pricing',
  type: 'document',
  fields: [
    {
      name: 'servicesList',
      title: 'List of Services',
      type: 'array',
      of: [
        {
          type: 'object',
          title: 'Service Package',
          fields: [
            { name: 'title', title: 'Package Title', type: 'string' },
            { name: 'desc', title: 'Description', type: 'text' },
            { 
              name: 'features', 
              title: 'Included Features', 
              type: 'array', 
              of: [{ type: 'string' }],
              description: 'Add each feature as a separate item (e.g., "Second photographer included")'
            },
            { name: 'price', title: 'Price (e.g., "Starting at $2,500")', type: 'string' },
            { name: 'image', title: 'Service Image', type: 'image', options: { hotspot: true } },
          ],
        },
      ],
    },
  ],
}