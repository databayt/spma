"use client";

import { motion } from "framer-motion";
import { Target, Eye, Lightbulb } from "lucide-react";
import { staggerContainer, fadeInUp, fadeIn } from "@/lib/animations";
import type { Dictionary } from "@/components/internationalization/dictionaries";

interface Props {
  lang: string;
  dictionary: Dictionary;
}

export function Mission({ lang, dictionary }: Props) {
  return (
    <div className="bg-muted rounded-3xl p-8 md:p-12">
      <motion.div
        className="max-w-4xl mx-auto space-y-10"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {/* Vision */}
        <motion.div className="text-center space-y-4" variants={fadeIn}>
          <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mx-auto">
            <Eye className="w-8 h-8 text-accent" />
          </div>
          <h3 className="text-2xl font-bold text-primary">
            {dictionary.about.vision}
          </h3>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {dictionary.about.visionText}
          </p>
        </motion.div>

        {/* Mission */}
        <motion.div className="space-y-6" variants={fadeInUp}>
          <div className="flex items-center gap-3 justify-center">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Target className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-2xl font-bold text-primary">
              {dictionary.about.mission}
            </h3>
          </div>
          <ul className="space-y-3 max-w-2xl mx-auto">
            {dictionary.about.missionPoints.map(
              (point: string, index: number) => (
                <motion.li
                  key={index}
                  className="flex items-start gap-3"
                  variants={fadeInUp}
                >
                  <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0" />
                  <span className="text-muted-foreground">{point}</span>
                </motion.li>
              )
            )}
          </ul>
        </motion.div>

        {/* Goals */}
        <motion.div className="text-center space-y-6" variants={fadeInUp}>
          <div className="flex items-center gap-3 justify-center">
            <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
              <Lightbulb className="w-6 h-6 text-accent" />
            </div>
            <h3 className="text-2xl font-bold text-primary">
              {dictionary.about.goals}
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                titleAr: "نشر ثقافة إدارة المشاريع",
                titleEn: "Spread PM Culture",
                descAr: "تعزيز الوعي بأهمية إدارة المشاريع في كافة القطاعات",
                descEn: "Promote PM awareness across all sectors",
              },
              {
                titleAr: "بناء القدرات المهنية",
                titleEn: "Build Professional Capacity",
                descAr: "تأهيل الكوادر المهنية والحصول على الشهادات المعتمدة",
                descEn: "Qualify professionals with recognized certifications",
              },
              {
                titleAr: "التنمية المستدامة",
                titleEn: "Sustainable Development",
                descAr: "المساهمة في تحقيق أهداف التنمية من خلال المشاريع",
                descEn: "Contribute to development goals through projects",
              },
            ].map((goal, index) => (
              <motion.div
                key={index}
                className="bg-background rounded-xl p-6 shadow-sm"
                variants={fadeInUp}
              >
                <h4 className="font-semibold text-primary mb-2">
                  {lang === "ar" ? goal.titleAr : goal.titleEn}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {lang === "ar" ? goal.descAr : goal.descEn}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
