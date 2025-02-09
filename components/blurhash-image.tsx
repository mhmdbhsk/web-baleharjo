'use client';

import { cn } from '@/lib/utils';
import { Blurhash } from 'react-blurhash';
import Image from 'next/image';
import { useState } from 'react';

interface BlurHashImageProps {
  src: string;
  alt: string;
  blurhash: string;
  className?: string;
  aspectRatio?: 'square' | 'video' | 'portrait' | 'wide' | 'auto';
  rounded?: boolean;
  fill?: boolean;
  width?: number;
  height?: number;
}

export default function BlurHashImage({
  src,
  alt,
  blurhash,
  className,
  aspectRatio = 'auto',
  rounded = false,
  fill = true,
  width,
  height,
}: BlurHashImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  const aspectRatioClasses = {
    square: 'aspect-square',
    video: 'aspect-video',
    portrait: 'aspect-[3/4]',
    wide: 'aspect-[16/9]',
    auto: '',
  };

  return (
    <div
      className={cn(
        'relative overflow-hidden',
        aspectRatioClasses[aspectRatio],
        rounded && 'rounded-lg',
        className
      )}
    >
      {!isLoaded && (
        <div className="absolute inset-0">
          <Blurhash
            hash={blurhash}
            width="100%"
            height="100%"
            resolutionX={32}
            resolutionY={32}
            punch={1}
          />
        </div>
      )}
      <Image
        src={src}
        alt={alt}
        className={cn(
          'duration-700 ease-in-out',
          isLoaded ? 'scale-100 blur-0' : 'scale-110 blur-lg',
          fill ? 'object-cover' : 'object-contain'
        )}
        onLoadingComplete={() => setIsLoaded(true)}
        fill={fill}
        width={!fill ? width : undefined}
        height={!fill ? height : undefined}
      />
    </div>
  );
}
