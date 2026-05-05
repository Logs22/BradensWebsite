import {defineField, defineType} from 'sanity'

export default {
  name: 'eventType',
  title: 'Event Type',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
    }),
    ]}