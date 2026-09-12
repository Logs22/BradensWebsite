export default {
  name: 'contact',
  title: 'Contact & Business Info',
  type: 'document',
  fields: [
    {
      name: 'email',
      title: 'Contact Email',
      type: 'string',
      description: 'Email address where clients can reach Braden.',
      initialValue: 'braden@photography.com',
    },
    {
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
      description: 'Phone number displayed on the contact page.',
      initialValue: '(555) 123-4567',
    },
    {
      name: 'location',
      title: 'Location / Base',
      type: 'string',
      description: 'City/State (e.g., "Fort Mitchell, Kentucky").',
      initialValue: 'Fort Mitchell, Kentucky',
    },
    {
      name: 'instagram',
      title: 'Instagram Handle',
      type: 'string',
      description: 'Instagram username (e.g., "@blackburn_creative").',
      initialValue: '@blackburn_creative',
    },
    {
      name: 'instagramUrl',
      title: 'Instagram Profile URL',
      type: 'url',
      description: 'Full link to Instagram page (e.g., "https://www.instagram.com/blackburn_creative/").',
      initialValue: 'https://www.instagram.com/blackburn_creative/',
    },
    {
      name: 'responseTime',
      title: 'Response Time Notice',
      type: 'text',
      description: 'Notice explaining how quickly Braden responds to inquiries.',
      initialValue: "I typically respond to all inquiries within 24 hours. If you haven't heard back, please check your spam folder or reach out directly via phone.",
    },
    {
      name: 'bookingNotice',
      title: 'Booking Notice / Advice',
      type: 'text',
      description: 'Notice about booking timelines.',
      initialValue: 'For weddings and large events, I recommend booking 6-12 months in advance. Portrait sessions can typically be scheduled within 2-4 weeks.',
    },
    {
      name: 'web3FormsAccessKey',
      title: 'Web3Forms Access Key (Free Contact Form Email Delivery)',
      type: 'string',
      description: 'To receive client messages sent from the contact form directly to your email, generate a free access key at web3forms.com and paste it here.',
    },
  ],
  preview: {
    select: {
      title: 'email',
      subtitle: 'location',
    },
    prepare({ title, subtitle }) {
      return {
        title: title ? `Contact Info (${title})` : 'Contact & Business Info',
        subtitle: subtitle || 'Fort Mitchell, Kentucky',
      }
    },
  },
}
