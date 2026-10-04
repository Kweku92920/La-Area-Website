import { defineField, defineType } from 'sanity'

export const event = defineType({
    name: 'event',
    title: 'Event',
    type: 'document',
    fields: [
        defineField({ name: 'title', title: 'Title', type: 'string', validation: (r) => r.required() }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: { source: 'title', maxLength: 96 },
        }),
        defineField({
            name: 'startDate',
            title: 'Start',
            type: 'datetime',
            validation: (r) => r.required(),
        }),
        defineField({ name: 'endDate', title: 'End', type: 'datetime' }),
        defineField({ name: 'location', title: 'Location', type: 'string' }),
        defineField({ name: 'description', title: 'Description', type: 'text', rows: 4 }),
        defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true } }),
        defineField({
            name: 'featured',
            title: 'Featured on homepage',
            type: 'boolean',
            initialValue: false,
        }),
    ],
    orderings: [{ title: 'Date', name: 'dateAsc', by: [{ field: 'startDate', direction: 'asc' }] }],
    preview: { select: { title: 'title', subtitle: 'startDate', media: 'image' } },
})
