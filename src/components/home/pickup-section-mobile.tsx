'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface Slide {
  id: string;
  overlayColor: string;
  title: string;
  date: string;
  image: string;
  category?: string;
  description?: string;
}

interface PickupSectionMobileProps {
  slides?: Slide[];
  autoPlayInterval?: number;
  className?: string;
  dictionary?: {
    title?: string;
    subtitle?: string;
  };
}

// Default placeholder slides
const placeholderSlides: Slide[] = [
  { id: '1', overlayColor: '#ED6C00', title: 'رسالة لأولياء الأمور', date: '2025.01.14', image: '/facebook/1.jpg', category: 'أخبار', description: 'رسالة لأولياء الأمور حول البرامج الجديدة...' },
  { id: '2', overlayColor: '#2639A6', title: 'ورشة التصوير', date: '2025.01.20', image: '/facebook/2.jpg', category: 'فعاليات', description: 'انضم إلينا في ورشة التصوير الاحترافي...' },
  { id: '3', overlayColor: '#CC2525', title: 'نتائج المسابقة', date: '2025.01.10', image: '/facebook/3.jpg', category: 'إعلان', description: 'تم الإعلان عن نتائج مسابقة التصوير...' },
  { id: '4', overlayColor: '#139A39', title: 'دورة المونتاج', date: '2025.02.05', image: '/facebook/4.jpg', category: 'تعليم', description: 'دورة جديدة في المونتاج والإخراج...' },
  { id: '5', overlayColor: '#FFD900', title: 'معرض الأعمال', date: '2025.02.15', image: '/facebook/5.jpg', category: 'معرض', description: 'معرض أعمال الطلاب والمبدعين...' },
  { id: '6', overlayColor: '#139A39', title: 'خدمات جديدة', date: '2025.02.20', image: '/facebook/6.jpg', category: 'أخبار', description: 'نقدم لكم باقة من الخدمات الجديدة...' },
];

export function PickupSectionMobile({
  slides = placeholderSlides,
  autoPlayInterval = 5000,
  className,
  dictionary,
}: PickupSectionMobileProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const currentSlide = slides[currentIndex];

  // Navigate to next/previous slide
  const paginate = useCallback((newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prev) => {
      const nextIndex = prev + newDirection;
      if (nextIndex < 0) return slides.length - 1;
      if (nextIndex >= slides.length) return 0;
      return nextIndex;
    });
  }, [slides.length]);

  // Go to specific slide
  const goToSlide = useCallback((index: number) => {
    if (index === currentIndex) return;
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  }, [currentIndex]);

  // Auto-play
  useEffect(() => {
    if (autoPlayInterval <= 0) return;

    autoPlayRef.current = setInterval(() => paginate(1), autoPlayInterval);
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [autoPlayInterval, paginate]);

  // Slide animation variants
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  return (
    <div className={cn('relative w-full min-h-[85vh] px-4 py-8', className)}>
      {/* Background div - edge to edge */}
      <div
        className="absolute inset-x-0 top-1/2 -translate-y-1/2 bg-white pointer-events-none"
        style={{
          height: '50%',
          opacity: 0.08,
        }}
      />

      {/* Header: Title + Badge/Date */}
      <div className="flex items-start justify-between mb-6">
        {/* Title */}
        <div>
          <h2 className="text-foreground font-black text-5xl tracking-wider">
            PICK UP
          </h2>
        </div>

        {/* Badge + Date */}
        <div className="text-end">
          {currentSlide?.category && (
            <span className="inline-block px-3 py-1 bg-muted text-foreground text-sm font-medium rounded mb-2">
              {currentSlide.category}
            </span>
          )}
          <p className="text-foreground font-bold text-lg">
            {currentSlide?.date}
          </p>
        </div>
      </div>

      {/* Main Slide */}
      <div className="relative w-[92%] mx-auto aspect-[4/3] mb-4 overflow-hidden rounded-2xl">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="absolute inset-0 rounded-2xl overflow-hidden"
          >
            <Image
              src={slides[currentIndex].image}
              alt={slides[currentIndex].title}
              fill
              className="object-cover"
              sizes="92vw"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Description */}
      <p className="text-foreground text-base mb-6 line-clamp-2">
        {currentSlide?.description || currentSlide?.title}
      </p>

      {/* Navigation: Arrows left, Dots right */}
      <div className="flex items-center justify-between">
        {/* Arrows */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => paginate(-1)}
            className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md active:scale-95 transition-transform"
            aria-label="Previous slide"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-gold">
              <path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            onClick={() => paginate(1)}
            className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md active:scale-95 transition-transform"
            aria-label="Next slide"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-gold">
              <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {/* Dot Indicators */}
        <div className="flex items-center gap-2">
          {slides.map((_, index) => {
            const isActive = index === currentIndex;
            return (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={cn(
                  'transition-all duration-300 rounded-full',
                  isActive
                    ? 'w-3 h-3 bg-gold border-2 border-gold ring-2 ring-gold/30'
                    : 'w-2 h-2 bg-foreground/40 hover:bg-foreground/60'
                )}
                aria-label={`Go to slide ${index + 1}`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
