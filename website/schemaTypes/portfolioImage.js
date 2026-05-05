export default {
  name: 'portfolioImage',
  title: 'Portfolio Image',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Gallery Title',
      type: 'string',
      description: 'e.g., "Spring Wedding 2026" or "Downtown Portraits"',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    },
    {
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      description: 'The main image that will show up on the portfolio grid.',
      options: {
        hotspot: true, 
      },
    },
    {
      name: 'images',
      title: 'Gallery Images (Bulk Upload Here)',
      type: 'array',
      description: 'Drag and drop multiple images into this area to upload them all at once.',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              title: 'Alternative Text',
              type: 'string',
              description: 'Brief description of the image for SEO and screen readers.',
            }
          ]
        }
      ],
      options: {
        layout: 'grid', // This makes the uploaded images display in a nice grid in the studio
      },
    },
  ],
}