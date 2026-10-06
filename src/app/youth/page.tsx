import { sanityFetch } from '@/src/sanity/client';
import {
  ministryGalleryQuery,
  ministryLeadershipQuery,
  type GalleryPhotoItem,
  type MinistryLeadershipSet,
} from '@/src/sanity/queries';
import MinistryPageClient, { type MinistryPageContent } from '../ministries/MinistryPageClient';

const ministry: MinistryPageContent = {
  galleryId: 'youth-ministry',
  title: 'Youth Ministry',
  tagline: 'Youth!. Arise and Shine. Remember Your Creator Now. Empowered to Live for Christ Everywhere.',
  showTagline: false,

  image: '/Youth.jpg',
  gradient: 'from-slate-900/80 via-slate-900/70 to-slate-950',
  accent: 'text-amber-700',
  accentBg: 'bg-amber-500',
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
  const [gallery, leadership] = await Promise.all([
    sanityFetch<GalleryPhotoItem[] | null>(ministryGalleryQuery, { id: ministry.galleryId }),
    sanityFetch<MinistryLeadershipSet | null>(ministryLeadershipQuery, { id: ministry.galleryId }),
  ]);
  return (
    <MinistryPageClient
      ministry={ministry}
      gallery={gallery ?? []}
      leader={null}
      leadership={[
        { title: 'Leader', profile: leadership?.leadershipByCategory?.youth?.leader ?? null },
        { title: 'Assistant Leader', profile: leadership?.leadershipByCategory?.youth?.assistantLeader ?? null },
        { title: 'Secretary', profile: leadership?.leadershipByCategory?.youth?.secretary ?? null },
      ]}
      mottoStatements={[
        'Arise and Shine',
        'Remember Your Creator Now',
        'Empowered to Live for Christ Everywhere',
      ]}
    />
  );
}
