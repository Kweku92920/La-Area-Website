import crypto from 'node:crypto';

const url = process.env.REVALIDATE_URL ?? 'http://localhost:3000/api/revalidate';
const secret = process.env.SANITY_REVALIDATE_SECRET ?? 'dev-secret';

const type = process.env.REVALIDATE_TYPE ?? 'ministry';
const slug = process.env.REVALIDATE_SLUG ?? 'youth';
const id = process.env.REVALIDATE_ID ?? 'test-doc-id';

const payload = JSON.stringify({
  _type: type,
  _id: id,
  slug: { current: slug },
  operation: 'update',
});

const signature = crypto.createHmac('sha256', secret).update(payload).digest('base64');

const response = await fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'x-sanity-signature': signature,
    'x-sanity-webhook-secret': secret,
  },
  body: payload,
});

console.log(`Status: ${response.status}`);
console.log(await response.text());
