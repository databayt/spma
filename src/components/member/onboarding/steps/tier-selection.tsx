"use client";

import { motion } from "framer-motion";
import { Check, Star } from "lucide-react";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import { TIER_DETAILS } from "../config";
import type { MembershipTier } from "../types";

interface Props {
  lang: string;
  selectedTier: MembershipTier;
  onChange: (tier: MembershipTier) => void;
}

export function TierSelectionStep({ lang, selectedTier, onChange }: Props) {
  const isAr = lang === "ar";

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <p className="text-sm text-muted-foreground text-center">
        {isAr
          ? "اختر نوع العضوية المناسب لمؤهلاتك وخبرتك"
          : "Choose the membership tier that matches your qualifications"}
      </p>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {TIER_DETAILS.map((tier) => {
          const isSelected = selectedTier === tier.id;
          return (
            <motion.button
              key={tier.id}
              variants={fadeInUp}
              onClick={() => onChange(tier.id)}
              className={`relative text-start p-5 rounded-xl border-2 transition-all ${
                isSelected
                  ? "border-accent bg-accent/5 shadow-md"
                  : "border-border hover:border-primary/30"
              }`}
            >
              {tier.recommended && (
                <div className="absolute -top-2.5 start-4 bg-accent text-accent-foreground text-[10px] font-bold px-3 py-0.5 rounded-full flex items-center gap-1">
                  <Star className="w-2.5 h-2.5" fill="currentColor" />
                  {isAr ? "موصى به" : "Recommended"}
                </div>
              )}

              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-foreground">
                      {isAr ? tier.nameAr : tier.nameEn}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {isAr ? tier.subtitleAr : tier.subtitleEn}
                    </p>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-1 ${
                      isSelected
                        ? "border-accent bg-accent"
                        : "border-muted-foreground/30"
                    }`}
                  >
                    {isSelected && <Check className="w-3 h-3 text-accent-foreground" />}
                  </div>
                </div>

                <div className="text-xl font-bold text-primary">
                  {isAr ? tier.priceAr : tier.priceEn}
                </div>

                <ul className="space-y-1.5">
                  {(isAr ? tier.benefitsAr : tier.benefitsEn).map((benefit, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                      <Check className="w-3 h-3 text-accent mt-0.5 flex-shrink-0" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.button>
          );
        })}
      </motion.div>
    </motion.div>
  );
}
