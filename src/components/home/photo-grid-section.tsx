'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useSpring, MotionValue } from 'framer-motion';
import { MobilePhotoGrid } from '@/components/atom/mobile-photo-grid';

interface GridItem {
  id: string;
  src: string;
}

const gridItems: GridItem[] = [
  { id: 'a', src: '/facebook/1.jpg' },
  { id: 'b', src: '/facebook/2.jpg' },
  { id: 'c', src: '/facebook/3.jpg' },
  { id: 'd', src: '/facebook/4.jpg' },
  { id: 'e', src: '/facebook/spma.jpg' },
  { id: 'tall', src: '/facebook/5.jpg' },
  { id: 'g', src: '/facebook/6.jpg' },
  { id: 'h', src: '/facebook/7.jpg' },
  { id: 'i', src: '/facebook/8.jpg' },
  { id: 'j', src: '/facebook/1.jpg' },
  { id: 'k', src: '/facebook/2.jpg' },
];

function GridImage({
  item,
  className = '',
}: {
  item: GridItem;
  className?: string;
}) {
  return (
    <div className={`relative overflow-hidden rounded-lg ${className}`}>
      <Image
        src={item.src}
        alt=""
        fill
        className="object-cover"
        sizes="(max-width: 768px) 50vw, 33vw"
      />
    </div>
  );
}

function ZoomableE({
  item,
  scale,
  borderRadius,
  zIndex,
  className = '',
}: {
  item: GridItem;
  scale: MotionValue<number>;
  borderRadius: MotionValue<number>;
  zIndex: MotionValue<number>;
  className?: string;
}) {
  return (
    <motion.div
      className={`relative overflow-hidden rounded-lg will-change-transform ${className}`}
      style={{
        scale,
        borderRadius,
        zIndex,
        transformOrigin: 'center center',
      }}
    >
      <Image
        src={item.src}
        alt=""
        fill
        className="object-cover"
        sizes="(max-width: 768px) 50vw, 25vw"
      />
    </motion.div>
  );
}

export function PhotoGridSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const yRaw = useTransform(scrollYProgress, [0, 0.15], [400, 0]);
  const y = useSpring(yRaw, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // 0–0.15: grid slides in, 0.15–0.4: grid rests, 0.4–0.9: zoom to fullscreen, 0.9–1: hold fullscreen
  const eScale = useTransform(scrollYProgress, [0.4, 0.9], [1, 5]);
  const eBorderRadius = useTransform(scrollYProgress, [0.4, 0.6], [8, 0]);
  const eZIndex = useTransform(scrollYProgress, [0.39, 0.4], [0, 50]);
  const otherOpacity = useTransform(scrollYProgress, [0.4, 0.55], [1, 0]);

  const getItem = (id: string) => gridItems.find(item => item.id === id)!;

  return (
    <section ref={containerRef} className="relative h-[150vh] md:h-[400vh]">
      <div className="md:hidden sticky top-0 h-screen overflow-hidden flex items-center">
        <MobilePhotoGrid />
      </div>

      <div
        className="hidden md:block sticky top-0 h-screen overflow-hidden px-4 md:px-5 py-4"
        style={{ contain: 'layout style paint' }}
      >
        <motion.div
          className="w-full h-full flex flex-col gap-4 md:gap-5 will-change-transform"
          style={{ y }}
        >
          <div
            className="flex-[2.5] grid gap-4 md:gap-5"
            style={{ gridTemplateColumns: '38fr 24fr 38fr' }}
          >
            <motion.div className="flex flex-col gap-4 md:gap-5" style={{ opacity: otherOpacity }}>
              <div className="flex-[4] flex gap-4 md:gap-5">
                <GridImage item={getItem('a')} className="flex-[4]" />
                <GridImage item={getItem('b')} className="flex-[6]" />
              </div>
              <GridImage item={getItem('d')} className="flex-[6]" />
            </motion.div>

            <div className="flex flex-col gap-4 md:gap-5">
              <motion.div className="flex-[6]" style={{ opacity: otherOpacity }}>
                <GridImage item={getItem('c')} className="h-full" />
              </motion.div>
              <ZoomableE
                item={getItem('e')}
                scale={eScale}
                borderRadius={eBorderRadius}
                zIndex={eZIndex}
                className="flex-[4]"
              />
            </div>

            <motion.div style={{ opacity: otherOpacity }}>
              <GridImage item={getItem('tall')} className="h-full" />
            </motion.div>
          </div>

          <motion.div
            className="flex-[1.3] flex gap-4 md:gap-5"
            style={{ opacity: otherOpacity }}
          >
            <GridImage item={getItem('g')} className="flex-[1.3]" />
            <GridImage item={getItem('h')} className="flex-[0.9]" />
            <GridImage item={getItem('i')} className="flex-[1.3]" />
            <div className="flex-[0.8] flex flex-col gap-4 md:gap-5">
              <GridImage item={getItem('j')} className="flex-1" />
              <GridImage item={getItem('k')} className="flex-1" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
