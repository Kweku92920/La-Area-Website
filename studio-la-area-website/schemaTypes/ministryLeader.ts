import { defineField, defineType } from 'sanity'

export const ministryLeader = defineType({
    name: 'ministryLeader',
    title: 'Ministry Leader',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Full name',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'role',
            title: 'Role',
            type: 'string',
            options: {
                list: [
                    'Ministry Leader',
                    'Assistant Leader',
                    'Secretary',
                ],
            },
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'location',
            title: 'Location / District',
            type: 'string',
            description: 'e.g. LA LABONE DISTRICT',
        }),
        defineField({
            name: 'photo',
            title: 'Photo',
            type: 'image',
            options: { hotspot: true },
        }),
        defineField({
            name: 'bio',
            title: 'Short bio',
            type: 'text',
            rows: 4,
        }),
        defineField({
            name: 'order',
            title: 'Sort order',
            type: 'number',
            description: 'Lower numbers appear first.',
        }),
    ],
    orderings: [{ title: 'Manual order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
    preview: { select: { title: 'name', subtitle: 'role', media: 'photo' } },
})
