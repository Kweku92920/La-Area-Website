import { timingSafeEqual } from 'node:crypto';
import { NextResponse, type NextRequest } from 'next/server';
import { isValidSignature } from '@sanity/webhook';
import { revalidateSanityContent } from '@/src/sanity/revalidate';

export const runtime = 'nodejs';

function matchesSecret(candidate: string, secret: string) {
  const candidateBuffer = Buffer.from(candidate);
  const secretBuffer = Buffer.from(secret);
  return candidateBuffer.length === secretBuffer.length && timingSafeEqual(candidateBuffer, secretBuffer);
}

function normalizeSlug(value: unknown) {
  if (!value) {
    return null;
  }

  if (typeof value === 'string') {
    return value;
  }

  if (typeof value === 'object' && 'current' in value && typeof (value as { current?: string }).current === 'string') {
    return (value as { current: string }).current;
  }

  return null;
}

function extractDocumentInfo(payload: unknown) {
  const candidate = typeof payload === 'object' && payload !== null && !Array.isArray(payload)
    ? (payload as Record<string, unknown>)
    : {};
  const document = candidate.document && typeof candidate.document === 'object'
    ? (candidate.document as Record<string, unknown>)
    : candidate;

  const _type = typeof document['_type'] === 'string' ? document['_type'] : 'unknown';
  const _id = typeof document['_id'] === 'string' ? document['_id'] : '';
  const slug = normalizeSlug(document['slug']) ?? normalizeSlug(candidate['slug']) ?? null;
  const operation =
    typeof document['operation'] === 'string'
      ? document['operation']
      : typeof candidate['operation'] === 'string'
        ? (candidate['operation'] as string)
        : 'update';

  return { _type, _id, slug, operation };
}

export async function POST(request: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) {
    return NextResponse.json({ message: 'Revalidation is not configured' }, { status: 503 });
  }

  const rawBody = await request.text();
  const signatureHeader =
    request.headers.get('x-sanity-signature') ??
    request.headers.get('sanity-signature') ??
    '';

  const authorization = request.headers.get('authorization') ?? '';
  const bearerToken = /^Bearer\s+(.+)$/i.exec(authorization)?.[1] ?? '';
  const headerToken = request.headers.get('x-sanity-webhook-secret') ?? '';
  const secretMatches = [bearerToken, headerToken].some((token) => token && matchesSecret(token, secret));
  const signatureMatches = !!signatureHeader && isValidSignature(rawBody, signatureHeader, secret);

  if (!secretMatches && !signatureMatches) {
    return NextResponse.json({ message: 'Invalid secret or webhook signature' }, { status: 401 });
  }

  let payload: unknown;
  try {
    payload = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ message: 'Expected a valid JSON webhook payload' }, { status: 400 });
  }

  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
    return NextResponse.json({ message: 'Expected a JSON object webhook payload' }, { status: 400 });
  }

  const { _type, _id, slug, operation } = extractDocumentInfo(payload);
  const watchList = new Set(['district', 'assembly', 'leader', 'event', 'sermon', 'siteSettings', 'ministryLeader', 'ministry']);

  if (!_type || !watchList.has(_type)) {
    return NextResponse.json({ message: `Ignored unsupported type: ${_type || 'unknown'}` }, { status: 200 });
  }

  try {
    revalidateSanityContent(_type, slug ?? (_id || undefined));
    return NextResponse.json({
      revalidated: true,
      type: _type,
      id: _id,
      slug,
      operation,
      message: 'Sanity content cache revalidated',
    });
  } catch (error) {
    console.error('Revalidation failed for Sanity webhook', error);
    return NextResponse.json({ message: 'Revalidation failed', error: error instanceof Error ? error.message : 'unknown error' }, { status: 500 });
  }
}
