export default {
  name: 'contact',
  title: 'Contact Info',
  type: 'document',
  fields: [
    {
      name: 'location',
      title: 'Location',
      type: 'string',
    },
    {
      name: 'phone',
      title: 'Phone',
      type: 'string',
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
    },
    {
      name: 'instagram',
      title: 'Instagram Handle',
      type: 'string',
    },
    {
      name: 'responseTime',
      title: 'Response Time Note',
      type: 'text',
      rows: 3,
    },
    {
      name: 'bookingNotice',
      title: 'Booking Notice',
      type: 'text',
      rows: 3,
    },
  ],
}
