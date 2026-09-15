export default {
  name: 'filmPage',
  title: 'Film Page Header',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Film Page Heading',
      type: 'string',
      description: 'The main heading at the top of the Film page (e.g., "Film Photography").',
      initialValue: 'Film Photography',
    },
    {
      name: 'subtitle',
      title: 'Film Page Subheading / Description',
      type: 'text',
      rows: 3,
      description: 'The descriptive intro text beneath the heading on the Film page.',
      initialValue: 'A curated collection of analog moments captured on 35mm and medium format film.',
    },
    {
      name: 'homeHeading',
      title: 'Home Page "Film Photography" Section Heading',
      type: 'string',
      description: 'Heading displayed for the film preview section on the Home page.',
      initialValue: 'Film Photography',
    },
    {
      name: 'homeSubtitle',
      title: 'Home Page "Film Photography" Subtitle',
      type: 'text',
      rows: 2,
      description: 'Subheading displayed beneath the film preview section on the Home page.',
      initialValue: 'The authentic grain, timeless colors, and character of analog film.',
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
    },
    prepare({ title, subtitle }) {
      return {
        title: title || 'Film Page Header',
        subtitle: subtitle || 'Film page heading & description',
      }
    },
  },
}
