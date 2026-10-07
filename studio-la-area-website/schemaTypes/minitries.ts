import { defineField, defineType } from 'sanity'

const profileField = (name: string, title: string) =>
    defineField({
        name,
        title,
        type: 'object',
        fields: [
            defineField({
                name: 'name',
                title: 'Full name',
                type: 'string',
                validation: (rule) => rule.required(),
            }),
            defineField({
                name: 'image',
                title: 'Picture',
                type: 'image',
                options: { hotspot: true },
            }),
        ],
    })

const categoryLeadershipField = (name: string, title: string) =>
    defineField({
        name,
        title,
        type: 'object',
        fields: [
            profileField('leader', 'Leader'),
            profileField('assistantLeader', 'Assistant Leader'),
            profileField('secretary', 'Secretary'),
        ],
    })

export const ministry = defineType({
    name: 'ministry',
    title: 'Ministry',
    type: 'document',
    fields: [
        defineField({ name: 'title', title: 'Title', type: 'string', validation: (r) => r.required() }),
        defineField({
            name: 'sector',
            title: 'Ministry sector',
            type: 'string',
            options: {
                list: [
                    { title: 'Children', value: 'children' },
                    { title: 'Men', value: 'men' },
                    { title: 'Women', value: 'women' },
                    { title: 'Youth', value: 'youth' },
                    { title: 'Other', value: 'other' },
                ],
            },
            description: 'Used to group and filter ministries in the public directory.',
        }),
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
            name: 'leadershipByCategory',
            title: 'Category leadership profiles',
            description: 'Add names and pictures for each ministry category leadership team.',
            type: 'object',
            fields: [
                categoryLeadershipField('women', 'Area Women'),
                categoryLeadershipField('men', 'Area Men'),
                categoryLeadershipField('children', 'Area Children'),
                categoryLeadershipField('youth', 'Area Youth'),
            ],
        }),
        defineField({
            name: 'leader',
            title: 'Ministry leader',
            description: 'Select the ministry leader whose name, role, photo, and bio appear on this ministry page.',
            type: 'reference',
            to: [{ type: 'ministryLeader' }],
        }),
        defineField({
            name: 'assistantLeader',
            title: 'Assistant leader',
            description: 'Optional additional ministry leadership profile shown on the ministry detail page.',
            type: 'reference',
            to: [{ type: 'ministryLeader' }],
        }),
        defineField({
            name: 'secretary',
            title: 'Secretary',
            description: 'Optional ministry secretary profile shown on the ministry detail page.',
            type: 'reference',
            to: [{ type: 'ministryLeader' }],
        }),
        defineField({ name: 'order', title: 'Sort order', type: 'number' }),
    ],
    orderings: [{ title: 'Manual order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
    preview: { select: { title: 'title', media: 'image' } },
})
