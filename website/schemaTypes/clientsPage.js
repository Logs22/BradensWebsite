export default {
  name: 'clientsPage',
  title: 'Clients Page Header',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Page Heading',
      type: 'string',
      description: 'The main heading at the top of the Client Galleries page (e.g., "Client Galleries").',
      initialValue: 'Client Galleries',
    },
    {
      name: 'subtitle',
      title: 'Page Subheading / Description',
      type: 'text',
      rows: 3,
      description: 'The descriptive intro text beneath the heading.',
      initialValue: 'Client stories, weddings, and featured collections',
    },
    {
      name: 'homeHeading',
      title: 'Home Page "Client Stories" Heading',
      type: 'string',
      description: 'Heading displayed for the client stories preview section on the Home page.',
      initialValue: 'Client Stories',
    },
    {
      name: 'homeSubtitle',
      title: 'Home Page "Client Stories" Subtitle',
      type: 'text',
      rows: 2,
      description: 'Subheading displayed beneath Client Stories on the Home page.',
      initialValue: 'Discover recent client sessions and featured stories',
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
    },
    prepare({ title, subtitle }) {
      return {
        title: title || 'Clients Page Header',
        subtitle: subtitle || 'Client Galleries heading & description',
      }
    },
  },
}
