import { createClient } from '@sanity/client';
import { apiVersion, dataset, projectId, readToken } from './env';

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  perspective: 'published',
});

export const previewClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: readToken,
  perspective: 'previewDrafts',
});
