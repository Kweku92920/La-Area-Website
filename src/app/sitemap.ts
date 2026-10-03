import type { MetadataRoute } from 'next';
import { sanityFetch } from '@/src/sanity/client';
import { assemblySlugsQuery } from '@/src/sanity/queries';

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://coplaarea.org').replace(/\/$/, '');

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const assemblies = await sanityFetch<{ id: string }[]>(assemblySlugsQuery);
  const pages = [
    '/',
    '/about',
    '/leadership',
    '/districts',
    '/assemblies',
    '/ministries',
    '/sermons',
    '/children',
    '/men',
    '/women',
    '/youth',
  ];

  return [
    ...pages.map((page) => ({
      url: `${siteUrl}${page}`,
      lastModified: new Date(),
    })),
    ...assemblies.map(({ id }) => ({
      url: `${siteUrl}/assemblies/${id}`,
      lastModified: new Date(),
    })),
  ];
}