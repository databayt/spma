"use client";

import { motion } from "framer-motion";
import { Award, Users, BookOpen, Star, Rocket } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/animations";

interface Props {
  lang: string;
}

const BENEFITS = [
  {
    icon: Users,
    titleAr: "شبكة مهنية",
    titleEn: "Professional Network",
    descAr: "تواصل مع خبراء وممارسين في إدارة المشاريع",
    descEn: "Connect with PM experts and practitioners",
  },
  {
    icon: BookOpen,
    titleAr: "تدريب وتطوير",
    titleEn: "Training & Development",
    descAr: "دورات تدريبية وورش عمل احترافية",
    descEn: "Professional courses and workshops",
  },
  {
    icon: Award,
    titleAr: "شهادات معتمدة",
    titleEn: "Recognized Certifications",
    descAr: "خصومات على الشهادات العالمية",
    descEn: "Discounts on global certifications",
  },
  {
    icon: Star,
    titleAr: "فعاليات حصرية",
    titleEn: "Exclusive Events",
    descAr: "PM Café وبودكاست تجربتي والمزيد",
    descEn: "PM Café, Tajribati Podcast, and more",
  },
];

export function WelcomeStep({ lang }: Props) {
  const isAr = lang === "ar";

  return (
    <div className="space-y-8">
      <motion.div
        className="text-center space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center mx-auto">
          <Rocket className="w-10 h-10 text-accent" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground">
          {isAr
            ? "مرحباً بك في الجمعية السودانية لإدارة المشاريع"
            : "Welcome to SPMA"}
        </h2>
        <p className="text-muted-foreground max-w-lg mx-auto">
          {isAr
            ? "انضم إلى مجتمع مهني يضم أكثر من 500 عضو وخبير في مجال إدارة المشاريع"
            : "Join a professional community of 500+ members and experts in project management"}
        </p>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {BENEFITS.map((benefit) => {
          const Icon = benefit.icon;
          return (
            <motion.div
              key={benefit.titleEn}
              variants={fadeInUp}
              className="p-5 rounded-xl border border-border bg-background space-y-2"
            >
              <Icon className="w-6 h-6 text-accent" />
              <h3 className="font-semibold text-foreground text-sm">
                {isAr ? benefit.titleAr : benefit.titleEn}
              </h3>
              <p className="text-xs text-muted-foreground">
                {isAr ? benefit.descAr : benefit.descEn}
              </p>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
