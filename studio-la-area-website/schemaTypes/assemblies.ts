import { defineField, defineType } from 'sanity'

export const assembly = defineType({
    name: 'assembly',
    title: 'Assembly',
    type: 'document',
    fields: [
        defineField({ name: 'name', title: 'Name', type: 'string', validation: (r) => r.required() }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            description: 'Used in the page URL, e.g. /assemblies/abelemkpe-central',
            options: { source: (doc) => `${doc.name ?? ''}`, maxLength: 96 },
            validation: (r) => r.required(),
        }),
        defineField({
            name: 'district',
            title: 'District',
            type: 'reference',
            to: [{ type: 'district' }],
            validation: (r) => r.required(),
        }),
        defineField({ name: 'location', title: 'Location', type: 'string' }),
       
        defineField({
            name: 'serviceTimes',
            title: 'Service times',
            type: 'array',
            of: [{ type: 'string' }],
            description: 'e.g. Sunday Worship – 9:00 AM',
        }),
        defineField({ name: 'phone', title: 'Phone', type: 'string' }),
        defineField({ name: 'email', title: 'Email', type: 'string', validation: (r) => r.email() }),
        defineField({
            name: 'image',
            title: 'Image',
            type: 'image',
            description: 'Optional. Remove the image to clear it from the assembly.',
            options: { hotspot: true },
        }),
    ],
    orderings: [{ title: 'Name A–Z', name: 'nameAsc', by: [{ field: 'name', direction: 'asc' }] }],
    preview: { select: { title: 'name', subtitle: 'district.name' } },
})
