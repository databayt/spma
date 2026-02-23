"use client"

import { useEffect, useTransition } from "react"
import { useParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { User, Briefcase, Users } from "lucide-react"
import { toast } from "sonner"

import { COMMITTEES, SECTORS } from "../../config"
import { useWizardValidation } from "../../wizard-validation-context"
import { useMember } from "../../member-provider"
import { completeOnboarding } from "./actions"

interface ReviewContentProps {
  lang: string
}

export function ReviewContent({ lang }: ReviewContentProps) {
  const isAr = lang === "ar"
  const router = useRouter()
  const params = useParams()
  const memberId = params.id as string
  const { member } = useMember()
  const { enableNext, setCustomNavigation } = useWizardValidation()
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    enableNext()
  }, [enableNext])

  useEffect(() => {
    setCustomNavigation({
      onNext: () => {
        startTransition(async () => {
          try {
            await completeOnboarding(memberId)
            router.push(`/${lang}/members/join/success`)
          } catch {
            toast.error(
              isAr ? "حدث خطأ أثناء إرسال الطلب" : "Error submitting application"
            )
          }
        })
      },
      nextDisabled: isPending,
    })

    return () => setCustomNavigation(undefined)
  }, [isPending, memberId, lang, router, setCustomNavigation, isAr])

  if (!member) return null

  const selectedCommitteeNames = (member.committees || []).map((id) => {
    const c = COMMITTEES.find((com) => com.id === id)
    return c ? (isAr ? c.labelAr : c.labelEn) : id
  })

  const sector = SECTORS.find(
    (s) => s.id === member.sector?.toLowerCase()
  )

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mb-8 text-center">
        <h2 className="text-xl font-bold text-foreground md:text-2xl">
          {isAr ? "المراجعة" : "Review"}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {isAr
            ? "راجع معلوماتك قبل إرسال الطلب"
            : "Review your information before submitting"}
        </p>
      </div>

      {/* Personal Info */}
      <div className="space-y-3 rounded-xl border border-border p-5">
        <div className="flex items-center gap-2 font-semibold text-primary">
          <User className="h-4 w-4" />
          {isAr ? "المعلومات الشخصية" : "Personal Information"}
        </div>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <span className="text-muted-foreground">
              {isAr ? "الاسم (عربي)" : "Name (Arabic)"}
            </span>
            <p className="font-medium">{member.fullNameAr}</p>
          </div>
          <div>
            <span className="text-muted-foreground">
              {isAr ? "الاسم (إنجليزي)" : "Name (English)"}
            </span>
            <p className="font-medium">{member.fullNameEn}</p>
          </div>
          <div>
            <span className="text-muted-foreground">
              {isAr ? "البريد" : "Email"}
            </span>
            <p className="font-medium" dir="ltr">
              {member.email}
            </p>
          </div>
          <div>
            <span className="text-muted-foreground">
              {isAr ? "الهاتف" : "Phone"}
            </span>
            <p className="font-medium" dir="ltr">
              {member.phone}
            </p>
          </div>
          <div>
            <span className="text-muted-foreground">
              {isAr ? "المدينة" : "City"}
            </span>
            <p className="font-medium">{member.city}</p>
          </div>
          <div>
            <span className="text-muted-foreground">
              {isAr ? "الجنس" : "Gender"}
            </span>
            <p className="font-medium">
              {member.gender === "MALE"
                ? isAr
                  ? "ذكر"
                  : "Male"
                : isAr
                  ? "أنثى"
                  : "Female"}
            </p>
          </div>
        </div>
      </div>

      {/* Professional Info */}
      <div className="space-y-3 rounded-xl border border-border p-5">
        <div className="flex items-center gap-2 font-semibold text-primary">
          <Briefcase className="h-4 w-4" />
          {isAr ? "المعلومات المهنية" : "Professional Information"}
        </div>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <span className="text-muted-foreground">
              {isAr ? "المسمى الوظيفي" : "Job Title"}
            </span>
            <p className="font-medium">{member.jobTitle || "-"}</p>
          </div>
          <div>
            <span className="text-muted-foreground">
              {isAr ? "جهة العمل" : "Organization"}
            </span>
            <p className="font-medium">{member.organization || "-"}</p>
          </div>
          <div>
            <span className="text-muted-foreground">
              {isAr ? "سنوات الخبرة" : "Years of Experience"}
            </span>
            <p className="font-medium">{member.yearsExperience}</p>
          </div>
          <div>
            <span className="text-muted-foreground">
              {isAr ? "القطاع" : "Sector"}
            </span>
            <p className="font-medium">
              {sector
                ? isAr
                  ? sector.labelAr
                  : sector.labelEn
                : member.sector}
            </p>
          </div>
          {member.certifications.length > 0 && (
            <div className="col-span-2">
              <span className="text-muted-foreground">
                {isAr ? "الشهادات" : "Certifications"}
              </span>
              <p className="font-medium">
                {member.certifications.join(", ")}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Committees */}
      {selectedCommitteeNames.length > 0 && (
        <div className="space-y-3 rounded-xl border border-border p-5">
          <div className="flex items-center gap-2 font-semibold text-primary">
            <Users className="h-4 w-4" />
            {isAr ? "اللجان المختارة" : "Selected Committees"}
          </div>
          <div className="flex flex-wrap gap-2">
            {selectedCommitteeNames.map((name) => (
              <span
                key={name}
                className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  )
}
