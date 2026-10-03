import 'server-only';
import { createClient } from '@sanity/client';

function requiredEnv(name: string) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export const sanityWriteClient = createClient({
  projectId: requiredEnv('NEXT_PUBLIC_SANITY_PROJECT_ID'),
  dataset: requiredEnv('NEXT_PUBLIC_SANITY_DATASET'),
  apiVersion: '2026-10-01',
  token: requiredEnv('SANITY_WRITE_TOKEN'),
  useCdn: false,
});
