"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { staggerContainer, fadeInUp } from "@/lib/animations";

const ARTICLES = [
  {
    id: "1",
    title: "أهمية إدارة المشاريع في التنمية المستدامة",
    titleEn: "Importance of PM in Sustainable Development",
    description: "كيف يمكن لإدارة المشاريع أن تساهم في تحقيق أهداف التنمية المستدامة في السودان",
    descriptionEn: "How PM can contribute to achieving sustainable development goals in Sudan",
    author: "د. أحمد العقيد",
    date: "2025-01-20",
  },
  {
    id: "2",
    title: "التحول الرقمي وأثره على إدارة المشاريع",
    titleEn: "Digital Transformation Impact on PM",
    description: "استكشاف دور التكنولوجيا الحديثة في تطوير ممارسات إدارة المشاريع",
    descriptionEn: "Exploring modern technology's role in advancing PM practices",
    author: "م. شيرين عبدالسلام",
    date: "2025-02-15",
  },
  {
    id: "3",
    title: "دليل الشهادات المهنية في إدارة المشاريع",
    titleEn: "Guide to Professional PM Certifications",
    description: "مقارنة شاملة بين شهادات PMP, PMI-ACP, PRINCE2 وغيرها",
    descriptionEn: "Comprehensive comparison of PMP, PMI-ACP, PRINCE2 and more",
    author: "م. أبوبكر مزمل",
    date: "2025-03-10",
  },
  {
    id: "4",
    title: "إدارة المخاطر في البيئة السودانية",
    titleEn: "Risk Management in Sudanese Context",
    description: "تحليل المخاطر الخاصة بالمشاريع في السودان وكيفية التعامل معها",
    descriptionEn: "Analysis of risks specific to projects in Sudan and how to handle them",
    author: "د. لينا العيناب",
    date: "2025-04-05",
  },
];

interface Props {
  lang: string;
}

export function ArticleList({ lang }: Props) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const isAr = lang === "ar";

  return (
    <motion.div
      className="grid grid-cols-1 lg:grid-cols-2 gap-6 py-4"
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      {ARTICLES.map((article, idx) => (
        <motion.div
          key={article.id}
          variants={fadeInUp}
          className="relative group cursor-pointer"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-muted block rounded-xl"
                layoutId="articleHover"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 0.15 } }}
                exit={{ opacity: 0, transition: { duration: 0.15, delay: 0.2 } }}
              />
            )}
          </AnimatePresence>
          <div className="relative z-10 p-4 flex gap-5">
            <div className="w-1/3 aspect-[4/3] rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex-shrink-0" />
            <div className="flex-1 flex flex-col justify-between py-1">
              <div className="space-y-2">
                <h4 className="font-bold text-foreground line-clamp-2">
                  {isAr ? article.title : article.titleEn}
                </h4>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {isAr ? article.description : article.descriptionEn}
                </p>
              </div>
              <p className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
                <span>{article.author}</span>
                <span className="text-lg font-bold">·</span>
                <span>{article.date}</span>
              </p>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
