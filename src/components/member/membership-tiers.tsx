"use client";

import { motion } from "framer-motion";
import { Check, Star } from "lucide-react";
import { staggerContainer, fadeInUp, fadeIn } from "@/lib/animations";
import Link from "next/link";
import type { Dictionary } from "@/components/internationalization/dictionaries";

interface Tier {
  nameAr: string;
  nameEn: string;
  subtitleAr: string;
  subtitleEn: string;
  priceAr: string;
  priceEn: string;
  benefitsAr: string[];
  benefitsEn: string[];
  recommended?: boolean;
}

const TIERS: Tier[] = [
  {
    nameAr: "عضو منتسب",
    nameEn: "Student Member",
    subtitleAr: "للطلبة",
    subtitleEn: "For Students",
    priceAr: "مجاناً",
    priceEn: "Free",
    benefitsAr: [
      "حضور الفعاليات المجانية",
      "الوصول للمحتوى التعليمي",
      "الانضمام لمجموعات النقاش",
    ],
    benefitsEn: [
      "Attend free events",
      "Access educational content",
      "Join discussion groups",
    ],
  },
  {
    nameAr: "عضو مشارك",
    nameEn: "Associate Member",
    subtitleAr: "للخريجين الجدد",
    subtitleEn: "For New Graduates",
    priceAr: "15,000 جنيه/السنة",
    priceEn: "15,000 SDG/Year",
    benefitsAr: [
      "جميع مزايا العضو المنتسب",
      "خصم 20% على الدورات",
      "حضور PM Café",
      "شهادة عضوية",
    ],
    benefitsEn: [
      "All Student benefits",
      "20% discount on courses",
      "Attend PM Café",
      "Membership certificate",
    ],
  },
  {
    nameAr: "عضو محترف",
    nameEn: "Professional Member",
    subtitleAr: "7+ سنوات خبرة أو 5+ مع شهادات",
    subtitleEn: "7+ years experience or 5+ with certs",
    priceAr: "20,000 جنيه/السنة",
    priceEn: "20,000 SDG/Year",
    recommended: true,
    benefitsAr: [
      "جميع مزايا العضو المشارك",
      "خصم 30% على الدورات والشهادات",
      "فرص التدريب والتطوع",
      "عضوية في اللجان المتخصصة",
      "شبكة مهنية متقدمة",
    ],
    benefitsEn: [
      "All Associate benefits",
      "30% discount on courses & certs",
      "Training & volunteering opportunities",
      "Membership in specialized committees",
      "Advanced professional network",
    ],
  },
  {
    nameAr: "عضو مستشار",
    nameEn: "Consultant Member",
    subtitleAr: "10+ سنوات مع شهادات معتمدة",
    subtitleEn: "10+ years with recognized certs",
    priceAr: "75,000 جنيه/السنة",
    priceEn: "75,000 SDG/Year",
    benefitsAr: [
      "جميع مزايا العضو المحترف",
      "فرص التدريب كمحاضر",
      "الظهور في دليل المستشارين",
      "أولوية في الفعاليات والمؤتمرات",
      "عضوية المجلس الاستشاري",
    ],
    benefitsEn: [
      "All Professional benefits",
      "Opportunities to train as lecturer",
      "Listed in consultant directory",
      "Priority in events & conferences",
      "Advisory council membership",
    ],
  },
];

interface Props {
  lang: string;
  dictionary: Dictionary;
}

export function MembershipTiers({ lang, dictionary }: Props) {
  const isAr = lang === "ar";

  return (
    <div className="space-y-10">
      <motion.div
        className="text-center space-y-4"
        variants={fadeIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <h1 className="text-4xl md:text-5xl font-bold text-primary">
          {dictionary.membership.title}
        </h1>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {TIERS.map((tier) => (
          <motion.div
            key={tier.nameAr}
            variants={fadeInUp}
            className={`relative rounded-2xl border-2 p-6 flex flex-col ${
              tier.recommended
                ? "border-accent shadow-xl shadow-accent/10"
                : "border-border"
            }`}
          >
            {tier.recommended && (
              <div className="absolute -top-3 start-1/2 -translate-x-1/2 bg-accent text-accent-foreground text-xs font-bold px-4 py-1 rounded-full flex items-center gap-1">
                <Star className="w-3 h-3" fill="currentColor" />
                {isAr ? "الأكثر شعبية" : "Most Popular"}
              </div>
            )}

            <div className="space-y-4 mb-6">
              <h3 className="text-xl font-bold text-foreground">
                {isAr ? tier.nameAr : tier.nameEn}
              </h3>
              <p className="text-sm text-muted-foreground">
                {isAr ? tier.subtitleAr : tier.subtitleEn}
              </p>
              <div className="text-3xl font-bold text-primary">
                {isAr ? tier.priceAr : tier.priceEn}
              </div>
            </div>

            <ul className="space-y-3 flex-1">
              {(isAr ? tier.benefitsAr : tier.benefitsEn).map(
                (benefit, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">
                      {benefit}
                    </span>
                  </li>
                )
              )}
            </ul>

            <Link
              href={`/${lang}/members/join`}
              className={`w-full h-11 rounded-lg font-medium text-sm mt-6 transition-colors flex items-center justify-center ${
                tier.recommended
                  ? "bg-accent text-accent-foreground hover:opacity-90"
                  : "bg-primary text-primary-foreground hover:opacity-90"
              }`}
            >
              {isAr ? "انضم الآن" : "Join Now"}
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
