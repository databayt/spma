"use client";

import { motion } from "framer-motion";
import { Mic, Play, Clock } from "lucide-react";
import { staggerContainer, fadeInUp } from "@/lib/animations";

const EPISODES = [
  {
    id: "1",
    number: 1,
    titleAr: "تجربتي مع م. هاشم بن عوف",
    titleEn: "My Experience with Eng. Hashim Bin Auf",
    guestAr: "م. هاشم بن عوف",
    guestEn: "Eng. Hashim Bin Auf",
    duration: "45 دقيقة",
    date: "2025-01-10",
  },
  {
    id: "2",
    number: 2,
    titleAr: "تجربتي في إدارة المشاريع الحكومية",
    titleEn: "My Experience in Government PM",
    guestAr: "د. أحمد العقيد",
    guestEn: "Dr. Ahmed Al-Aqeed",
    duration: "38 دقيقة",
    date: "2025-02-14",
  },
  {
    id: "3",
    number: 3,
    titleAr: "من السودان إلى العالمية",
    titleEn: "From Sudan to the World",
    guestAr: "م. عثمان الحسن",
    guestEn: "Eng. Osman Al-Hassan",
    duration: "52 دقيقة",
    date: "2025-03-20",
  },
  {
    id: "4",
    number: 4,
    titleAr: "تحديات إدارة المشاريع في أوقات الأزمات",
    titleEn: "PM Challenges During Crises",
    guestAr: "م. أبوبكر مزمل",
    guestEn: "Eng. Abubaker Muzmil",
    duration: "41 دقيقة",
    date: "2025-04-15",
  },
];

interface Props {
  lang: string;
}

export function PodcastSection({ lang }: Props) {
  const isAr = lang === "ar";

  return (
    <div className="py-4 space-y-8">
      {/* Featured Episode */}
      <motion.div
        className="bg-accent/10 rounded-2xl p-8 flex flex-col md:flex-row gap-8 items-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="w-32 h-32 rounded-2xl bg-accent flex items-center justify-center flex-shrink-0">
          <Mic className="w-16 h-16 text-accent-foreground" />
        </div>
        <div className="flex-1 text-center md:text-start space-y-3">
          <div className="text-sm text-accent font-semibold">
            {isAr ? "أحدث حلقة" : "Latest Episode"} · #{EPISODES[0].number}
          </div>
          <h3 className="text-2xl font-bold text-foreground">
            {isAr ? EPISODES[0].titleAr : EPISODES[0].titleEn}
          </h3>
          <p className="text-muted-foreground">
            {isAr ? EPISODES[0].guestAr : EPISODES[0].guestEn}
          </p>
          <button className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-6 py-2 rounded-full font-medium hover:opacity-90 transition-opacity">
            <Play className="w-4 h-4" fill="currentColor" />
            {isAr ? "استمع الآن" : "Listen Now"}
          </button>
        </div>
      </motion.div>

      {/* All Episodes */}
      <motion.div
        className="space-y-4"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {EPISODES.map((episode) => (
          <motion.div
            key={episode.id}
            variants={fadeInUp}
            className="flex items-center gap-4 p-4 rounded-xl border border-border hover:border-accent transition-colors cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-colors">
              <Play className="w-5 h-5 text-primary group-hover:text-accent transition-colors ms-0.5" fill="currentColor" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-foreground truncate">
                #{episode.number} {isAr ? episode.titleAr : episode.titleEn}
              </h4>
              <p className="text-sm text-muted-foreground">
                {isAr ? episode.guestAr : episode.guestEn}
              </p>
            </div>
            <div className="flex items-center gap-3 text-xs text-muted-foreground flex-shrink-0">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {episode.duration}
              </span>
              <span>{episode.date}</span>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
