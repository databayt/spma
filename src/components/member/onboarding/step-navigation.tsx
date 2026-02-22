"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface Props {
  onNext: () => void;
  onBack: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
  isSubmitting?: boolean;
  nextDisabled?: boolean;
  lang: string;
}

export function StepNavigation({
  onNext,
  onBack,
  isFirstStep,
  isLastStep,
  isSubmitting,
  nextDisabled,
  lang,
}: Props) {
  const isAr = lang === "ar";
  const BackIcon = isAr ? ArrowRight : ArrowLeft;
  const NextIcon = isAr ? ArrowLeft : ArrowRight;

  return (
    <div className="flex justify-between items-center pt-6 border-t border-border mt-8">
      {!isFirstStep ? (
        <Button variant="outline" onClick={onBack} disabled={isSubmitting}>
          <BackIcon className="w-4 h-4" />
          {isAr ? "السابق" : "Back"}
        </Button>
      ) : (
        <div />
      )}

      <Button
        onClick={onNext}
        disabled={nextDisabled || isSubmitting}
        className={isLastStep ? "bg-accent text-accent-foreground hover:opacity-90" : ""}
      >
        {isSubmitting
          ? isAr ? "جاري الإرسال..." : "Submitting..."
          : isLastStep
            ? isAr ? "إرسال الطلب" : "Submit Application"
            : isAr ? "التالي" : "Next"}
        {!isLastStep && !isSubmitting && <NextIcon className="w-4 h-4" />}
      </Button>
    </div>
  );
}
