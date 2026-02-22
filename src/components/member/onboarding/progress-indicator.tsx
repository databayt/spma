"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { ONBOARDING_STEPS } from "./config";

interface Props {
  currentStep: number;
  lang: string;
}

export function ProgressIndicator({ currentStep, lang }: Props) {
  const isAr = lang === "ar";
  const steps = ONBOARDING_STEPS;

  return (
    <div className="flex items-center justify-center gap-2 py-6">
      {steps.map((step, index) => {
        const isCompleted = index < currentStep;
        const isCurrent = index === currentStep;

        return (
          <div key={step.id} className="flex items-center gap-2">
            <motion.div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                isCompleted
                  ? "bg-accent text-accent-foreground"
                  : isCurrent
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
              }`}
              initial={{ scale: 0.8 }}
              animate={{ scale: isCurrent ? 1.1 : 1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {isCompleted ? <Check className="w-4 h-4" /> : index + 1}
            </motion.div>
            {index < steps.length - 1 && (
              <div
                className={`hidden sm:block w-8 h-0.5 transition-colors ${
                  isCompleted ? "bg-accent" : "bg-muted"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
