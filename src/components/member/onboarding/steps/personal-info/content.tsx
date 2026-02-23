"use client"

import { useEffect, useTransition } from "react"
import { useParams, useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { motion } from "framer-motion"
import { toast } from "sonner"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { personalInfoSchema } from "../../validation"
import { useWizardValidation } from "../../wizard-validation-context"
import { useMember } from "../../member-provider"
import { updatePersonalInfo } from "./actions"

interface PersonalInfoContentProps {
  lang: string
}

type FormData = {
  fullNameAr: string
  fullNameEn: string
  email: string
  phone: string
  city: string
  gender: "male" | "female"
}

export function PersonalInfoContent({ lang }: PersonalInfoContentProps) {
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
    resolver: zodResolver(personalInfoSchema),
    mode: "onChange",
    defaultValues: {
      fullNameAr: member?.fullNameAr || "",
      fullNameEn: member?.fullNameEn || "",
      email: member?.email?.startsWith("draft-") ? "" : member?.email || "",
      phone: member?.phone || "",
      city: member?.city || "",
      gender: (member?.gender?.toLowerCase() as "male" | "female") || "male",
    },
  })

  const gender = watch("gender")

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
              await updatePersonalInfo(memberId, data)
              updateMemberData({
                fullNameAr: data.fullNameAr,
                fullNameEn: data.fullNameEn,
                email: data.email,
                phone: data.phone,
                city: data.city,
                gender: data.gender.toUpperCase() as "MALE" | "FEMALE",
              })
              router.push(`/${lang}/members/join/${memberId}/professional-info`)
            } catch {
              toast.error(
                isAr ? "حدث خطأ أثناء الحفظ" : "Error saving data"
              )
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

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, x: isAr ? -20 : 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mb-8 text-center">
        <h2 className="text-xl font-bold text-foreground md:text-2xl">
          {isAr ? "المعلومات الشخصية" : "Personal Information"}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {isAr ? "أدخل بياناتك الأساسية" : "Enter your basic information"}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="fullNameAr">
            {isAr ? "الاسم الكامل (عربي)" : "Full Name (Arabic)"} *
          </Label>
          <Input
            id="fullNameAr"
            {...register("fullNameAr")}
            placeholder={isAr ? "الاسم باللغة العربية" : "Name in Arabic"}
            dir="rtl"
          />
          {errors.fullNameAr && (
            <p className="text-xs text-destructive">
              {isAr ? "هذا الحقل مطلوب" : "This field is required"}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="fullNameEn">
            {isAr ? "الاسم الكامل (إنجليزي)" : "Full Name (English)"} *
          </Label>
          <Input
            id="fullNameEn"
            {...register("fullNameEn")}
            placeholder={isAr ? "الاسم باللغة الإنجليزية" : "Name in English"}
            dir="ltr"
          />
          {errors.fullNameEn && (
            <p className="text-xs text-destructive">
              {isAr ? "هذا الحقل مطلوب" : "This field is required"}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="email">
            {isAr ? "البريد الإلكتروني" : "Email"} *
          </Label>
          <Input
            id="email"
            type="email"
            {...register("email")}
            placeholder="email@example.com"
            dir="ltr"
          />
          {errors.email && (
            <p className="text-xs text-destructive">
              {isAr ? "بريد إلكتروني غير صالح" : "Invalid email"}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">
            {isAr ? "رقم الهاتف" : "Phone Number"} *
          </Label>
          <Input
            id="phone"
            type="tel"
            {...register("phone")}
            placeholder="+249"
            dir="ltr"
          />
          {errors.phone && (
            <p className="text-xs text-destructive">
              {isAr ? "هذا الحقل مطلوب" : "This field is required"}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="city">{isAr ? "المدينة" : "City"} *</Label>
          <Input
            id="city"
            {...register("city")}
            placeholder={isAr ? "الخرطوم" : "Khartoum"}
          />
          {errors.city && (
            <p className="text-xs text-destructive">
              {isAr ? "هذا الحقل مطلوب" : "This field is required"}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label>{isAr ? "الجنس" : "Gender"} *</Label>
          <div className="flex gap-4 pt-2">
            <label className="flex cursor-pointer items-center gap-2">
              <input
                type="radio"
                value="male"
                checked={gender === "male"}
                onChange={() => setValue("gender", "male", { shouldValidate: true })}
                className="accent-primary"
              />
              <span className="text-sm">{isAr ? "ذكر" : "Male"}</span>
            </label>
            <label className="flex cursor-pointer items-center gap-2">
              <input
                type="radio"
                value="female"
                checked={gender === "female"}
                onChange={() => setValue("gender", "female", { shouldValidate: true })}
                className="accent-primary"
              />
              <span className="text-sm">{isAr ? "أنثى" : "Female"}</span>
            </label>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
