import { createImageUrlBuilder } from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url';
import { dataset, projectId } from './env';

const builder = createImageUrlBuilder({ projectId, dataset });

export type SanityImageAsset = {
  _id?: string;
  _ref?: string;
  url?: string;
  metadata?: {
    lqip?: string;
    dimensions?: {
      width?: number;
      height?: number;
      aspectRatio?: number;
    };
  };
};

export type SanityImageValue = {
  _type?: 'image';
  asset?: SanityImageAsset;
  alt?: string | null;
  caption?: string | null;
  crop?: Record<string, unknown>;
  hotspot?: Record<string, unknown>;
};

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

export function getImageDimensions(image: SanityImageValue | null | undefined) {
  const dimensions = image?.asset?.metadata?.dimensions;
  if (dimensions?.width && dimensions?.height) {
    return { width: dimensions.width, height: dimensions.height };
  }

  const ref = image?.asset?._ref ?? image?.asset?._id;
  const match = ref?.match(/-(\d+)x(\d+)-/);
  if (match) {
    return { width: Number(match[1]), height: Number(match[2]) };
  }

  return { width: 1200, height: 800 };
}
