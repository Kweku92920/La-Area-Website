import type { Metadata } from 'next';
import { sanityFetchSafe } from '@/src/sanity/fetch';
import { historyPageBySlugQuery, type HistoryPageData } from '@/src/sanity/queries';
import { LA_AREA_HISTORY, mergeHistoryWithSanity } from '@/src/data/history';
import HistoryArticleView from '../HistoryArticleView';

const SLUG_CANDIDATES = [
  'la-area',
  'history-of-la-area',
  'history-of-the-area',
  'history-of-the-la-area',
  'area-history',
];

const ID_CANDIDATES = [
  'history-la-area',
  'historyPage-la-area',
];

async function getLaAreaHistory(): Promise<HistoryPageData> {
  const sanityDoc = await sanityFetchSafe<Partial<HistoryPageData> | null>(
    historyPageBySlugQuery,
    { slugs: SLUG_CANDIDATES, ids: ID_CANDIDATES },
    null,
    {
      documentType: 'historyPage',
      documentId: 'la-area',
      tags: ['sanity:history', 'sanity:historyPage:la-area'],
    },
  );

  return mergeHistoryWithSanity(LA_AREA_HISTORY, sanityDoc);
}

export async function generateMetadata(): Promise<Metadata> {
  const history = await getLaAreaHistory();
  return {
    title: `${history.title} - The Church of Pentecost LA Area`,
    description: history.subtitle,
  };
}

export default async function HistoryOfLaAreaPage() {
  const history = await getLaAreaHistory();

  return (
    <HistoryArticleView
      history={history}
      companionHref="/about/history-of-pentecost"
      companionLabel="History of The Church of Pentecost"
      companionSubtitle="Discover the global origins of The Church of Pentecost from Rev. James McKeown’s arrival in 1937 to over 170 nations today."
    />
  );
}
