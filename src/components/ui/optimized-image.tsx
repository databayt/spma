'use client';

import Image, { ImageProps } from 'next/image';

interface OptimizedImageProps extends Omit<ImageProps, 'alt'> {
  alt: string;
}

export function OptimizedImage({ alt, ...props }: OptimizedImageProps) {
  return (
    <Image
      alt={alt}
      {...props}
    />
  );
}
