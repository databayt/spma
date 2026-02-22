"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { VideoGrid } from "./video-grid";
import { ArticleList } from "./article-list";
import { PodcastSection } from "./podcast-section";
import { fadeIn } from "@/lib/animations";
import type { Dictionary } from "@/components/internationalization/dictionaries";

type Tab = "videos" | "articles" | "podcast";

interface Props {
  lang: string;
  dictionary: Dictionary;
}

export function KnowledgeContent({ lang, dictionary }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>("videos");

  const tabs: { key: Tab; label: string }[] = [
    { key: "videos", label: dictionary.knowledge.videos },
    { key: "articles", label: dictionary.knowledge.articles },
    { key: "podcast", label: dictionary.knowledge.podcast },
  ];

  return (
    <div className="space-y-8">
      <motion.h1
        className="text-4xl md:text-5xl font-bold text-primary"
        variants={fadeIn}
        initial="hidden"
        animate="visible"
      >
        {dictionary.knowledge.title}
      </motion.h1>

      {/* Tab Navigation */}
      <div className="flex gap-1 border-b border-border">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`relative px-6 py-3 font-medium transition-colors ${
              activeTab === tab.key
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab.label}
            {activeTab === tab.key && (
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                layoutId="activeTab"
                transition={{ type: "tween", duration: 0.3 }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === "videos" && <VideoGrid lang={lang} />}
      {activeTab === "articles" && <ArticleList lang={lang} />}
      {activeTab === "podcast" && <PodcastSection lang={lang} />}
    </div>
  );
}
