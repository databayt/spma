"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { personalInfoSchema, professionalInfoSchema } from "./validation";
import { ONBOARDING_STEPS } from "./config";
import { ProgressIndicator } from "./progress-indicator";
import { StepNavigation } from "./step-navigation";
import { WelcomeStep } from "./steps/welcome";
import { PersonalInfoStep } from "./steps/personal-info";
import { ProfessionalInfoStep } from "./steps/professional-info";
import { TierSelectionStep } from "./steps/tier-selection";
import { CommitteeInterestStep } from "./steps/committee-interest";
import { ReviewStep } from "./steps/review";
import { SuccessStep } from "./steps/success";
import type {
  OnboardingFormData,
  PersonalInfoData,
  ProfessionalInfoData,
  MembershipTier,
  Committee,
} from "./types";

interface Props {
  lang: string;
}

const INITIAL_PERSONAL: PersonalInfoData = {
  fullNameAr: "",
  fullNameEn: "",
  email: "",
  phone: "",
  city: "",
  gender: "male",
};

const INITIAL_PROFESSIONAL: ProfessionalInfoData = {
  jobTitle: "",
  organization: "",
  yearsOfExperience: 0,
  sector: "private",
  certifications: [],
};

export function OnboardingWizard({ lang }: Props) {
  const isAr = lang === "ar";
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState<OnboardingFormData>({
    personalInfo: INITIAL_PERSONAL,
    professionalInfo: INITIAL_PROFESSIONAL,
    selectedTier: "professional",
    selectedCommittees: [],
  });

  const validateStep = useCallback((): boolean => {
    setErrors({});

    if (currentStep === 1) {
      const result = personalInfoSchema.safeParse(formData.personalInfo);
      if (!result.success) {
        const fieldErrors: Record<string, string> = {};
        for (const issue of result.error.issues) {
          const field = issue.path[0] as string;
          fieldErrors[field] = isAr ? "هذا الحقل مطلوب" : "This field is required";
        }
        setErrors(fieldErrors);
        return false;
      }
    }

    if (currentStep === 2) {
      const result = professionalInfoSchema.safeParse(formData.professionalInfo);
      if (!result.success) {
        const fieldErrors: Record<string, string> = {};
        for (const issue of result.error.issues) {
          const field = issue.path[0] as string;
          fieldErrors[field] = isAr ? "هذا الحقل مطلوب" : "This field is required";
        }
        setErrors(fieldErrors);
        return false;
      }
    }

    return true;
  }, [currentStep, formData, isAr]);

  const handleNext = useCallback(() => {
    if (!validateStep()) return;

    if (currentStep === ONBOARDING_STEPS.length - 1) {
      setIsSubmitting(true);
      // Simulate submission
      setTimeout(() => {
        setIsSubmitting(false);
        setIsComplete(true);
      }, 1500);
      return;
    }

    setCurrentStep((prev) => prev + 1);
  }, [currentStep, validateStep]);

  const handleBack = useCallback(() => {
    setErrors({});
    setCurrentStep((prev) => Math.max(0, prev - 1));
  }, []);

  if (isComplete) {
    return (
      <div className="max-w-2xl mx-auto">
        <SuccessStep lang={lang} />
      </div>
    );
  }

  const step = ONBOARDING_STEPS[currentStep];

  return (
    <div className="max-w-3xl mx-auto">
      <ProgressIndicator currentStep={currentStep} lang={lang} />

      <div className="bg-background rounded-2xl border border-border p-6 md:p-8">
        {/* Step Header */}
        <div className="text-center mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-foreground">
            {isAr ? step.titleAr : step.titleEn}
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            {isAr ? step.descriptionAr : step.descriptionEn}
          </p>
        </div>

        {/* Step Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={step.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {currentStep === 0 && <WelcomeStep lang={lang} />}

            {currentStep === 1 && (
              <PersonalInfoStep
                lang={lang}
                data={formData.personalInfo}
                onChange={(data) =>
                  setFormData((prev) => ({ ...prev, personalInfo: data }))
                }
                errors={errors}
              />
            )}

            {currentStep === 2 && (
              <ProfessionalInfoStep
                lang={lang}
                data={formData.professionalInfo}
                onChange={(data) =>
                  setFormData((prev) => ({ ...prev, professionalInfo: data }))
                }
                errors={errors}
              />
            )}

            {currentStep === 3 && (
              <TierSelectionStep
                lang={lang}
                selectedTier={formData.selectedTier}
                onChange={(tier: MembershipTier) =>
                  setFormData((prev) => ({ ...prev, selectedTier: tier }))
                }
              />
            )}

            {currentStep === 4 && (
              <CommitteeInterestStep
                lang={lang}
                selectedCommittees={formData.selectedCommittees}
                onChange={(committees: Committee[]) =>
                  setFormData((prev) => ({
                    ...prev,
                    selectedCommittees: committees,
                  }))
                }
              />
            )}

            {currentStep === 5 && <ReviewStep lang={lang} data={formData} />}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <StepNavigation
          onNext={handleNext}
          onBack={handleBack}
          isFirstStep={currentStep === 0}
          isLastStep={currentStep === ONBOARDING_STEPS.length - 1}
          isSubmitting={isSubmitting}
          lang={lang}
        />
      </div>
    </div>
  );
}
