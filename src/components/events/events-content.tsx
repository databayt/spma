"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { EVENTS } from "@/components/home/constants";
import { EventCard } from "./event-card";
import { staggerContainer, fadeIn } from "@/lib/animations";
import type { Dictionary } from "@/components/internationalization/dictionaries";

type FilterType = "all" | "workshop" | "webinar" | "course";

interface Props {
  lang: string;
  dictionary: Dictionary;
}

export function EventsContent({ lang, dictionary }: Props) {
  const [filter, setFilter] = useState<FilterType>("all");
  const isAr = lang === "ar";

  const filters: { key: FilterType; label: string }[] = [
    { key: "all", label: dictionary.events.all },
    { key: "workshop", label: dictionary.events.workshops },
    { key: "webinar", label: dictionary.events.webinars },
    { key: "course", label: dictionary.events.courses },
  ];

  const filteredEvents =
    filter === "all"
      ? EVENTS
      : EVENTS.filter((e) => e.type === filter);

  return (
    <div className="space-y-8">
      <motion.div variants={fadeIn} initial="hidden" animate="visible">
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
          {dictionary.events.title}
        </h1>
      </motion.div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              filter === f.key
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Events Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        key={filter}
      >
        {filteredEvents.map((event) => (
          <EventCard key={event.id} event={event} lang={lang} dictionary={dictionary} />
        ))}
      </motion.div>

      {filteredEvents.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          {(dictionary as any).eventTemplate?.noEvents ??
            (isAr ? "لا توجد فعاليات في هذا التصنيف" : "No events in this category")}
        </div>
      )}
    </div>
  );
}
