const DEFAULT_API_VERSION = '2024-01-01';

function readRequiredEnv(name: 'NEXT_PUBLIC_SANITY_PROJECT_ID' | 'NEXT_PUBLIC_SANITY_DATASET') {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required Sanity environment variable: ${name}`);
  }

  return value;
}

export const projectId = readRequiredEnv('NEXT_PUBLIC_SANITY_PROJECT_ID');
export const dataset = readRequiredEnv('NEXT_PUBLIC_SANITY_DATASET');
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || DEFAULT_API_VERSION;
export const readToken = process.env.SANITY_API_READ_TOKEN;
