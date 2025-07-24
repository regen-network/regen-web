import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import Image from 'next/image';
import { useNextSanityImage, UseNextSanityImageProps } from 'next-sanity-image';

import { configuredSanityClient } from 'lib/clients/sanity';

type Props = {
  image?: SanityImageSource | null;
  alt?: string | null;
  fallback?: Pick<UseNextSanityImageProps, 'src' | 'height' | 'width'> | null;
  className?: string;
};
const SanityNextImage = ({ image, alt, fallback, className }: Props) => {
  const imageProps =
    useNextSanityImage(configuredSanityClient, image || null) ?? fallback;

  if (!imageProps) return null;
  return <Image {...imageProps} className={className} alt={alt || ''} />;
};
export { SanityNextImage };
