import SermonsView, { type Sermon } from './SermonsView';
import { sanityFetch } from '@/src/sanity/client';
import { youtubeId, youtubeThumb } from '@/src/sanity/format';
import { sermonsQuery, type RawSermon } from '@/src/sanity/queries';

export default async function SermonsPage() {
  const raw = await sanityFetch<RawSermon[]>(sermonsQuery);
  const sermons: Sermon[] = raw.map(({ customThumb, ...s }) => ({
    ...s,
    youtubeId: youtubeId(s.youtubeUrl),
    thumbnail: customThumb ?? youtubeThumb(s.youtubeUrl),
  }));
  return <SermonsView sermons={sermons} />;
}
