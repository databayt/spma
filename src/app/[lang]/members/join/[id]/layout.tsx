"use client"

import React, { useEffect } from "react"
import { useParams } from "next/navigation"

import { Skeleton } from "@/components/ui/skeleton"
import { MemberProvider, useMember } from "@/components/member/onboarding/member-provider"
import { WizardValidationProvider } from "@/components/member/onboarding/wizard-validation-context"
import { FormFooter, MEMBER_ONBOARDING_CONFIG } from "@/components/member/onboarding/form-footer"

interface LayoutProps {
  children: React.ReactNode
}

function LayoutContent({ children }: LayoutProps) {
  const params = useParams()
  const { loadMember, isLoading, error } = useMember()
  const memberId = params.id as string
  const lang = (params.lang as string) || "ar"

  useEffect(() => {
    if (memberId) {
      loadMember(memberId)
    }
  }, [memberId, loadMember])

  if (isLoading) {
    return (
      <div className="mx-auto w-full max-w-3xl px-4 pb-24 pt-10">
        <div className="space-y-6">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-full max-w-md" />
          <Skeleton className="h-10 w-full" />
        </div>
        <FormFooter
          config={MEMBER_ONBOARDING_CONFIG}
          basePath={`/${lang}/members/join`}
          lang={lang}
        />
      </div>
    )
  }

  if (error) {
    return (
      <div className="mx-auto w-full max-w-3xl px-4 pb-24 pt-10">
        <div className="text-center">
          <h2 className="text-xl font-bold">
            {lang === "ar" ? "خطأ في تحميل البيانات" : "Error Loading Data"}
          </h2>
          <p className="text-muted-foreground mt-2">{error}</p>
          <button
            onClick={() => memberId && loadMember(memberId)}
            className="bg-primary text-primary-foreground hover:bg-primary/90 mt-4 rounded-md px-4 py-2"
          >
            {lang === "ar" ? "إعادة المحاولة" : "Try Again"}
          </button>
        </div>
        <FormFooter
          config={MEMBER_ONBOARDING_CONFIG}
          basePath={`/${lang}/members/join`}
          lang={lang}
        />
      </div>
    )
  }

  return (
    <div className="mx-auto w-full max-w-3xl px-4 pb-24 pt-10">
      {children}
      <FormFooter
        config={MEMBER_ONBOARDING_CONFIG}
        basePath={`/${lang}/members/join`}
        lang={lang}
      />
    </div>
  )
}

export default function OnboardingLayout({ children }: LayoutProps) {
  return (
    <MemberProvider>
      <WizardValidationProvider>
        <LayoutContent>{children}</LayoutContent>
      </WizardValidationProvider>
    </MemberProvider>
  )
}
