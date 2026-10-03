import { sanityFetch } from '@/src/sanity/client';
import { ministryGalleryQuery, ministryLeaderQuery, type GalleryPhotoItem, type MinistryLeaderProfile } from '@/src/sanity/queries';
import MinistryPageClient, { type MinistryPageContent } from '../ministries/MinistryPageClient';

const ministry: MinistryPageContent = {
  galleryId: 'youth-ministry',
  title: 'Youth Ministry',
  tagline: 'Arise and Shine.',

  image: '/Youth.jpg',
  gradient: 'from-orange-700/80 via-rose-900/70 to-stone-950',
  accent: 'text-orange-600',
  accentBg: 'bg-orange-500',
  intro: 'A vibrant community of young people discovering their purpose in Christ, building real friendships and rising up as leaders in church and society.',
  scripture: {
    text: 'Let no one despise your youth, but be an example to the believers in word, in conduct, in love, in spirit, in faith, in purity.',
    ref: '1 Timothy 4:12',
  },
  meets: [
    { label: 'Fellowship', value: 'Monday · 6:00 PM' },
    { label: 'Ages', value: '13 – 35 years' },
    { label: 'Where', value: 'Local assembly' },
  ],
};

export default async function YouthMinistryPage() {
  const [gallery, leader] = await Promise.all([
    sanityFetch<GalleryPhotoItem[] | null>(ministryGalleryQuery, { id: ministry.galleryId }),
    sanityFetch<MinistryLeaderProfile | null>(ministryLeaderQuery, { id: ministry.galleryId }),
  ]);
  return <MinistryPageClient ministry={ministry} gallery={gallery ?? []} leader={leader} />;
}
