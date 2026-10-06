import { sanityFetch } from '@/src/sanity/client';
import {
  ministryGalleryQuery,
  ministryLeadershipQuery,
  type GalleryPhotoItem,
  type MinistryLeadershipSet,
} from '@/src/sanity/queries';
import MinistryPageClient, { type MinistryPageContent } from '../ministries/MinistryPageClient';

const ministry: MinistryPageContent = {
  galleryId: 'childrens-ministry',
  title: 'Children’s Ministry',
  tagline: 'Jesus! Friend Of Little Children',
  showTagline: false,
  image: '/Children.jpg',
  gradient: 'from-sky-700/80 via-indigo-950/70 to-stone-950',
  accent: 'text-sky-600',
  accentBg: 'bg-sky-500',
  intro: 'A safe, joyful place where children come to know Jesus through stories, songs and play, taught by caring leaders who love them.',
  scripture: {
    text: 'Let the little children come to me, and do not hinder them, for the kingdom of heaven belongs to such as these.',
    ref: 'Matthew 19:14',
  },
  meets: [
    { label: 'Sunday School', value: 'Sundays · during service' },
    { label: 'Ages', value: '0 – 12 years' },
    { label: 'Where', value: 'Your local assembly' },
  ],
};

export default async function ChildrenMinistryPage() {
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
        { title: 'Leader', profile: leadership?.leadershipByCategory?.children?.leader ?? null },
        { title: 'Assistant Leader', profile: leadership?.leadershipByCategory?.children?.assistantLeader ?? null },
        { title: 'Secretary', profile: leadership?.leadershipByCategory?.children?.secretary ?? null },
      ]}
      mottoStatements={[ministry.tagline]}
    />
  );
}
