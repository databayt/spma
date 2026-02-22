'use client';

import Image from 'next/image';
import { InfiniteSlider } from '@/components/atom/infinite-slider';

interface GridItem {
  id: string;
  width: string;
  src: string;
}

const topRowItems: GridItem[] = [
  { id: '1', width: 'w-28', src: '/facebook/1.jpg' },
  { id: '2', width: 'w-40', src: '/facebook/2.jpg' },
  { id: '3', width: 'w-32', src: '/facebook/3.jpg' },
  { id: '4', width: 'w-36', src: '/facebook/4.jpg' },
  { id: '5', width: 'w-28', src: '/facebook/5.jpg' },
];

const bottomRowItems: GridItem[] = [
  { id: '1', width: 'w-32', src: '/facebook/6.jpg' },
  { id: '2', width: 'w-28', src: '/facebook/7.jpg' },
  { id: '3', width: 'w-40', src: '/facebook/8.jpg' },
  { id: '4', width: 'w-36', src: '/facebook/1.jpg' },
  { id: '5', width: 'w-32', src: '/facebook/2.jpg' },
];

export function MobilePhotoGrid() {
  return (
    <div className="flex flex-col gap-3 py-4">
      <InfiniteSlider gap={12} speed={80} reverse={false}>
        {topRowItems.map((item) => (
          <div
            key={item.id}
            className={`${item.width} h-36 rounded-lg flex-shrink-0 relative overflow-hidden`}
          >
            <Image
              src={item.src}
              alt=""
              fill
              className="object-cover"
              sizes="160px"
            />
          </div>
        ))}
      </InfiniteSlider>

      <div
        className="h-72 rounded-lg mx-auto relative overflow-hidden"
        style={{ width: 'calc(100% - 32px)' }}
      >
        <Image
          src="/facebook/spma.jpg"
          alt="SPMA"
          fill
          className="object-cover"
          sizes="100vw"
        />
      </div>

      <InfiniteSlider gap={12} speed={80} reverse={true}>
        {bottomRowItems.map((item) => (
          <div
            key={item.id}
            className={`${item.width} h-36 rounded-lg flex-shrink-0 relative overflow-hidden`}
          >
            <Image
              src={item.src}
              alt=""
              fill
              className="object-cover"
              sizes="160px"
            />
          </div>
        ))}
      </InfiniteSlider>
    </div>
  );
}
