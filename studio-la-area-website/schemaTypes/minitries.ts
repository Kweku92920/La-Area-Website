import { defineField, defineType } from 'sanity'

export const ministry = defineType({
    name: 'ministry',
    title: 'Ministry',
    type: 'document',
    fields: [
        defineField({ name: 'title', title: 'Title', type: 'string', validation: (r) => r.required() }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: { source: 'title', maxLength: 96 },
            validation: (r) => r.required(),
        }),
        defineField({ name: 'description', title: 'Short description', type: 'text', rows: 3 }),
        defineField({ name: 'icon', title: 'Icon (emoji)', type: 'string' }),
        defineField({ name: 'image', title: 'Card image', type: 'image', options: { hotspot: true } }),
        defineField({ name: 'heroImage', title: 'Hero image', type: 'image', options: { hotspot: true } }),
        defineField({
            name: 'body',
            title: 'Page content',
            type: 'array',
            of: [{ type: 'block' }, { type: 'image', options: { hotspot: true } }],
        }),
        defineField({
            name: 'gallery',
            title: 'Photo gallery',
            type: 'array',
            description: 'Photos shown in the gallery on the ministry page.',
            of: [
                {
                    type: 'image',
                    options: { hotspot: true },
                    fields: [{ name: 'caption', title: 'Caption', type: 'string' }],
                },
            ],
            options: { layout: 'grid' },
        }),
        defineField({
            name: 'leader',
            title: 'Ministry leader',
            description: 'Select the leader whose name, role, photo, and bio appear on this ministry page.',
            type: 'reference',
            to: [{ type: 'leader' }],
        }),
        defineField({ name: 'order', title: 'Sort order', type: 'number' }),
    ],
    orderings: [{ title: 'Manual order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
    preview: { select: { title: 'title', media: 'image' } },
})
