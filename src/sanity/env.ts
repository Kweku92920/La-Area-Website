const DEFAULT_API_VERSION = '2024-01-01';
const DEFAULT_SANITY_PROJECT_ID = 'eflw1ex3';
const DEFAULT_SANITY_DATASET = 'production';

function resolveProjectId(raw?: string) {
  const trimmed = raw?.trim();
  // Guard against the common missing-leading-'e' typo ('flw1ex3') or empty env var
  if (!trimmed || trimmed === 'flw1ex3') {
    return DEFAULT_SANITY_PROJECT_ID;
  }
  return trimmed;
}

function resolveDataset(raw?: string) {
  const trimmed = raw?.trim();
  if (!trimmed) {
    return DEFAULT_SANITY_DATASET;
  }
  return trimmed;
}

function resolveApiVersion(raw?: string) {
  const trimmed = raw?.trim();
  if (!trimmed || !/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) {
    return DEFAULT_API_VERSION;
  }
  return trimmed;
}

export const projectId = resolveProjectId(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID);
export const dataset = resolveDataset(process.env.NEXT_PUBLIC_SANITY_DATASET);
export const apiVersion = resolveApiVersion(process.env.NEXT_PUBLIC_SANITY_API_VERSION);
export const readToken = process.env.SANITY_API_READ_TOKEN;
