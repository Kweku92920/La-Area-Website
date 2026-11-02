import { Buffer } from 'node:buffer';
import { revalidateSanityContent } from './revalidate';
import { sanityWriteClient } from './writeClient';

type Slug = { _type: 'slug'; current: string };
type Reference = { _type: 'reference'; _ref: string };
type ImageReference = { _type: 'image'; asset: Reference };

export type NewDistrict = {
  name: string;
  slug: Slug;
  pastor?: Reference;
  description?: string;
  image?: ImageReference;
  order?: number;
};

export type DistrictChanges = Partial<{
  name: string;
  slug: Slug;
  pastor: Reference | null;
  description: string | null;
  image: ImageReference | null;
  order: number | null;
}>;

export type NewAssembly = {
  name: string;
  slug: Slug;
  district: Reference;
  location?: string;
  serviceTimes?: string[];
  phone?: string;
  email?: string;
  image?: ImageReference;
};

export type AssemblyChanges = Partial<{
  name: string;
  slug: Slug;
  district: Reference;
  location: string | null;
  serviceTimes: string[] | null;
  phone: string | null;
  email: string | null;
  image: ImageReference | null;
}>;

export function createDistrict(district: NewDistrict) {
  return commitAndRevalidate(
    sanityWriteClient.create({ _type: 'district', ...district }, { visibility: 'sync' }),
  );
}

export function updateDistrict(id: string, changes: DistrictChanges) {
  return commitAndRevalidate(patchDocument(id, changes));
}

export function deleteDistrict(id: string) {
  return commitAndRevalidate(sanityWriteClient.delete(id, { visibility: 'sync' }));
}

export function createAssembly(assembly: NewAssembly) {
  return commitAndRevalidate(
    sanityWriteClient.create({ _type: 'assembly', ...assembly }, { visibility: 'sync' }),
  );
}

export function updateAssembly(id: string, changes: AssemblyChanges) {
  return commitAndRevalidate(patchDocument(id, changes));
}

export function deleteAssembly(id: string) {
  return commitAndRevalidate(sanityWriteClient.delete(id, { visibility: 'sync' }));
}

export function clearAssemblyImage(id: string) {
  return updateAssembly(id, { image: null });
}

export function clearDistrictImage(id: string) {
  return updateDistrict(id, { image: null });
}

export async function uploadAssemblyImage(id: string, image: Buffer, filename: string) {
  const asset = await sanityWriteClient.assets.upload('image', image, { filename });
  return updateAssembly(id, {
    image: { _type: 'image', asset: { _type: 'reference', _ref: asset._id } },
  });
}

export async function uploadDistrictImage(id: string, image: Buffer, filename: string) {
  const asset = await sanityWriteClient.assets.upload('image', image, { filename });
  return updateDistrict(id, {
    image: { _type: 'image', asset: { _type: 'reference', _ref: asset._id } },
  });
}

function patchDocument(id: string, changes: Record<string, unknown>) {
  const entries = Object.entries(changes).filter(([, value]) => value !== undefined);
  if (entries.length === 0) {
    throw new Error('At least one field change is required.');
  }

  const toUnset = entries.filter(([, value]) => value === null).map(([field]) => field);
  const toSet = Object.fromEntries(entries.filter(([, value]) => value !== null));
  let patch = sanityWriteClient.patch(id);

  if (Object.keys(toSet).length > 0) {
    patch = patch.set(toSet);
  }
  if (toUnset.length > 0) {
    patch = patch.unset(toUnset);
  }

  return patch.commit({ visibility: 'sync' });
}

async function commitAndRevalidate<T>(mutation: Promise<T>, documentType?: string, slug?: string) {
  const result = await mutation;
  revalidateSanityContent(documentType, slug);
  return result;
}

export type HistoryPageChanges = Partial<{
  title: string;
  kicker: string | null;
  subtitle: string | null;
  intro: string | null;
  quote: { text: string; attribution: string; role?: string | null } | null;
  stats: Array<{ _key: string; value: string; label: string; detail?: string | null }>;
  sections: Array<{
    _key: string;
    kicker?: string | null;
    title: string;
    paragraphs: string[];
    highlight?: string | null;
  }>;
  milestones: Array<{
    _key: string;
    year: string;
    era: string;
    title: string;
    location?: string | null;
    description: string;
  }>;
  leadershipLegacy: Array<{
    _key: string;
    name: string;
    role: string;
    tenure: string;
    note?: string | null;
  }>;
}>;

export function updateHistoryPage(id: string, changes: HistoryPageChanges, slug?: string) {
  return commitAndRevalidate(patchDocument(id, changes), 'historyPage', slug);
}

export function upsertHistoryPage(
  id: string,
  slug: string,
  data: Record<string, unknown>,
) {
  return commitAndRevalidate(
    sanityWriteClient.createOrReplace(
      {
        _id: id,
        _type: 'historyPage',
        slug: { _type: 'slug', current: slug },
        ...data,
      },
      { visibility: 'sync' },
    ),
    'historyPage',
    slug,
  );
}
