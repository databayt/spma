"use client";

import { motion } from "framer-motion";
import { Calendar, MapPin } from "lucide-react";
import { fadeInUp } from "@/lib/animations";
import type { EventItem } from "@/components/home/types";
import type { Dictionary } from "@/components/internationalization/dictionaries";

interface Props {
  event: EventItem;
  lang: string;
  dictionary: Dictionary;
}

export function EventCard({ event, lang, dictionary }: Props) {
  const isAr = lang === "ar";

  return (
    <motion.div
      variants={fadeInUp}
      className="rounded-xl border border-border overflow-hidden hover:shadow-lg transition-shadow"
    >
      {/* Color accent bar */}
      <div className="h-2" style={{ backgroundColor: event.color }} />

      <div className="p-6 space-y-4">
        {/* Date badge */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 bg-accent/10 text-accent-foreground px-3 py-1 rounded-full text-sm font-medium">
            <Calendar className="w-3.5 h-3.5" />
            <span>{event.date}</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="font-bold text-lg text-foreground line-clamp-2">
          {isAr ? event.title : event.titleEn}
        </h3>

        {/* Meta */}
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium bg-primary/10 text-primary px-3 py-1 rounded-full">
            {event.typeLabel}
          </span>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <MapPin className="w-3 h-3" />
            <span>
              {event.location === "online"
                ? dictionary.events.online
                : dictionary.events.inPerson}
            </span>
          </div>
        </div>

        {/* Register Button */}
        <button className="w-full h-10 bg-primary text-primary-foreground rounded-lg font-medium text-sm hover:opacity-90 transition-opacity">
          {dictionary.events.registerNow}
        </button>
      </div>
    </motion.div>
  );
}
