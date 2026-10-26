import Image from 'next/image';
import { getImageDimensions, type SanityImageValue, urlFor } from '@/src/sanity/image';

type SanityImageProps = {
  image: SanityImageValue | null | undefined;
  altFallback: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
};

export default function SanityImage({
  image,
  altFallback,
  className,
  sizes = '100vw',
  priority = false,
}: SanityImageProps) {
  if (!image?.asset) return null;

  const { width, height } = getImageDimensions(image);
  const blurDataURL = image.asset.metadata?.lqip;

  return (
    <Image
      src={urlFor(image).width(width).height(height).fit('crop').auto('format').url()}
      alt={image.alt || altFallback}
      width={width}
      height={height}
      sizes={sizes}
      priority={priority}
      placeholder={blurDataURL ? 'blur' : 'empty'}
      blurDataURL={blurDataURL}
      className={className}
    />
  );
}
