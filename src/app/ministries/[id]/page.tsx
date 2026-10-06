import { notFound } from 'next/navigation';
import { sanityFetch } from '@/src/sanity/client';
import {
  ministryDetailQuery,
  type MinistryDetailItem,
} from '@/src/sanity/queries';
import MinistryPageClient from '../MinistryPageClient';

export default async function MinistryDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const ministry = await sanityFetch<MinistryDetailItem | null>(ministryDetailQuery, { id });

  if (!ministry) notFound();

  const category = (['women', 'men', 'children', 'youth'] as const).find((key) =>
    [ministry.sector, ministry.id, ministry.title]
      .join(' ')
      .toLowerCase()
      .includes(key),
  );
  const categoryLeadership = category
    ? ministry.leadershipByCategory?.[category]
    : null;
  const leadership = categoryLeadership
    ? [
        { title: 'Leader', profile: categoryLeadership.leader },
        { title: 'Assistant Leader', profile: categoryLeadership.assistantLeader },
        { title: 'Secretary', profile: categoryLeadership.secretary },
      ]
    : [
        { title: ministry.leader?.role ?? 'Ministry Leader', profile: ministry.leader },
        { title: 'Assistant Leader', profile: ministry.assistantLeader },
        { title: 'Secretary', profile: ministry.secretary },
      ].filter((slot) => slot.profile);

  return (
    <MinistryPageClient
      ministry={{
        galleryId: ministry.id,
        title: ministry.title,
        tagline: ministry.description || 'A place to grow, serve and belong.',
        image: ministry.heroImage ?? ministry.image ?? '/theme.jpg',
        gradient: 'from-slate-900/80 via-slate-900/70 to-slate-950',
        accent: 'text-amber-700',
        accentBg: 'bg-amber-500',
        intro: ministry.description || 'Discover this ministry and find a place to grow, serve, and belong.',
      }}
      gallery={ministry.gallery}
      leader={ministry.leader}
      leadership={leadership}
    />
  );
}
