export default {
  name: 'about',
  title: 'About Me',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Section Title',
      type: 'string',
      description: 'The heading for the section (e.g., "About Me" or "Meet Braden").',
      initialValue: 'About Me',
    },
    {
      name: 'tagline',
      title: 'Intro Tagline / Quote',
      type: 'text',
      description: 'The prominent intro quote (e.g., "Hi, I\'m Braden Blackburn — a photographer passionate about capturing the beauty in everyday moments.").',
      initialValue: "Hi, I'm Braden Blackburn — a photographer passionate about capturing the beauty in everyday moments.",
    },
    {
      name: 'profileImage',
      title: 'Profile Picture',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'bio',
      title: 'Biography / Story',
      type: 'array',
      of: [{ type: 'block' }], // Enables rich text editor (paragraphs, bold, italics)
      description: 'Write about Braden and his photography experience.',
    },
  ],
  preview: {
    select: {
      title: 'title',
      media: 'profileImage',
    },
    prepare({ title, media }) {
      return {
        title: title || 'About Me',
        subtitle: 'About page & home preview content',
        media,
      }
    },
  },
}