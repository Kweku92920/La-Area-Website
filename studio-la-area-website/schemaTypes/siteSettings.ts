import { defineField, defineType } from 'sanity'

export const siteSettings = defineType({
    name: 'siteSettings',
    title: 'Site Settings',
    type: 'document',
    fields: [
        defineField({ name: 'title', title: 'Site title', type: 'string' }),
        defineField({ name: 'tagline', title: 'Tagline', type: 'string' }),
        defineField({ name: 'heroHeading', title: 'Homepage heading', type: 'string' }),
        defineField({ name: 'heroText', title: 'Homepage intro text', type: 'text', rows: 3 }),
        defineField({ name: 'heroImage', title: 'Homepage hero image', type: 'image', options: { hotspot: true } }),
        defineField({ name: 'logo', title: 'Logo', type: 'image' }),
        defineField({ name: 'address', title: 'Address', type: 'string' }),
        defineField({ name: 'phone', title: 'Phone', type: 'string' }),
        defineField({ name: 'email', title: 'Email', type: 'string' }),
        defineField({
            name: 'socials',
            title: 'Social links',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        defineField({
                            name: 'platform',
                            title: 'Platform',
                            type: 'string',
                            options: { list: ['Facebook', 'YouTube', 'Instagram', 'X', 'TikTok'] },
                        }),
                        defineField({ name: 'url', title: 'URL', type: 'url' }),
                    ],
                    preview: { select: { title: 'platform', subtitle: 'url' } },
                },
            ],
        }),
    ],
    preview: { prepare: () => ({ title: 'Site Settings' }) },
})
