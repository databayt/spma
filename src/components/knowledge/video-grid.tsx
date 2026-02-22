"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Play } from "lucide-react";
import { staggerContainer, fadeInUp } from "@/lib/animations";

const VIDEOS = [
  {
    id: "1",
    title: "التحول الرقمي في إدارة المشاريع",
    titleEn: "Digital Transformation in PM",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    author: "SPMA",
    date: "2025-01-15",
  },
  {
    id: "2",
    title: "إدارة المخاطر في المشاريع الكبرى",
    titleEn: "Risk Management in Large Projects",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    author: "م. عثمان الحسن",
    date: "2025-02-10",
  },
  {
    id: "3",
    title: "منهجية Agile للفرق السودانية",
    titleEn: "Agile Methodology for Sudanese Teams",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    author: "م. أبوبكر مزمل",
    date: "2025-03-05",
  },
  {
    id: "4",
    title: "أساسيات MS Project",
    titleEn: "MS Project Fundamentals",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    author: "SPMA",
    date: "2025-04-01",
  },
  {
    id: "5",
    title: "قيادة فرق المشاريع عن بعد",
    titleEn: "Leading Remote Project Teams",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    author: "SPMA",
    date: "2025-05-15",
  },
  {
    id: "6",
    title: "إعداد خطة المشروع",
    titleEn: "Preparing a Project Plan",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    author: "SPMA",
    date: "2025-06-01",
  },
];

interface Props {
  lang: string;
}

export function VideoGrid({ lang }: Props) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const isAr = lang === "ar";

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-4"
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      {VIDEOS.map((video, idx) => (
        <motion.div
          key={video.id}
          variants={fadeInUp}
          className="relative group cursor-pointer"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-muted block rounded-xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 0.15 } }}
                exit={{ opacity: 0, transition: { duration: 0.15, delay: 0.2 } }}
              />
            )}
          </AnimatePresence>
          <div className="relative z-10 p-2 space-y-3">
            <div className="aspect-video relative w-full overflow-hidden rounded-lg bg-muted">
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <div className="w-14 h-14 rounded-full bg-primary/80 flex items-center justify-center group-hover:bg-primary transition-colors">
                  <Play className="w-6 h-6 text-white ms-1" fill="white" />
                </div>
              </div>
              <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20" />
            </div>
            <h4 className="font-bold text-foreground line-clamp-1">
              {isAr ? video.title : video.titleEn}
            </h4>
            <p className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>{video.author}</span>
              <span>·</span>
              <span>{video.date}</span>
            </p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
