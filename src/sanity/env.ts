const DEFAULT_API_VERSION = '2024-01-01';
const DEFAULT_SANITY_PROJECT_ID = 'eflw1ex3';
const DEFAULT_SANITY_DATASET = 'production';

function readRequiredEnv(name: 'NEXT_PUBLIC_SANITY_PROJECT_ID' | 'NEXT_PUBLIC_SANITY_DATASET') {
  // The project ID and dataset are public configuration. The fallback keeps
  // published-content routes available when a deployment forgot to define
  // the corresponding Vercel variables; explicit environment values always win.
  const value = process.env[name] || (
    name === 'NEXT_PUBLIC_SANITY_PROJECT_ID' ? DEFAULT_SANITY_PROJECT_ID : DEFAULT_SANITY_DATASET
  );

  if (!value) {
    throw new Error(`Missing required Sanity environment variable: ${name}`);
  }

  return value;
}

export const projectId = readRequiredEnv('NEXT_PUBLIC_SANITY_PROJECT_ID');
export const dataset = readRequiredEnv('NEXT_PUBLIC_SANITY_DATASET');
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || DEFAULT_API_VERSION;
export const readToken = process.env.SANITY_API_READ_TOKEN;
