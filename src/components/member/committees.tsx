"use client";

import { motion } from "framer-motion";
import {
  FlaskConical,
  Megaphone,
  Globe,
  Users,
  CalendarDays,
  GraduationCap,
} from "lucide-react";
import { staggerContainer, fadeInUp } from "@/lib/animations";

const COMMITTEES = [
  {
    icon: FlaskConical,
    labelAr: "البحث العلمي",
    labelEn: "Scientific Research",
    descAr: "إجراء البحوث والدراسات في مجال إدارة المشاريع",
    descEn: "Conducting research and studies in project management",
  },
  {
    icon: Megaphone,
    labelAr: "الإعلام",
    labelEn: "Media",
    descAr: "إدارة المحتوى الإعلامي والتواصل مع الجمهور",
    descEn: "Managing media content and public communication",
  },
  {
    icon: Globe,
    labelAr: "العلاقات الخارجية",
    labelEn: "External Relations",
    descAr: "بناء شراكات مع المنظمات المحلية والدولية",
    descEn: "Building partnerships with local and international organizations",
  },
  {
    icon: Users,
    labelAr: "العضوية والمتطوعين",
    labelEn: "Membership & Volunteers",
    descAr: "إدارة شؤون الأعضاء وتنسيق العمل التطوعي",
    descEn: "Managing member affairs and coordinating volunteer work",
  },
  {
    icon: CalendarDays,
    labelAr: "التخطيط والبرامج",
    labelEn: "Planning & Programs",
    descAr: "تخطيط وتنفيذ البرامج والفعاليات",
    descEn: "Planning and executing programs and events",
  },
  {
    icon: GraduationCap,
    labelAr: "التطوير المهني",
    labelEn: "Professional Development",
    descAr: "تصميم برامج التدريب والتأهيل المهني",
    descEn: "Designing training and professional qualification programs",
  },
];

interface Props {
  lang: string;
}

export function Committees({ lang }: Props) {
  const isAr = lang === "ar";

  return (
    <div>
      <motion.h2
        className="text-3xl md:text-4xl font-bold text-primary mb-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {isAr ? "اللجان المتخصصة" : "Specialized Committees"}
      </motion.h2>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {COMMITTEES.map((committee) => {
          const Icon = committee.icon;
          return (
            <motion.div
              key={committee.labelAr}
              variants={fadeInUp}
              className="p-6 rounded-xl border border-border hover:border-primary/30 hover:shadow-md transition-all cursor-pointer group"
            >
              <Icon className="w-8 h-8 text-primary mb-4 group-hover:text-accent transition-colors" />
              <h3 className="font-semibold text-foreground mb-2">
                {isAr ? committee.labelAr : committee.labelEn}
              </h3>
              <p className="text-sm text-muted-foreground">
                {isAr ? committee.descAr : committee.descEn}
              </p>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
