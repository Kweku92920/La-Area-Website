import { defineField, defineType } from 'sanity'

export const leader = defineType({
    name: 'leader',
    title: 'Leader',
    type: 'document',
    fields: [
        defineField({ name: 'name', title: 'Full name', type: 'string', validation: (r) => r.required() }),
        defineField({
            name: 'role',
            title: 'Role',
            type: 'string',
            options: {
                list: [
                    'Area Head',
                    'Area Secretary',
                    'Area Ministry Leader / Coordinator',
                    'Chairman / Leader',
                    'Secretary',
                    'Financial Secretary / Treasurer',
                    'Committee Member',
                    'District Pastor',
                    'Other',
                ],
            },
            validation: (r) => r.required(),
        }),
        defineField({
            name: 'location',
            title: 'Location / District',
            type: 'string',
            description: 'e.g. LA LABONE DISTRICT',
        }),
        defineField({ name: 'photo', title: 'Photo', type: 'image', options: { hotspot: true } }),
        defineField({ name: 'bio', title: 'Short bio', type: 'text', rows: 4 }),
        defineField({
            name: 'order',
            title: 'Sort order',
            type: 'number',
            description: 'Lower numbers appear first (Area Head = 1, etc.)',
        }),
    ],
    orderings: [{ title: 'Manual order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
    preview: { select: { title: 'name', subtitle: 'role', media: 'photo' } },
})
