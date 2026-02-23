'use client';

import { useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValueEvent } from 'framer-motion';
import { Video, Camera, Palette, Share2 } from 'lucide-react';
import type { Dictionary } from '@/components/internationalization/dictionaries';

interface DreamSectionProps {
  dictionary: Dictionary;
}

type ServiceKey = 'video' | 'photo' | 'design' | 'social';

interface Tag {
  id: string;
  services: ServiceKey[];
}

// Expanded tag list (25+ tags) organized by category
const tags: Tag[] = [
  // Video
  { id: 'storytelling', services: ['video'] },
  { id: 'commercials', services: ['video'] },
  { id: 'documentaries', services: ['video'] },
  { id: 'musicVideos', services: ['video'] },
  { id: 'liveStreaming', services: ['video'] },
  // Photo
  { id: 'productShots', services: ['photo'] },
  { id: 'events', services: ['photo'] },
  { id: 'portraits', services: ['photo'] },
  { id: 'editorial', services: ['photo'] },
  { id: 'architecture', services: ['photo'] },
  // Design
  { id: 'branding', services: ['design'] },
  { id: 'visualSystems', services: ['design'] },
  { id: 'packaging', services: ['design'] },
  { id: 'webDesign', services: ['design'] },
  { id: 'printDesign', services: ['design'] },
  // Social
  { id: 'socialStrategy', services: ['social'] },
  { id: 'contentCreation', services: ['social'] },
  { id: 'influencer', services: ['social'] },
  { id: 'analytics', services: ['social'] },
  { id: 'community', services: ['social'] },
  // Cross-category
  { id: 'motionGraphics', services: ['video', 'design'] },
  { id: 'creativeDirection', services: ['video', 'photo', 'design', 'social'] },
  { id: 'campaigns', services: ['video', 'photo', 'social'] },
  { id: 'rebranding', services: ['design', 'social'] },
  { id: 'digitalMarketing', services: ['social', 'design'] },
  { id: 'podcast', services: ['video', 'social'] },
];

const services = [
  { key: 'video' as const, icon: Video, color: 'bg-primary' },
  { key: 'photo' as const, icon: Camera, color: 'bg-blue-500' },
  { key: 'design' as const, icon: Palette, color: 'bg-pink-500' },
  { key: 'social' as const, icon: Share2, color: 'bg-green-500' },
];

export function DreamSection({ dictionary }: DreamSectionProps) {
  const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set());
  const [hoveredTag, setHoveredTag] = useState<string | null>(null);
  const [animationComplete, setAnimationComplete] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Scroll-linked animation setup
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 80px', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Box animations - starts at 0 (when section reaches top), completes at 0.4
  const boxY = useTransform(smoothProgress, [0, 0.4], [10, 205]);
  const boxHeight = useTransform(smoothProgress, [0, 0.4], ['140px', '480px']);
  const boxBgColor = useTransform(smoothProgress, [0, 0.4], ['#E5E5E5', '#F0B135']);

  // Text animations ("YOUR DREAM" moves left, both texts turn gray suddenly at end)
  const textX = useTransform(smoothProgress, [0, 0.4], [0, -285]);
  const textColor = useTransform(smoothProgress, [0.35, 0.4], ['#F0B135', '#E5E5E5']);
  const findColor = useTransform(smoothProgress, [0.35, 0.4], ['#F0B135', '#E5E5E5']);
  const subtitleColor = useTransform(smoothProgress, [0.35, 0.4], ['#171717', '#F0B135']);

  // Track when animation completes to enable tag hover
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    setAnimationComplete(latest >= 0.35);
  });

  const dreamDict = dictionary.dream as {
    title: string;
    subtitle: string;
    tags: Record<string, string>;
  };

  const servicesDict = dictionary.dreamServices as {
    video: { title: string; description: string };
    photo: { title: string; description: string };
    design: { title: string; description: string };
    social: { title: string; description: string };
  };

  const visibleServices = useMemo(() => {
    if (selectedTags.size === 0) return new Set<ServiceKey>();

    const serviceSet = new Set<ServiceKey>();
    selectedTags.forEach(tagId => {
      const tag = tags.find(t => t.id === tagId);
      if (tag) {
        tag.services.forEach(service => serviceSet.add(service));
      }
    });
    return serviceSet;
  }, [selectedTags]);

  const toggleTag = (tagId: string) => {
    setSelectedTags(prev => {
      const newSet = new Set(prev);
      if (newSet.has(tagId)) {
        newSet.delete(tagId);
      } else {
        newSet.add(tagId);
      }
      return newSet;
    });
  };

  return (
    <section ref={sectionRef} className="relative h-[300vh] bg-background">
      <div className="sticky top-0 min-h-screen py-12 md:py-24 px-4 md:px-0">
        {/* Desktop Title Row with scroll animation */}
        <div className="hidden md:flex w-full items-center gap-1 md:gap-1.5 mb-8 md:mb-12">
          {/* FIND */}
          <motion.span
            className="text-[clamp(3rem,15vw,12rem)] font-black leading-[0.8] flex-shrink-0"
            style={{ color: findColor }}
          >
            FIND
          </motion.span>

          {/* Box container - relative wrapper for absolute positioned animated box */}
          <div className="relative w-[clamp(7rem,18vw,16rem)] flex-shrink-0 self-start">
            {/* Animated ? box - absolutely positioned so height expansion doesn't affect layout */}
            <motion.div
              className="absolute top-0 start-0 w-full rounded-lg flex flex-col items-center justify-center will-change-transform overflow-hidden"
              style={{
                y: boxY,
                height: boxHeight,
                backgroundColor: boxBgColor,
              }}
            >
              <AnimatePresence mode="wait">
                {hoveredTag ? (
                  <motion.div
                    key="hovered-content"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className="flex flex-col w-full h-full p-3"
                  >
                    {/* Top cream card with speech bubble */}
                    <div className="relative flex flex-col items-center justify-center text-black text-center bg-[#FAE5CC] rounded-[3.5rem] px-2 py-16 mx-7 mt-10">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={hoveredTag}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          transition={{ duration: 0.15 }}
                          className="flex flex-col items-center"
                        >
                          <span className="text-xs uppercase tracking-wider text-[#F0B135]">
                            {tags.find(t => t.id === hoveredTag)?.services[0]}
                          </span>
                          <span className="text-lg font-extrabold mt-1 leading-tight">
                            {dreamDict.tags[hoveredTag]}
                          </span>
                          <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center my-3">
                            <div className="w-11 h-11 rounded-full bg-neutral-200" />
                          </div>
                          <span className="text-lg font-extrabold">is passion!</span>
                        </motion.div>
                      </AnimatePresence>
                      {/* Speech bubble pointer */}
                      <svg
                        className="absolute -bottom-3 left-1/2 -translate-x-1/2"
                        width="20"
                        height="12"
                        viewBox="0 0 20 12"
                      >
                        <path d="M0 0 L10 12 L20 0 Z" fill="#FAE5CC" />
                      </svg>
                    </div>
                    {/* Bottom section */}
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={hoveredTag}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.15 }}
                        className="flex-1 flex flex-col items-center justify-start text-center px-2 pt-8"
                      >
                        <p className="text-white font-bold text-lg leading-tight">
                          {tags.find(t => t.id === hoveredTag)?.services[0] === 'video' && 'Video Production'}
                          {tags.find(t => t.id === hoveredTag)?.services[0] === 'photo' && 'Photography'}
                          {tags.find(t => t.id === hoveredTag)?.services[0] === 'design' && 'Visual Design'}
                          {tags.find(t => t.id === hoveredTag)?.services[0] === 'social' && 'Social Media'}
                        </p>
                        <p className="text-white/80 text-base mt-1">is recommended!</p>
                      </motion.div>
                    </AnimatePresence>
                  </motion.div>
                ) : (
                  <motion.span
                    key="question"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-[clamp(2rem,8vw,6rem)] text-white font-light"
                  >
                    ?
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* YOUR DREAM - animated container */}
          <motion.div
            className="flex items-center flex-grow justify-end -ms-3"
            style={{ x: textX }}
          >
            {/* YOUR - Vertical text */}
            <motion.span
              className="text-[clamp(1.6rem,3.5vw,2.8rem)] font-extrabold tracking-[0.1em] flex-shrink-0"
              style={{
                writingMode: 'vertical-lr',
                transform: 'rotate(180deg)',
                color: textColor,
              }}
            >
              YOUR
            </motion.span>

            {/* DREAM */}
            <motion.span
              className="text-[clamp(3rem,15vw,12rem)] font-black leading-[0.8] -ms-3"
              style={{ color: textColor }}
            >
              DREAM
            </motion.span>
          </motion.div>
        </div>

        {/* Mobile Title Row - no scroll animation */}
        <div className="flex md:hidden flex-col items-center gap-2 mb-8">
          <div className="flex items-center gap-2">
            <span className="text-4xl font-black text-[#F0B135] leading-[0.9]">FIND</span>
            <div className="w-12 h-10 bg-neutral-200 rounded-md flex items-center justify-center">
              <span className="text-2xl text-white font-light">?</span>
            </div>
          </div>
          <span className="text-4xl font-black text-[#F0B135] leading-[0.9]">YOUR DREAM</span>
        </div>

        {/* Subtitle */}
        <p className="text-center md:text-start text-xl md:text-3xl lg:text-4xl font-black text-foreground mb-8 md:mb-14 md:ms-[50%] pe-0 md:pe-4">
          {dreamDict.subtitle.split('what').map((part, i, arr) => (
            <span key={i}>
              {part}
              {i < arr.length - 1 && (
                <motion.span style={{ color: subtitleColor }}>what</motion.span>
              )}
            </span>
          ))}
        </p>

        {/* Hashtag Tag Cloud */}
        <div className="md:ms-[50%] pe-0 md:pe-8 lg:pe-16 xl:pe-24">
          <div className="flex flex-wrap justify-center md:justify-start gap-3">
            {tags.map((tag) => {
              const isHovered = hoveredTag === tag.id;
              const tagLabel = dreamDict.tags[tag.id];

              if (!tagLabel) return null;

              return (
                <div
                  key={tag.id}
                  onMouseEnter={() => animationComplete && setHoveredTag(tag.id)}
                  onMouseLeave={() => setHoveredTag(null)}
                  className={`
                    px-3 py-2 md:px-5 md:py-2.5 rounded-full text-xs md:text-base
                    transition-all duration-200 cursor-default select-none
                    ${isHovered && animationComplete
                      ? 'bg-black text-white outline outline-1 outline-black'
                      : 'bg-transparent text-black outline outline-1 outline-black'
                    }
                  `}
                >
                  #{tagLabel}
                </div>
              );
            })}
          </div>

          {/* Service Cards - Only shown when tags selected */}
          <AnimatePresence>
            {selectedTags.size > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.5 }}
                className="mt-12 md:mt-16 overflow-hidden"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                  <AnimatePresence mode="popLayout">
                    {services.map((service, index) => {
                      const Icon = service.icon;
                      const serviceData = servicesDict[service.key];
                      const isVisible = visibleServices.has(service.key);

                      if (!isVisible) return null;

                      return (
                        <motion.div
                          key={service.key}
                          layout
                          initial={{ opacity: 0, y: 30, scale: 0.9 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          transition={{
                            duration: 0.4,
                            delay: index * 0.1,
                            layout: { duration: 0.3 }
                          }}
                          className="group"
                        >
                          <motion.div
                            whileHover={{ y: -8 }}
                            transition={{ duration: 0.3 }}
                            className={`
                              h-64 md:h-72 rounded-2xl ${service.color}
                              flex flex-col items-center justify-center text-white p-6
                              shadow-lg hover:shadow-xl transition-shadow duration-300
                            `}
                          >
                            <Icon size={44} className="mb-4 group-hover:scale-110 transition-transform duration-300" />
                            <h3 className="text-lg md:text-xl font-bold text-center mb-2">{serviceData.title}</h3>
                            <p className="text-white/80 text-center text-sm leading-relaxed">
                              {serviceData.description}
                            </p>
                          </motion.div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
