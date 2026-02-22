"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  Download,
  Calendar,
  BookOpen,
  FlaskConical,
  Newspaper,
  BookMarked,
} from "lucide-react";
import { staggerContainer, fadeInUp } from "@/lib/animations";

type Category = "all" | "reports" | "research" | "magazine" | "guides";

interface Publication {
  id: string;
  titleAr: string;
  titleEn: string;
  descAr: string;
  descEn: string;
  category: Exclude<Category, "all">;
  date: string;
  pages?: number;
}

const PUBLICATIONS: Publication[] = [
  {
    id: "1",
    titleAr: "التقرير السنوي 2024",
    titleEn: "Annual Report 2024",
    descAr: "ملخص شامل لأنشطة وإنجازات الجمعية خلال عام 2024",
    descEn: "Comprehensive summary of SPMA activities and achievements in 2024",
    category: "reports",
    date: "2025-01-15",
    pages: 42,
  },
  {
    id: "2",
    titleAr: "التقرير السنوي 2023",
    titleEn: "Annual Report 2023",
    descAr: "إنجازات الجمعية وأنشطتها خلال عام 2023",
    descEn: "SPMA achievements and activities during 2023",
    category: "reports",
    date: "2024-01-20",
    pages: 38,
  },
  {
    id: "3",
    titleAr: "واقع إدارة المشاريع في السودان",
    titleEn: "State of Project Management in Sudan",
    descAr: "دراسة بحثية شاملة عن ممارسات إدارة المشاريع في السودان",
    descEn: "Comprehensive research study on PM practices in Sudan",
    category: "research",
    date: "2024-06-10",
    pages: 56,
  },
  {
    id: "4",
    titleAr: "تأثير التحول الرقمي على إدارة المشاريع",
    titleEn: "Impact of Digital Transformation on PM",
    descAr: "بحث عن دور التحول الرقمي في تطوير ممارسات إدارة المشاريع",
    descEn: "Research on the role of digital transformation in developing PM practices",
    category: "research",
    date: "2024-09-05",
    pages: 34,
  },
  {
    id: "5",
    titleAr: "مجلة الجمعية - العدد الأول",
    titleEn: "SPMA Magazine - Issue 1",
    descAr: "العدد الافتتاحي لمجلة الجمعية السودانية لإدارة المشاريع",
    descEn: "Inaugural issue of the SPMA Magazine",
    category: "magazine",
    date: "2024-03-01",
    pages: 28,
  },
  {
    id: "6",
    titleAr: "مجلة الجمعية - العدد الثاني",
    titleEn: "SPMA Magazine - Issue 2",
    descAr: "مقالات وتقارير حول أحدث الاتجاهات في إدارة المشاريع",
    descEn: "Articles and reports on the latest trends in project management",
    category: "magazine",
    date: "2024-06-01",
    pages: 32,
  },
  {
    id: "7",
    titleAr: "دليل التطوع في الجمعية",
    titleEn: "SPMA Volunteering Guide",
    descAr: "دليل شامل للمتطوعين الجدد في الجمعية",
    descEn: "Comprehensive guide for new volunteers at SPMA",
    category: "guides",
    date: "2024-02-15",
    pages: 18,
  },
  {
    id: "8",
    titleAr: "دليل الاستعداد لاختبار PMP",
    titleEn: "PMP Exam Preparation Guide",
    descAr: "نصائح وإرشادات للاستعداد لاختبار PMP",
    descEn: "Tips and guidance for PMP exam preparation",
    category: "guides",
    date: "2024-04-20",
    pages: 24,
  },
];

const CATEGORIES: { id: Category; labelAr: string; labelEn: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: "all", labelAr: "الكل", labelEn: "All", icon: BookOpen },
  { id: "reports", labelAr: "التقارير السنوية", labelEn: "Annual Reports", icon: FileText },
  { id: "research", labelAr: "الأبحاث", labelEn: "Research", icon: FlaskConical },
  { id: "magazine", labelAr: "المجلة", labelEn: "Magazine", icon: Newspaper },
  { id: "guides", labelAr: "الأدلة والمراجع", labelEn: "Guides & References", icon: BookMarked },
];

interface Props {
  lang: string;
}

export function PublicationsContent({ lang }: Props) {
  const isAr = lang === "ar";
  const [activeCategory, setActiveCategory] = useState<Category>("all");

  const filtered =
    activeCategory === "all"
      ? PUBLICATIONS
      : PUBLICATIONS.filter((p) => p.category === activeCategory);

  return (
    <div className="space-y-8">
      {/* Title */}
      <motion.div
        className="text-center space-y-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold text-primary">
          {isAr ? "المنشورات" : "Publications"}
        </h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          {isAr
            ? "تقارير وأبحاث ومنشورات الجمعية السودانية لإدارة المشاريع"
            : "Reports, research, and publications by SPMA"}
        </p>
      </motion.div>

      {/* Category Tabs */}
      <div className="flex flex-wrap justify-center gap-2">
        {CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === cat.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              <Icon className="w-4 h-4" />
              {isAr ? cat.labelAr : cat.labelEn}
            </button>
          );
        })}
      </div>

      {/* Publications Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          exit={{ opacity: 0 }}
        >
          {filtered.map((pub) => {
            const catConfig = CATEGORIES.find((c) => c.id === pub.category);
            const CatIcon = catConfig?.icon || FileText;
            return (
              <motion.div
                key={pub.id}
                variants={fadeInUp}
                className="rounded-xl border border-border p-6 hover:border-primary/30 hover:shadow-md transition-all group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-colors">
                    <CatIcon className="w-6 h-6 text-primary group-hover:text-accent transition-colors" />
                  </div>
                  <div className="flex-1 min-w-0 space-y-2">
                    <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">
                      {isAr ? pub.titleAr : pub.titleEn}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {isAr ? pub.descAr : pub.descEn}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {pub.date}
                      </span>
                      {pub.pages && (
                        <span>
                          {pub.pages} {isAr ? "صفحة" : "pages"}
                        </span>
                      )}
                      <span className="px-2 py-0.5 bg-muted rounded-full">
                        {catConfig ? (isAr ? catConfig.labelAr : catConfig.labelEn) : ""}
                      </span>
                    </div>
                  </div>
                  <button className="flex-shrink-0 w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent hover:bg-accent hover:text-accent-foreground transition-colors">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </AnimatePresence>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          {isAr ? "لا توجد منشورات في هذه الفئة" : "No publications in this category"}
        </div>
      )}
    </div>
  );
}
