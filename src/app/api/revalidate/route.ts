import { timingSafeEqual } from 'node:crypto';
import { revalidatePath, revalidateTag } from 'next/cache';
import { NextResponse, type NextRequest } from 'next/server';

export const runtime = 'nodejs';

function matchesSecret(candidate: string, secret: string) {
  const candidateBuffer = Buffer.from(candidate);
  const secretBuffer = Buffer.from(secret);
  return candidateBuffer.length === secretBuffer.length && timingSafeEqual(candidateBuffer, secretBuffer);
}

export async function POST(request: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) {
    return NextResponse.json({ message: 'Revalidation is not configured' }, { status: 503 });
  }

  const authorization = request.headers.get('authorization') ?? '';
  const bearerToken = /^Bearer\s+(.+)$/i.exec(authorization)?.[1] ?? '';
  const headerToken = request.headers.get('x-sanity-webhook-secret') ?? '';
  if (![bearerToken, headerToken].some((token) => token && matchesSecret(token, secret))) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 });
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ message: 'Expected a valid JSON webhook payload' }, { status: 400 });
  }

  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
    return NextResponse.json({ message: 'Expected a JSON object webhook payload' }, { status: 400 });
  }

  revalidateTag('sanity', { expire: 0 });
  revalidatePath('/', 'layout');
  return NextResponse.json({ revalidated: true, tag: 'sanity', path: '/' });
}
