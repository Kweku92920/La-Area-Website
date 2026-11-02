import fs from 'node:fs';
import path from 'node:path';
import { createClient } from '@sanity/client';
import { assembliesData, districts, districtMinisters } from '../src/data/assemblies';
import { CHURCH_OF_PENTECOST_HISTORY, LA_AREA_HISTORY } from '../src/data/history';
import { leaders } from '../src/data/leaders';
import { ministriesData } from '../src/app/ministries/data';
import { apiVersion, dataset, projectId } from '../src/sanity/env';

function requiredEnv(name: string) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

const client = createClient({
  projectId,
  dataset,
  apiVersion,
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

async function uploadPublicImageIfPresent(publicRelPath?: string | null) {
  if (!publicRelPath || !publicRelPath.startsWith('/')) return null;
  const fullPath = path.join(process.cwd(), 'public', publicRelPath.replace(/^\//, ''));
  if (!fs.existsSync(fullPath)) return null;
  const buffer = fs.readFileSync(fullPath);
  const asset = await client.assets.upload('image', buffer, {
    filename: path.basename(fullPath),
  });
  return asset._id;
}

async function buildHistoryDoc(h: typeof CHURCH_OF_PENTECOST_HISTORY) {
  const heroAssetId = await uploadPublicImageIfPresent(h.heroImage);

  const sections = await Promise.all(
    h.sections.map(async (sec, idx) => {
      const imgAssetId = await uploadPublicImageIfPresent(sec.image);
      return {
        _key: `section-${idx + 1}`,
        kicker: sec.kicker,
        title: sec.title,
        paragraphs: sec.paragraphs,
        highlight: sec.highlight,
        ...(imgAssetId
          ? {
              image: {
                _type: 'image',
                alt: sec.imageAlt || sec.title,
                caption: sec.imageCaption || '',
                asset: ref(imgAssetId),
              },
            }
          : {}),
      };
    }),
  );

  const leadershipLegacy = await Promise.all(
    h.leadershipLegacy.map(async (l, idx) => {
      const photoAssetId = await uploadPublicImageIfPresent(l.photo);
      return {
        _key: `leader-${idx + 1}`,
        name: l.name,
        role: l.role,
        tenure: l.tenure,
        note: l.note,
        ...(photoAssetId
          ? {
              photo: {
                _type: 'image',
                asset: ref(photoAssetId),
              },
            }
          : {}),
      };
    }),
  );

  const gallery = (
    await Promise.all(
      (h.gallery ?? []).map(async (g, idx) => {
        const gAssetId = await uploadPublicImageIfPresent(g.url);
        if (!gAssetId) return null;
        return {
          _key: `gallery-${idx + 1}`,
          _type: 'image',
          alt: g.alt || '',
          caption: g.caption || '',
          asset: ref(gAssetId),
        };
      }),
    )
  ).filter(Boolean);

  return {
    _id: h.id,
    _type: 'historyPage',
    title: h.title,
    slug: { _type: 'slug', current: h.slug },
    kicker: h.kicker,
    subtitle: h.subtitle,
    intro: h.intro,
    ...(heroAssetId
      ? {
          heroImage: {
            _type: 'image',
            alt: h.heroImageAlt || h.title,
            caption: h.heroImageCaption || '',
            asset: ref(heroAssetId),
          },
        }
      : {}),
    quote: h.quote,
    stats: h.stats.map((s, idx) => ({ _key: `stat-${idx + 1}`, ...s })),
    sections,
    milestones: h.milestones.map((m, idx) => ({ _key: `milestone-${idx + 1}`, ...m })),
    leadershipLegacy,
    gallery,
  };
}

async function main() {
  const docs: { _id: string; _type: string; [key: string]: unknown }[] = [
    ...leaderDocs,
    ...districtDocs,
    ...assemblyDocs,
    ...ministryDocs,
  ];
  const historyDocs = await Promise.all([
    buildHistoryDoc(CHURCH_OF_PENTECOST_HISTORY),
    buildHistoryDoc(LA_AREA_HISTORY),
  ]);

  const tx = client.transaction();
  // createIfNotExists for base directory docs
  docs.forEach((d) => tx.createIfNotExists(d));
  // createOrReplace for historyDocs so latest chapters, leaders, and images are synced
  historyDocs.forEach((d) => tx.createOrReplace(d));
  await tx.commit();
  console.log(
    `Seeded ${leaderDocs.length} leaders, ${districtDocs.length} districts, ` +
      `${assemblyDocs.length} assemblies, ${ministryDocs.length} ministries, ` +
      `${historyDocs.length} history pages with Sanity image assets`,
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
