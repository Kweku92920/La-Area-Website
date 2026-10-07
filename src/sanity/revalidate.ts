import { revalidatePath, revalidateTag } from 'next/cache';

const typeToPaths: Record<string, string[]> = {
  district: ['/districts', '/assemblies', '/'],
  assembly: ['/assemblies', '/assemblies/[id]', '/districts', '/'],
  leader: ['/leadership', '/assemblies', '/districts', '/ministries', '/'],
  event: ['/', '/sermons', '/assemblies', '/districts'],
  sermon: ['/', '/sermons'],
  siteSettings: ['/', '/sitemap.xml'],
  ministryLeader: ['/leadership', '/ministries', '/youth', '/women', '/men', '/children', '/'],
  ministry: ['/ministries', '/ministries/[id]', '/youth', '/women', '/men', '/children', '/'],
};

export function revalidateSanityContent(documentType?: string, slug?: string | null) {
  const resolvedType = documentType || 'siteSettings';
  const tags = [`sanity`, `sanity:${resolvedType}`];

  if (slug) {
    tags.push(`sanity:${resolvedType}:${slug}`);
  }

  for (const tag of tags) {
    revalidateTag(tag, 'default');
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
