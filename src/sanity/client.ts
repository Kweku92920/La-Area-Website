import 'server-only';
import { draftMode } from 'next/headers';
import { createClient } from '@sanity/client';

const baseClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2026-10-01',
  useCdn: false,
  perspective: 'published',
});

export type SanityFetchOptions = {
  revalidate?: number | false;
  tags?: string[];
  documentType?: string;
  documentId?: string;
};

export function buildSanityTags(
  documentType?: string,
  documentId?: string,
  extraTags: string[] = [],
) {
  const tags = new Set<string>(['sanity']);

  if (documentType) {
    tags.add(`sanity:${documentType}`);
    if (documentId) {
      tags.add(`sanity:${documentType}:${documentId}`);
    }
  }

  for (const tag of extraTags) {
    if (tag) {
      tags.add(tag);
    }
  }

  return [...tags];
}

async function getClientForRequest() {
  try {
    const { isEnabled } = await draftMode();
    if (isEnabled) {
      return baseClient.withConfig({ perspective: 'previewDrafts' });
    }
  } catch {
    // Non-Next server contexts fall back to published content.
  }

  return baseClient;
}

export async function sanityFetch<T>(
  query: string,
  params: Record<string, unknown> = {},
  options: SanityFetchOptions = {},
) {
  return sanityFetchWithOptions<T>(query, params, options);
}

export async function sanityFetchWithOptions<T>(
  query: string,
  params: Record<string, unknown> = {},
  options: SanityFetchOptions = {},
) {
  const {
    revalidate = 60,
    tags = [],
    documentType,
    documentId,
  } = options;

  const client = await getClientForRequest();
  const cacheTags = buildSanityTags(documentType, documentId, tags);

  if (process.env.NODE_ENV === 'development' || revalidate === false) {
    return client.fetch<T>(query, params, { cache: 'no-store' });
  }

  return client.fetch<T>(query, params, {
    cache: 'force-cache',
    next: {
      tags: cacheTags,
      revalidate,
    },
  });
}
