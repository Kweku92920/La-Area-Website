import { defineField, defineType } from 'sanity'

export const sermon = defineType({
    name: 'sermon',
    title: 'Sermon',
    type: 'document',
    fields: [
        defineField({ name: 'title', title: 'Title', type: 'string', validation: (r) => r.required() }),
        defineField({ name: 'speaker', title: 'Speaker', type: 'string', validation: (r) => r.required() }),
        defineField({ name: 'date', title: 'Date', type: 'date', validation: (r) => r.required() }),
        defineField({ name: 'duration', title: 'Duration', type: 'string', description: 'e.g. 45 min' }),
        defineField({ name: 'series', title: 'Series', type: 'string' }),
        defineField({
            name: 'category',
            title: 'Category',
            type: 'string',
            options: { list: ['Teaching', 'Worship', 'Faith', 'Youth'] },
        }),
        defineField({
            name: 'youtubeUrl',
            title: 'YouTube URL',
            type: 'url',
            validation: (r) => r.required().uri({ scheme: ['https'] }),
        }),
        defineField({
            name: 'thumbnail',
            title: 'Custom thumbnail',
            type: 'image',
            description: 'Optional. If empty, the YouTube thumbnail is used.',
        }),
        defineField({ name: 'description', title: 'Description', type: 'text', rows: 4 }),
    ],
    orderings: [{ title: 'Newest first', name: 'dateDesc', by: [{ field: 'date', direction: 'desc' }] }],
    preview: { select: { title: 'title', subtitle: 'speaker', media: 'thumbnail' } },
})
