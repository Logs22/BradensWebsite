export default {
  name: 'clientGallery',
  title: 'Client Gallery',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Client / Shoot Name',
      type: 'string',
      description: 'e.g., "The Drummond\'s", "Will + Carlie", "The Blackburn\'s", "Sam & Nicole Wedding"',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'date',
      title: 'Shoot Date',
      type: 'date',
      description: 'Date of the session or wedding (displayed under the client name).',
      options: {
        dateFormat: 'MMMM D, YYYY',
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      description: 'Which category filter this shoot appears under.',
      options: {
        list: [
          { title: 'Weddings', value: 'weddings' },
          { title: 'Couples / Engagements', value: 'couples' },
          { title: 'Portraits', value: 'portraits' },
          { title: 'Events', value: 'events' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'coverImage',
      title: 'Cover Photograph',
      type: 'image',
      description: 'The main photo displayed on the Clients page grid card.',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'externalUrl',
      title: 'External Gallery Link (Optional)',
      type: 'url',
      description: 'Optional: If you host client downloads on Pixieset or Pic-Time, paste the full URL here (e.g., https://yourname.pixieset.com/theblackburns/).',
    },
    {
      name: 'photos',
      title: 'Shoot Photos (Bulk Drag & Drop)',
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
      description: 'Select multiple photos from your folder and drag & drop them here all at once to bulk upload!',
    },
    {
      name: 'featured',
      title: 'Feature on Home Page',
      type: 'boolean',
      description: 'Check to feature this shoot on the home page.',
      initialValue: false,
    },
  ],
  preview: {
    select: {
      title: 'title',
      date: 'date',
      category: 'category',
      media: 'coverImage',
      photos: 'photos',
    },
    prepare({ title, date, category, media, photos }) {
      const count = photos ? photos.length : 0
      const cat = category ? category.charAt(0).toUpperCase() + category.slice(1) : ''
      const dateStr = date ? ` • ${date}` : ''
      return {
        title: title || 'Untitled Client Shoot',
        subtitle: `${cat}${dateStr} (${count} photo${count === 1 ? '' : 's'})`,
        media,
      }
    },
  },
}
