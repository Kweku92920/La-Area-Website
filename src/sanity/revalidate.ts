import { revalidatePath, revalidateTag } from 'next/cache';

export function revalidateSanityContent() {
  revalidateTag('sanity', { expire: 0 });
  revalidatePath('/', 'layout');
  revalidatePath('/districts');
  revalidatePath('/assemblies');
  revalidatePath('/assemblies/[id]', 'page');
  revalidatePath('/sitemap.xml');
}
