import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { sanityFetch } from '@/src/sanity/fetch';
import { historyPageBySlugQuery, type HistoryPageData } from '@/src/sanity/queries';
import HistoryArticleView from '../HistoryArticleView';

const SLUG_CANDIDATES = [
  'church-of-pentecost',
  'history-of-pentecost',
  'history-of-the-church-of-pentecost',
  'pentecost-history',
];

const ID_CANDIDATES = [
  'history-church-of-pentecost',
  'historyPage-church-of-pentecost',
];

async function getChurchHistory(): Promise<HistoryPageData> {
  const history = await sanityFetch<HistoryPageData | null>(
    historyPageBySlugQuery,
    { slugs: SLUG_CANDIDATES, ids: ID_CANDIDATES },
    {
      documentType: 'historyPage',
      documentId: 'history-church-of-pentecost',
      tags: ['sanity:history', 'sanity:historyPage:church-of-pentecost'],
      revalidate: 0,
      useCdn: false,
    },
  );

  if (!history) notFound();
  return history;
}

export async function generateMetadata(): Promise<Metadata> {
  const history = await getChurchHistory();
  return {
    title: `${history.title} - The Church of Pentecost LA Area`,
    description: history.subtitle,
  };
}

export default async function HistoryOfPentecostPage() {
  const history = await getChurchHistory();

  return (
    <HistoryArticleView
      history={history}
      companionHref="/about/history-of-la-area"
      companionLabel="History of The Area (La Area)"
      companionSubtitle="Explore how the apostolic revival took root in La, Osu, and Accra and grew into 24 districts and 81 local assemblies."
    />
  );
}
