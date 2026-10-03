import { sanityFetch } from '@/src/sanity/client';
import { ministryGalleryQuery, ministryLeaderQuery, type GalleryPhotoItem, type MinistryLeaderProfile } from '@/src/sanity/queries';
import MinistryPageClient, { type MinistryPageContent } from '../ministries/MinistryPageClient';

const ministry: MinistryPageContent = {
  galleryId: 'mens-ministry',
  title: "Men's Ministry",
  tagline: 'The Image and the Glory of God.',
  image: '/Pemem.png',
  gradient: 'from-amber-800/80 via-stone-900/75 to-stone-950',
  accent: 'text-amber-700',
  accentBg: 'bg-amber-600',
  intro: 'A community equipping men to grow as disciples of Christ and lead their families, church and communities with godly character and integrity.',
  scripture: {
    text: 'Be watchful, stand firm in the faith, act like men, be strong.',
    ref: '1 Corinthians 16:13',
  },
  meets: [
    { label: 'Fellowship', value: 'Wednesday · 6:00 PM' },

    { label: 'Where', value: 'Local assembly' },
  ],
};

export default async function MenMinistryPage() {
  const [gallery, leader] = await Promise.all([
    sanityFetch<GalleryPhotoItem[] | null>(ministryGalleryQuery, { id: ministry.galleryId }),
    sanityFetch<MinistryLeaderProfile | null>(ministryLeaderQuery, { id: ministry.galleryId }),
  ]);
  return <MinistryPageClient ministry={ministry} gallery={gallery ?? []} leader={leader} />;
}
