import GalleryView from './GalleryView';
import { sanityFetch } from '@/src/sanity/fetch';
import { galleryItemsQuery, type GalleryItem } from '@/src/sanity/queries';

export const metadata = {
  title: 'Gallery - The Church of Pentecost LA Area',
  description: 'Photos of worship, fellowship, and service across the LA Area.',
};

export default async function GalleryPage() {
  const items = await sanityFetch<GalleryItem[]>(galleryItemsQuery, {}, {
    revalidate: false,
    documentType: 'galleryItem',
  });

  return <GalleryView items={items} />;
}
