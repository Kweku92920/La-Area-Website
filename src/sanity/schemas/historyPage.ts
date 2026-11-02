/**
 * Sanity Studio Schema: historyPage
 *
 * Add this schema to your Sanity Studio (`studio-la-area-website/schemaTypes/index.ts`)
 * so editors can update and publish changes to:
 *   1. History of The Church of Pentecost (slug: "church-of-pentecost")
 *   2. History of The Area — La Area (slug: "la-area")
 */

export const historyPageSchema = {
  name: 'historyPage',
  title: 'History Page',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Page Title',
      type: 'string',
      description: 'e.g. "History of The Church of Pentecost" or "History of The La Area"',
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'Use "church-of-pentecost" for the global church history and "la-area" for the La Area history.',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },
    {
      name: 'kicker',
      title: 'Eyebrow / Kicker Label',
      type: 'string',
      description: 'Short label above the main title (e.g. "Est. 1937 · Apostolic Heritage")',
    },
    {
      name: 'subtitle',
      title: 'Hero Subtitle',
      type: 'text',
      rows: 3,
      description: 'Concise summary displayed in the hero banner.',
    },
    {
      name: 'intro',
      title: 'Editorial Lead Paragraph',
      type: 'text',
      rows: 4,
      description: 'Opening lead paragraph at the top of the article.',
    },
    {
      name: 'heroImage',
      title: 'Hero / Featured Archival Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        { name: 'alt', title: 'Alt Text', type: 'string' },
        { name: 'caption', title: 'Archival Caption', type: 'string' },
      ],
    },
    {
      name: 'quote',
      title: 'Featured Historical Quote / Scripture',
      type: 'object',
      fields: [
        { name: 'text', title: 'Quote Text', type: 'text', rows: 3 },
        { name: 'attribution', title: 'Attribution / Reference', type: 'string' },
        { name: 'role', title: 'Context / Role', type: 'string' },
      ],
    },
    {
      name: 'stats',
      title: 'Key Historical Figures & Facts',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'value', title: 'Figure / Year (e.g. "1937", "81", "170+")', type: 'string' },
            { name: 'label', title: 'Label (e.g. "Year Founded", "Local Assemblies")', type: 'string' },
            { name: 'detail', title: 'Supporting Context', type: 'string' },
          ],
        },
      ],
    },
    {
      name: 'sections',
      title: 'Narrative Chapters',
      type: 'array',
      description: 'Structured historical chapters displayed in the main reading column.',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'kicker', title: 'Chapter Era / Kicker (e.g. "Chapter I · 1931–1937")', type: 'string' },
            { name: 'title', title: 'Chapter Title', type: 'string' },
            {
              name: 'paragraphs',
              title: 'Paragraphs',
              type: 'array',
              of: [{ type: 'text' }],
            },
            { name: 'highlight', title: 'Key Takeaway / Archival Note', type: 'text', rows: 2 },
            {
              name: 'image',
              title: 'Chapter Image (Optional)',
              type: 'image',
              options: { hotspot: true },
              fields: [
                { name: 'alt', title: 'Alt Text', type: 'string' },
                { name: 'caption', title: 'Caption', type: 'string' },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'milestones',
      title: 'Chronological Timeline Milestones',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'year', title: 'Year / Date (e.g. "1937", "Aug 1, 1962")', type: 'string' },
            { name: 'era', title: 'Era Category (e.g. "Origins", "Autonomy", "Modern Era")', type: 'string' },
            { name: 'title', title: 'Milestone Title', type: 'string' },
            { name: 'location', title: 'Location (e.g. "Asamankese", "La, Accra")', type: 'string' },
            { name: 'description', title: 'Detailed Description', type: 'text', rows: 3 },
          ],
        },
      ],
    },
    {
      name: 'leadershipLegacy',
      title: 'Leadership Succession / Pioneers',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', title: 'Leader Name', type: 'string' },
            { name: 'role', title: 'Title / Office', type: 'string' },
            { name: 'tenure', title: 'Tenure / Years (e.g. "1937 – 1982")', type: 'string' },
            { name: 'note', title: 'Key Contribution', type: 'text', rows: 2 },
            {
              name: 'photo',
              title: 'Portrait (Optional)',
              type: 'image',
              options: { hotspot: true },
            },
          ],
        },
      ],
    },
    {
      name: 'body',
      title: 'Additional Rich Text Content (Portable Text)',
      type: 'array',
      description: 'Optional rich-text blocks, images, or callouts appended to the history article.',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            { name: 'alt', title: 'Alt Text', type: 'string' },
            { name: 'caption', title: 'Caption', type: 'string' },
          ],
        },
      ],
    },
    {
      name: 'gallery',
      title: 'Archival Photo Gallery',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            { name: 'alt', title: 'Alt Text', type: 'string' },
            { name: 'caption', title: 'Caption', type: 'string' },
          ],
        },
      ],
    },
  ],
};

export default historyPageSchema;
