export default {
  name: 'servicesPage',
  title: 'Services Page Header',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Page Heading',
      type: 'string',
      description: 'The main heading at the top of the Services page (e.g., "Services & Investment").',
      initialValue: 'Services & Investment',
    },
    {
      name: 'subtitle',
      title: 'Page Subheading / Description',
      type: 'text',
      rows: 3,
      description: 'The descriptive intro text beneath the heading.',
      initialValue: 'Quality photography is an investment in memories that last a lifetime. I offer flexible packages to suit your needs and budget.',
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
    },
    prepare({ title, subtitle }) {
      return {
        title: title || 'Services Page Header',
        subtitle: subtitle || 'Heading and intro text for the Services page',
      }
    },
  },
}
