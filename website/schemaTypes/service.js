export default {
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Service Name',
      type: 'string',
      description: 'The name of the package or service (e.g., Weddings, Portraits, Real Estate).',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'A short description explaining what is included in this service.',
    },
    {
      name: 'price',
      title: 'Starting Price',
      type: 'string',
      description: 'Optional: Starting price for this service (e.g., "Starting at $500").',
    },
    {
      name: 'image',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true, // Lets Braden crop the image perfectly inside Sanity
      },
    },
  ],
}