import 'server-only';

import { draftMode } from 'next/headers';
import type { QueryParams } from '@sanity/client';
import { client, previewClient } from './client';
import { readToken } from './env';

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
    if (tag) tags.add(tag);
  }

  return [...tags];
}

async function getClientForRequest() {
  try {
    const { isEnabled } = await draftMode();
    if (isEnabled) {
      if (!readToken) {
        throw new Error('Draft mode requires SANITY_API_READ_TOKEN.');
      }
      return previewClient;
    }
  } catch (error) {
    if (error instanceof Error && error.message.includes('SANITY_API_READ_TOKEN')) {
      throw error;
    }
  }

  return client;
}

export async function sanityFetch<T>(
  query: string,
  params: QueryParams = {},
  options: SanityFetchOptions = {},
): Promise<T> {
  return sanityFetchWithOptions<T>(query, params, options);
}

export async function sanityFetchWithOptions<T>(
  query: string,
  params: QueryParams = {},
  options: SanityFetchOptions = {},
): Promise<T> {
  const {
    revalidate = 60,
    tags = [],
    documentType,
    documentId,
  } = options;

  const requestClient = await getClientForRequest();
  const cacheTags = buildSanityTags(documentType, documentId, tags);

  try {
    if (process.env.NODE_ENV === 'development' || revalidate === false) {
      return await requestClient.fetch<T>(query, params, { cache: 'no-store' });
    }

    return await requestClient.fetch<T>(query, params, {
      cache: 'force-cache',
      next: {
        tags: cacheTags,
        revalidate,
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown Sanity fetch error';
    throw new Error(`Sanity fetch failed: ${message}`);
  }
}

export async function sanityFetchSafe<T>(
  query: string,
  params: QueryParams = {},
  fallback: T,
  options: SanityFetchOptions = {},
): Promise<T> {
  try {
    const result = await sanityFetch<T | null>(query, params, options);
    return result ?? fallback;
  } catch (error) {
    console.error('Sanity fetch failed; using fallback.', error);
    return fallback;
  }
}
