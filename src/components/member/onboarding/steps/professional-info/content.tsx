"use client"

import { useEffect, useTransition } from "react"
import { useParams, useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { motion } from "framer-motion"
import { toast } from "sonner"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { CERTIFICATIONS, SECTORS } from "../../config"
import { professionalInfoSchema } from "../../validation"
import { useWizardValidation } from "../../wizard-validation-context"
import { useMember } from "../../member-provider"
import { updateProfessionalInfo } from "./actions"
import type { Certification } from "../../types"

interface ProfessionalInfoContentProps {
  lang: string
}

type FormData = {
  jobTitle: string
  organization: string
  yearsOfExperience: number
  sector: string
  certifications: string[]
  otherCertification?: string
}

export function ProfessionalInfoContent({ lang }: ProfessionalInfoContentProps) {
  const isAr = lang === "ar"
  const router = useRouter()
  const params = useParams()
  const memberId = params.id as string
  const { member, updateMemberData } = useMember()
  const { enableNext, disableNext, setCustomNavigation } = useWizardValidation()
  const [isPending, startTransition] = useTransition()

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(professionalInfoSchema),
    mode: "onChange",
    defaultValues: {
      jobTitle: member?.jobTitle || "",
      organization: member?.organization || "",
      yearsOfExperience: member?.yearsExperience || 0,
      sector: member?.sector?.toLowerCase() || "private",
      certifications: member?.certifications || [],
    },
  })

  const sector = watch("sector")
  const certifications = watch("certifications")

  useEffect(() => {
    if (isValid) {
      enableNext()
    } else {
      disableNext()
    }
  }, [isValid, enableNext, disableNext])

  useEffect(() => {
    setCustomNavigation({
      onNext: () => {
        handleSubmit((data) => {
          startTransition(async () => {
            try {
              await updateProfessionalInfo(memberId, data)
              updateMemberData({
                jobTitle: data.jobTitle,
                organization: data.organization,
                yearsExperience: data.yearsOfExperience,
                sector: data.sector.toUpperCase() as "GOVERNMENT" | "PRIVATE" | "NGO" | "ACADEMIC" | "FREELANCE",
                certifications: data.certifications,
              })
              router.push(`/${lang}/members/join/${memberId}/committee-interest`)
            } catch {
              toast.error(isAr ? "حدث خطأ أثناء الحفظ" : "Error saving data")
            }
          })
        })()
      },
      nextDisabled: !isValid || isPending,
    })

    return () => setCustomNavigation(undefined)
  }, [
    isValid,
    isPending,
    memberId,
    lang,
    handleSubmit,
    router,
    setCustomNavigation,
    updateMemberData,
    isAr,
  ])

  const toggleCertification = (certId: Certification) => {
    const current = certifications || []
    const updated = current.includes(certId)
      ? current.filter((c) => c !== certId)
      : [...current, certId]
    setValue("certifications", updated, { shouldValidate: true })
  }

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, x: isAr ? -20 : 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mb-8 text-center">
        <h2 className="text-xl font-bold text-foreground md:text-2xl">
          {isAr ? "المعلومات المهنية" : "Professional Information"}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {isAr ? "أخبرنا عن خبرتك المهنية" : "Tell us about your professional experience"}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="jobTitle">
            {isAr ? "المسمى الوظيفي" : "Job Title"} *
          </Label>
          <Input
            id="jobTitle"
            {...register("jobTitle")}
            placeholder={isAr ? "مدير مشروع" : "Project Manager"}
          />
          {errors.jobTitle && (
            <p className="text-xs text-destructive">
              {isAr ? "هذا الحقل مطلوب" : "This field is required"}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="organization">
            {isAr ? "جهة العمل" : "Organization"} *
          </Label>
          <Input
            id="organization"
            {...register("organization")}
            placeholder={isAr ? "اسم المؤسسة" : "Organization name"}
          />
          {errors.organization && (
            <p className="text-xs text-destructive">
              {isAr ? "هذا الحقل مطلوب" : "This field is required"}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="yearsOfExperience">
            {isAr ? "سنوات الخبرة" : "Years of Experience"} *
          </Label>
          <Input
            id="yearsOfExperience"
            type="number"
            min={0}
            max={50}
            {...register("yearsOfExperience", { valueAsNumber: true })}
          />
          {errors.yearsOfExperience && (
            <p className="text-xs text-destructive">
              {isAr ? "هذا الحقل مطلوب" : "This field is required"}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label>{isAr ? "القطاع" : "Sector"} *</Label>
          <div className="grid grid-cols-2 gap-2 pt-1">
            {SECTORS.map((s) => (
              <label
                key={s.id}
                className={`flex cursor-pointer items-center gap-2 rounded-lg border p-2 text-sm transition-colors ${
                  sector === s.id
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/30"
                }`}
              >
                <input
                  type="radio"
                  value={s.id}
                  checked={sector === s.id}
                  onChange={() => setValue("sector", s.id, { shouldValidate: true })}
                  className="sr-only"
                />
                {isAr ? s.labelAr : s.labelEn}
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <Label>
          {isAr ? "الشهادات المهنية" : "Professional Certifications"}
        </Label>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
          {CERTIFICATIONS.map((cert) => (
            <label
              key={cert.id}
              className={`flex cursor-pointer items-center gap-2 rounded-lg border p-3 transition-colors ${
                certifications?.includes(cert.id)
                  ? "border-accent bg-accent/10"
                  : "border-border hover:border-accent/30"
              }`}
            >
              <Checkbox
                checked={certifications?.includes(cert.id)}
                onCheckedChange={() => toggleCertification(cert.id)}
              />
              <span className="text-sm font-medium">{cert.label}</span>
            </label>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
