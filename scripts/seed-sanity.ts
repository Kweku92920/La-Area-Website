import { createClient } from '@sanity/client';
import { assembliesData, districts, districtMinisters } from '../src/data/assemblies';
import { leaders } from '../src/data/leaders';
import { ministriesData } from '../src/app/ministries/data';

function requiredEnv(name: string) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

const client = createClient({
  projectId: requiredEnv('NEXT_PUBLIC_SANITY_PROJECT_ID'),
  dataset: requiredEnv('NEXT_PUBLIC_SANITY_DATASET'),
  apiVersion: '2026-10-01',
  token: requiredEnv('SANITY_WRITE_TOKEN'),
  useCdn: false,
});

const slugify = (s: string) =>
  s.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

const ref = (id: string) => ({ _type: 'reference' as const, _ref: id });
const leaderId = (name: string) => `leader-${slugify(name)}`;
const districtId = (name: string) => `district-${slugify(name)}`;

const districtNames = districts.filter((d) => d !== 'All Districts');

const leaderDocs = leaders.map((l, i) => ({
  _id: leaderId(l.name),
  _type: 'leader',
  name: l.name,
  role: l.role,
  location: l.location,
  order: i + 1,
}));

const districtDocs = districtNames.map((name, i) => {
  const minister = districtMinisters[name];
  const hasLeader = minister && leaderDocs.some((l) => l.name === minister);
  return {
    _id: districtId(name),
    _type: 'district',
    name,
    slug: { _type: 'slug', current: slugify(name) },
    order: i + 1,
    ...(hasLeader ? { pastor: ref(leaderId(minister)) } : {}),
  };
});

const assemblyDocs = assembliesData.map((a) => {
  if (!districtNames.includes(a.district)) throw new Error(`Unknown district: ${a.district}`);
  return {
    _id: `assembly-${a.id}`,
    _type: 'assembly',
    name: a.name,
    slug: { _type: 'slug', current: a.id },
    district: ref(districtId(a.district)),
    location: a.location,
    ...(a.pastor ? { pastor: a.pastor } : {}),
    serviceTimes: [a.time],
    ...(a.phone ? { phone: a.phone } : {}),
    ...(a.email ? { email: a.email } : {}),
  };
});

const ministryDocs = ministriesData.map((m, i) => ({
  _id: `ministry-${m.id}`,
  _type: 'ministry',
  title: m.title,
  slug: { _type: 'slug', current: m.id },
  description: m.description,
  order: i + 1,
}));

async function main() {
  const docs: { _id: string; _type: string; [key: string]: unknown }[] = [
    ...leaderDocs,
    ...districtDocs,
    ...assemblyDocs,
    ...ministryDocs,
  ];
  const tx = client.transaction();
  // createIfNotExists: re-running never overwrites edits made in the Studio
  docs.forEach((d) => tx.createIfNotExists(d));
  await tx.commit();
  console.log(
    `Seeded ${leaderDocs.length} leaders, ${districtDocs.length} districts, ` +
      `${assemblyDocs.length} assemblies, ${ministryDocs.length} ministries`,
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
