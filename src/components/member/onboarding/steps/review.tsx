"use client";

import { motion } from "framer-motion";
import { User, Briefcase, CreditCard, Users } from "lucide-react";
import { TIER_DETAILS, COMMITTEES, SECTORS } from "../config";
import type { OnboardingFormData } from "../types";

interface Props {
  lang: string;
  data: OnboardingFormData;
}

export function ReviewStep({ lang, data }: Props) {
  const isAr = lang === "ar";
  const tier = TIER_DETAILS.find((t) => t.id === data.selectedTier);
  const selectedCommitteeNames = data.selectedCommittees.map((id) => {
    const c = COMMITTEES.find((com) => com.id === id);
    return c ? (isAr ? c.labelAr : c.labelEn) : id;
  });
  const sector = SECTORS.find((s) => s.id === data.professionalInfo.sector);

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <p className="text-sm text-muted-foreground text-center">
        {isAr
          ? "راجع معلوماتك قبل إرسال الطلب"
          : "Review your information before submitting"}
      </p>

      {/* Personal Info */}
      <div className="rounded-xl border border-border p-5 space-y-3">
        <div className="flex items-center gap-2 text-primary font-semibold">
          <User className="w-4 h-4" />
          {isAr ? "المعلومات الشخصية" : "Personal Information"}
        </div>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <span className="text-muted-foreground">{isAr ? "الاسم (عربي)" : "Name (Arabic)"}</span>
            <p className="font-medium">{data.personalInfo.fullNameAr}</p>
          </div>
          <div>
            <span className="text-muted-foreground">{isAr ? "الاسم (إنجليزي)" : "Name (English)"}</span>
            <p className="font-medium">{data.personalInfo.fullNameEn}</p>
          </div>
          <div>
            <span className="text-muted-foreground">{isAr ? "البريد" : "Email"}</span>
            <p className="font-medium" dir="ltr">{data.personalInfo.email}</p>
          </div>
          <div>
            <span className="text-muted-foreground">{isAr ? "الهاتف" : "Phone"}</span>
            <p className="font-medium" dir="ltr">{data.personalInfo.phone}</p>
          </div>
          <div>
            <span className="text-muted-foreground">{isAr ? "المدينة" : "City"}</span>
            <p className="font-medium">{data.personalInfo.city}</p>
          </div>
          <div>
            <span className="text-muted-foreground">{isAr ? "الجنس" : "Gender"}</span>
            <p className="font-medium">
              {data.personalInfo.gender === "male"
                ? isAr ? "ذكر" : "Male"
                : isAr ? "أنثى" : "Female"}
            </p>
          </div>
        </div>
      </div>

      {/* Professional Info */}
      <div className="rounded-xl border border-border p-5 space-y-3">
        <div className="flex items-center gap-2 text-primary font-semibold">
          <Briefcase className="w-4 h-4" />
          {isAr ? "المعلومات المهنية" : "Professional Information"}
        </div>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <span className="text-muted-foreground">{isAr ? "المسمى الوظيفي" : "Job Title"}</span>
            <p className="font-medium">{data.professionalInfo.jobTitle}</p>
          </div>
          <div>
            <span className="text-muted-foreground">{isAr ? "جهة العمل" : "Organization"}</span>
            <p className="font-medium">{data.professionalInfo.organization}</p>
          </div>
          <div>
            <span className="text-muted-foreground">{isAr ? "سنوات الخبرة" : "Years of Experience"}</span>
            <p className="font-medium">{data.professionalInfo.yearsOfExperience}</p>
          </div>
          <div>
            <span className="text-muted-foreground">{isAr ? "القطاع" : "Sector"}</span>
            <p className="font-medium">
              {sector ? (isAr ? sector.labelAr : sector.labelEn) : data.professionalInfo.sector}
            </p>
          </div>
          {data.professionalInfo.certifications.length > 0 && (
            <div className="col-span-2">
              <span className="text-muted-foreground">{isAr ? "الشهادات" : "Certifications"}</span>
              <p className="font-medium">{data.professionalInfo.certifications.join(", ")}</p>
            </div>
          )}
        </div>
      </div>

      {/* Membership Tier */}
      <div className="rounded-xl border border-border p-5 space-y-3">
        <div className="flex items-center gap-2 text-primary font-semibold">
          <CreditCard className="w-4 h-4" />
          {isAr ? "نوع العضوية" : "Membership Tier"}
        </div>
        {tier && (
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">{isAr ? tier.nameAr : tier.nameEn}</p>
              <p className="text-xs text-muted-foreground">{isAr ? tier.subtitleAr : tier.subtitleEn}</p>
            </div>
            <div className="text-lg font-bold text-accent">
              {isAr ? tier.priceAr : tier.priceEn}
            </div>
          </div>
        )}
      </div>

      {/* Committees */}
      {selectedCommitteeNames.length > 0 && (
        <div className="rounded-xl border border-border p-5 space-y-3">
          <div className="flex items-center gap-2 text-primary font-semibold">
            <Users className="w-4 h-4" />
            {isAr ? "اللجان المختارة" : "Selected Committees"}
          </div>
          <div className="flex flex-wrap gap-2">
            {selectedCommitteeNames.map((name) => (
              <span
                key={name}
                className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full font-medium"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}
