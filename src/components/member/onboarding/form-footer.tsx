"use client"

import React, { useMemo } from "react"
import Image from "next/image"
import { useParams, usePathname, useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  useWizardValidation,
  type CustomNavigation,
} from "./wizard-validation-context"

export interface StepConfig {
  steps: string[]
  groups: Record<number, string[]>
  groupLabels?: string[]
}

export const MEMBER_ONBOARDING_CONFIG: StepConfig = {
  steps: [
    "welcome",
    "personal-info",
    "professional-info",
    "committee-interest",
    "review",
  ],
  groups: {
    1: ["welcome", "personal-info"],
    2: ["professional-info"],
    3: ["committee-interest", "review"],
  },
  groupLabels: ["Personal Details", "Professional Profile", "Committees & Review"],
}

interface FormFooterProps {
  config: StepConfig
  basePath: string
  lang: string
  finalDestination?: string
}

export function FormFooter({
  config,
  basePath,
  lang,
  finalDestination,
}: FormFooterProps) {
  const router = useRouter()
  const params = useParams()
  const pathname = usePathname()
  const isRTL = lang === "ar"
  const entityId = params.id as string

  let contextNextDisabled = false
  let customNavigation: CustomNavigation | undefined

  try {
    const validationContext = useWizardValidation()
    contextNextDisabled = validationContext.isNextDisabled
    customNavigation = validationContext.customNavigation
  } catch {
    // Context not available
  }

  const { currentStepIndex, currentStepSlug } = useMemo(() => {
    const pathSegments = pathname.split("/")
    const slug = pathSegments[pathSegments.length - 1]
    const index = config.steps.findIndex((step) => step === slug)
    return {
      currentStepIndex: index === -1 ? 0 : index,
      currentStepSlug: index === -1 ? config.steps[0] : slug,
    }
  }, [pathname, config.steps])

  const currentStepGroup = useMemo(() => {
    for (const [group, steps] of Object.entries(config.groups)) {
      if (steps.includes(currentStepSlug)) {
        return parseInt(group)
      }
    }
    return 1
  }, [currentStepSlug, config.groups])

  const isLastStep = currentStepIndex === config.steps.length - 1

  const handleBack = () => {
    if (customNavigation?.onBack) {
      customNavigation.onBack()
      return
    }
    if (currentStepIndex > 0) {
      const prevStep = config.steps[currentStepIndex - 1]
      router.push(`${basePath}/${entityId}/${prevStep}`)
    }
  }

  const handleNext = () => {
    if (customNavigation?.onNext) {
      customNavigation.onNext()
      return
    }
    if (isLastStep) {
      if (finalDestination) {
        router.push(finalDestination)
      }
      return
    }
    if (currentStepIndex < config.steps.length - 1) {
      const nextStep = config.steps[currentStepIndex + 1]
      router.push(`${basePath}/${entityId}/${nextStep}`)
    }
  }

  const getStepProgress = (stepNumber: number) => {
    if (currentStepGroup > stepNumber) return 100
    if (currentStepGroup === stepNumber) {
      const groupSteps = config.groups[stepNumber as keyof typeof config.groups]
      if (!groupSteps) return 0
      const currentStepInGroup = groupSteps.findIndex(
        (step) => step === currentStepSlug
      )
      return Math.max(10, ((currentStepInGroup + 1) / groupSteps.length) * 100)
    }
    return 0
  }

  const groupLabels =
    config.groupLabels ||
    Object.keys(config.groups).map((_, i) => `Step ${i + 1}`)

  const backLabel = isRTL ? "السابق" : "Back"
  const nextLabel = isLastStep
    ? isRTL
      ? "إرسال الطلب"
      : "Submit"
    : isRTL
      ? "التالي"
      : "Next"

  const canGoBack = currentStepIndex > 0
  const canGoNext = !contextNextDisabled && !customNavigation?.nextDisabled

  const groupCount = Object.keys(config.groups).length

  return (
    <footer className="bg-background fixed right-0 bottom-0 left-0 z-50 px-4 sm:px-6 md:px-12 lg:px-20">
      {/* Progress bars */}
      <div dir="ltr" className="mx-auto max-w-5xl">
        <div
          className="gap-1 sm:gap-2"
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${groupCount}, 1fr)`,
          }}
        >
          {groupLabels.slice(0, groupCount).map((_, index) => (
            <Progress
              key={index}
              value={getStepProgress(index + 1)}
              className="h-1 w-full"
            />
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="mx-auto flex max-w-5xl items-center justify-between py-3 sm:py-4 rtl:flex-row-reverse">
        {/* Left side - Logo */}
        <div className="flex items-center gap-1 rtl:flex-row-reverse">
          <div className="relative flex h-8 w-8 items-center justify-center">
            <div className="relative h-6 w-6">
              <Image
                src="/logo.png"
                alt="SPMA"
                fill
                sizes="24px"
                className="object-contain"
              />
            </div>
          </div>
        </div>

        {/* Right side - Back and Next buttons */}
        <div className="flex items-center gap-2 sm:gap-4 rtl:flex-row-reverse">
          <Button
            variant="ghost"
            onClick={handleBack}
            disabled={!canGoBack}
            size="sm"
          >
            {backLabel}
          </Button>
          <Button onClick={handleNext} disabled={!canGoNext} size="sm">
            {nextLabel}
          </Button>
        </div>
      </div>
    </footer>
  )
}
