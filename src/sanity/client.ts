import { createClient } from '@sanity/client';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2026-10-01',
  useCdn: false,
});

const isDev = process.env.NODE_ENV === 'development';

// Dev: always fresh. Production: cached, refreshed by the webhook (tag "sanity")
// with an hourly safety net for time-based queries such as "upcoming events".
export function sanityFetch<T>(query: string, params: Record<string, unknown> = {}) {
  return sanityFetchWithOptions<T>(query, params);
}

export function sanityFetchWithOptions<T>(
  query: string,
  params: Record<string, unknown> = {},
  options: { revalidate?: number | false } = {},
) {
  const revalidate = options.revalidate ?? 3600;
  return client.fetch<T>(
    query,
    params,
    isDev || revalidate === false
      ? { cache: 'no-store' }
      : { cache: 'force-cache', next: { tags: ['sanity'], revalidate } },
  );
}
