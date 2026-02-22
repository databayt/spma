"use client";

import { motion } from "framer-motion";
import { Award, Network, BookOpen, Star } from "lucide-react";
import { staggerContainer, fadeInUp } from "@/lib/animations";

const BENEFITS = [
  {
    icon: Award,
    titleAr: "عضوية مجانية",
    titleEn: "Free Membership",
    descAr: "احصل على عضوية مجانية في الجمعية كمتطوع نشط",
    descEn: "Get free membership as an active volunteer",
  },
  {
    icon: Network,
    titleAr: "شبكة مهنية",
    titleEn: "Professional Network",
    descAr: "بناء علاقات مهنية مع خبراء وممارسين في إدارة المشاريع",
    descEn: "Build professional relationships with PM experts and practitioners",
  },
  {
    icon: BookOpen,
    titleAr: "تدريب مجاني",
    titleEn: "Free Training",
    descAr: "الحصول على دورات تدريبية مجانية في مختلف المجالات",
    descEn: "Access free training courses in various fields",
  },
  {
    icon: Star,
    titleAr: "تقدير واعتراف",
    titleEn: "Recognition",
    descAr: "تقدير مساهماتك على منصات الجمعية وشهادات تطوع",
    descEn: "Your contributions recognized on SPMA platforms with certificates",
  },
];

interface Props {
  lang: string;
}

export function VolunteerBenefits({ lang }: Props) {
  const isAr = lang === "ar";

  return (
    <div className="bg-muted/50 rounded-3xl p-8 md:p-12">
      <motion.h2
        className="text-3xl md:text-4xl font-bold text-primary mb-8 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {isAr ? "مزايا التطوع" : "Volunteer Benefits"}
      </motion.h2>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {BENEFITS.map((benefit) => {
          const Icon = benefit.icon;
          return (
            <motion.div
              key={benefit.titleAr}
              variants={fadeInUp}
              className="text-center space-y-3 p-6 rounded-xl bg-background shadow-sm"
            >
              <div className="w-14 h-14 rounded-full bg-accent/20 flex items-center justify-center mx-auto">
                <Icon className="w-7 h-7 text-accent" />
              </div>
              <h3 className="font-semibold text-foreground">
                {isAr ? benefit.titleAr : benefit.titleEn}
              </h3>
              <p className="text-sm text-muted-foreground">
                {isAr ? benefit.descAr : benefit.descEn}
              </p>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
