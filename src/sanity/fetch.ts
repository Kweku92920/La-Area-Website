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
  useCdn?: boolean;
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
  if (!readToken) {
    return client;
  }

  try {
    const { isEnabled } = await draftMode();
    if (isEnabled) {
      return previewClient;
    }
  } catch {
    // Ignore draftMode errors outside request scope or during static generation
  }

  return client;
}

function isNextDynamicServerError(error: unknown): boolean {
  return (
    typeof error === 'object' &&
    error !== null &&
    'digest' in error &&
    (error as { digest?: string }).digest === 'DYNAMIC_SERVER_USAGE'
  );
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
    useCdn,
  } = options;

  const defaultClient = await getClientForRequest();
  const requestClient = useCdn === undefined
    ? defaultClient
    : defaultClient.withConfig({ useCdn });
  const cacheTags = buildSanityTags(documentType, documentId, tags);

  try {
    if (process.env.NODE_ENV === 'development') {
      return await requestClient.fetch<T>(query, params, { cache: 'no-store' });
    }

    return await requestClient.fetch<T>(query, params, {
      next: {
        tags: cacheTags,
        revalidate: revalidate === false ? 60 : revalidate,
      },
    });
  } catch (error) {
    if (isNextDynamicServerError(error)) {
      throw error;
    }
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
    if (isNextDynamicServerError(error)) {
      throw error;
    }
    console.warn('Sanity fetch failed; using fallback.', error);
    return fallback;
  }
}
