import 'server-only';
import { createClient } from '@sanity/client';
import { apiVersion, dataset, projectId } from './env';

function requiredEnv(name: string) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export const sanityWriteClient = createClient({
  projectId,
  dataset,
  apiVersion,
  token: requiredEnv('SANITY_WRITE_TOKEN'),
  useCdn: false,
});
