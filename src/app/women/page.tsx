import { sanityFetch } from '@/src/sanity/client';
import {
  ministryGalleryQuery,
  ministryLeadershipQuery,
  type GalleryPhotoItem,
  type MinistryLeadershipSet,
} from '@/src/sanity/queries';
import MinistryPageClient, { type MinistryPageContent } from '../ministries/MinistryPageClient';

const ministry: MinistryPageContent = {
  galleryId: 'womens-ministry',
  title: 'Women’s Ministry',
  tagline: 'Kronkron, Ma Awurade. Virteous Ladies! We Live For Christ',
  showTagline: false,
  image: '/Women.png',
  gradient: 'from-rose-700/80 via-fuchsia-950/70 to-stone-950',
  accent: 'text-rose-600',
  accentBg: 'bg-rose-500',
  intro: 'A warm sisterhood empowering women to grow in faith, serve with love and support one another in every season of life.',
  scripture: {
    text: 'She is clothed with strength and dignity, and she laughs without fear of the future.',
    ref: 'Proverbs 31:25',
  },
  meets: [
    { label: 'Fellowship', value: 'Tuesdays · 6:00 PM' },
  
    { label: 'Where', value: 'Local assembly' },
  ],
};

export default async function WomenMinistryPage() {
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
        { title: 'Leader', profile: leadership?.leadershipByCategory?.women?.leader ?? null },
        { title: 'Assistant Leader', profile: leadership?.leadershipByCategory?.women?.assistantLeader ?? null },
        { title: 'Secretary', profile: leadership?.leadershipByCategory?.women?.secretary ?? null },
      ]}
      mottoStatements={[ministry.tagline]}
    />
  );
}
