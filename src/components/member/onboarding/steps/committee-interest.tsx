"use client";

import { motion } from "framer-motion";
import { Checkbox } from "@/components/ui/checkbox";
import {
  FlaskConical,
  Megaphone,
  Globe,
  Users,
  CalendarDays,
  GraduationCap,
} from "lucide-react";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import { COMMITTEES } from "../config";
import type { Committee } from "../types";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  FlaskConical,
  Megaphone,
  Globe,
  Users,
  CalendarDays,
  GraduationCap,
};

interface Props {
  lang: string;
  selectedCommittees: Committee[];
  onChange: (committees: Committee[]) => void;
}

export function CommitteeInterestStep({ lang, selectedCommittees, onChange }: Props) {
  const isAr = lang === "ar";

  const toggle = (id: Committee) => {
    const updated = selectedCommittees.includes(id)
      ? selectedCommittees.filter((c) => c !== id)
      : [...selectedCommittees, id];
    onChange(updated);
  };

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <p className="text-sm text-muted-foreground text-center">
        {isAr
          ? "اختر اللجان التي ترغب في الانضمام إليها (اختياري)"
          : "Select committees you'd like to join (optional)"}
      </p>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {COMMITTEES.map((committee) => {
          const isSelected = selectedCommittees.includes(committee.id);
          const Icon = ICON_MAP[committee.icon] || Users;

          return (
            <motion.label
              key={committee.id}
              variants={fadeInUp}
              className={`flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                isSelected
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/30"
              }`}
            >
              <Checkbox
                checked={isSelected}
                onCheckedChange={() => toggle(committee.id)}
                className="mt-1"
              />
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <Icon className="w-4 h-4 text-primary" />
                  <h3 className="font-semibold text-sm text-foreground">
                    {isAr ? committee.labelAr : committee.labelEn}
                  </h3>
                </div>
                <p className="text-xs text-muted-foreground">
                  {isAr ? committee.descAr : committee.descEn}
                </p>
              </div>
            </motion.label>
          );
        })}
      </motion.div>
    </motion.div>
  );
}
