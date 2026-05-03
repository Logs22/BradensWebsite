export default {
  name: 'downloadableDocument',
  title: 'Downloadable Documents',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Document Title',
      type: 'string',
      description: 'e.g., "2026 Wedding Pricing Guide" or "Client Contract"',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'documentFile',
      title: 'File Upload',
      type: 'image', // Using image type for file upload to leverage Sanity's asset management
      description: 'Upload the PDF or document here.',
      options: {
        storeOriginalFilename: true, // Keeps the original filename when downloaded
      },
    },
    {
      name: 'description',
      title: 'Brief Description',
      type: 'text',
      description: 'A short description of what this document is for.',
    }
  ],
}