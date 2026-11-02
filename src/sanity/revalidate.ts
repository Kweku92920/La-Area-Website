import { revalidatePath, revalidateTag } from 'next/cache';

const typeToPaths: Record<string, string[]> = {
  district: ['/districts', '/assemblies', '/'],
  assembly: ['/assemblies', '/assemblies/[id]', '/districts', '/'],
  leader: ['/leadership', '/assemblies', '/districts', '/ministries', '/', '/about/history-of-pentecost', '/about/history-of-la-area'],
  event: ['/', '/sermons', '/assemblies', '/districts'],
  sermon: ['/', '/sermons'],
  siteSettings: ['/', '/about', '/about/history-of-pentecost', '/about/history-of-la-area', '/sitemap.xml'],
  ministryLeader: ['/leadership', '/ministries', '/ministries/[id]', '/youth', '/women', '/men', '/children', '/'],
  ministry: ['/ministries', '/ministries/[id]', '/youth', '/women', '/men', '/children', '/'],
  historyPage: ['/about', '/about/history-of-pentecost', '/about/history-of-la-area', '/'],
  history: ['/about', '/about/history-of-pentecost', '/about/history-of-la-area', '/'],
};

export function revalidateSanityContent(documentType?: string, slug?: string | null) {
  const resolvedType = documentType || 'siteSettings';
  const tags = [`sanity`, `sanity:${resolvedType}`];

  if (resolvedType === 'historyPage' || resolvedType === 'history') {
    tags.push('sanity:history', 'sanity:historyPage');
  }

  if (slug) {
    tags.push(`sanity:${resolvedType}:${slug}`);
  }

  for (const tag of tags) {
    revalidateTag(tag, { expire: 0 });
  }

  const paths = typeToPaths[resolvedType] ?? ['/'];
  for (const path of paths) {
    if (path === '/') {
      revalidatePath(path, 'layout');
      continue;
    }

    revalidatePath(path, 'page');
  }

  revalidatePath('/sitemap.xml');
}
