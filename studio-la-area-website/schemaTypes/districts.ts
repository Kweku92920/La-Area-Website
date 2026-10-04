import { defineField, defineType } from 'sanity'

export const district = defineType({
    name: 'district',
    title: 'District',
    type: 'document',
    fields: [
        defineField({ name: 'name', title: 'Name', type: 'string', validation: (r) => r.required() }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: { source: 'name', maxLength: 96 },
            validation: (r) => r.required(),
        }),
        defineField({ name: 'pastor', title: 'District Pastor', type: 'reference', to: [{ type: 'leader' }] }),
        defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
        defineField({
            name: 'image',
            title: 'Image',
            type: 'image',
            description: 'Optional. Remove the image to clear it from the district.',
            options: { hotspot: true },
        }),
        defineField({
            name: 'order',
            title: 'Sort order',
            type: 'number',
            description: 'Lower numbers appear first. Leave empty to sort A–Z.',
        }),
    ],
    orderings: [
        { title: 'Name A–Z', name: 'nameAsc', by: [{ field: 'name', direction: 'asc' }] },
        { title: 'Manual order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
    ],
    preview: { select: { title: 'name', subtitle: 'pastor.name' } },
})
