export default {
  name: 'portfolioPage',
  title: 'Portfolio Page Header',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Page Heading',
      type: 'string',
      description: 'The main heading at the top of the Portfolio page (e.g., "Portfolio").',
      initialValue: 'Portfolio',
    },
    {
      name: 'subtitle',
      title: 'Page Subheading / Description',
      type: 'text',
      rows: 3,
      description: 'The descriptive intro text beneath the heading.',
      initialValue: 'A collection of my favorite moments',
    },
    {
      name: 'homeHeading',
      title: 'Home Page "Featured Work" Heading',
      type: 'string',
      description: 'Heading displayed for the featured gallery preview section on the Home page.',
      initialValue: 'Featured Work',
    },
    {
      name: 'homeSubtitle',
      title: 'Home Page "Featured Work" Subtitle',
      type: 'text',
      rows: 2,
      description: 'Subheading displayed beneath Featured Work on the Home page.',
      initialValue: 'A curated selection of highlighted moments and signature captures',
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
    },
    prepare({ title, subtitle }) {
      return {
        title: title || 'Portfolio Page Header',
        subtitle: subtitle || 'Portfolio page heading & description',
      }
    },
  },
}
