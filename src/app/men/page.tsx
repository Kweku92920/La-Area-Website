import { sanityFetch } from '@/src/sanity/client';
import {
  ministryGalleryQuery,
  ministryLeadershipQuery,
  type GalleryPhotoItem,
  type MinistryLeadershipSet,
} from '@/src/sanity/queries';
import MinistryPageClient, { type MinistryPageContent } from '../ministries/MinistryPageClient';

const ministry: MinistryPageContent = {
  galleryId: 'mens-ministry',
  title: "Men's Ministry",
  tagline: 'Man!! The Image and the Glory of God.  Be Strong And Courageous. We are Firmly Established',
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
        { title: 'Leader', profile: leadership?.leadershipByCategory?.men?.leader ?? null },
        { title: 'Assistant Leader', profile: leadership?.leadershipByCategory?.men?.assistantLeader ?? null },
        { title: 'Secretary', profile: leadership?.leadershipByCategory?.men?.secretary ?? null },
      ]}
      mottoStatements={[ministry.tagline]}
    />
  );
}
