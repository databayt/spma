"use client";

import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { CERTIFICATIONS, SECTORS } from "../config";
import type { ProfessionalInfoData, Certification } from "../types";

interface Props {
  lang: string;
  data: ProfessionalInfoData;
  onChange: (data: ProfessionalInfoData) => void;
  errors: Record<string, string>;
}

export function ProfessionalInfoStep({ lang, data, onChange, errors }: Props) {
  const isAr = lang === "ar";

  const update = (field: keyof ProfessionalInfoData, value: unknown) => {
    onChange({ ...data, [field]: value });
  };

  const toggleCertification = (certId: Certification) => {
    const current = data.certifications;
    const updated = current.includes(certId)
      ? current.filter((c) => c !== certId)
      : [...current, certId];
    update("certifications", updated);
  };

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, x: isAr ? -20 : 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="jobTitle">
            {isAr ? "المسمى الوظيفي" : "Job Title"} *
          </Label>
          <Input
            id="jobTitle"
            value={data.jobTitle}
            onChange={(e) => update("jobTitle", e.target.value)}
            placeholder={isAr ? "مدير مشروع" : "Project Manager"}
          />
          {errors.jobTitle && (
            <p className="text-xs text-destructive">{errors.jobTitle}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="organization">
            {isAr ? "جهة العمل" : "Organization"} *
          </Label>
          <Input
            id="organization"
            value={data.organization}
            onChange={(e) => update("organization", e.target.value)}
            placeholder={isAr ? "اسم المؤسسة" : "Organization name"}
          />
          {errors.organization && (
            <p className="text-xs text-destructive">{errors.organization}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="yearsOfExperience">
            {isAr ? "سنوات الخبرة" : "Years of Experience"} *
          </Label>
          <Input
            id="yearsOfExperience"
            type="number"
            min={0}
            max={50}
            value={data.yearsOfExperience}
            onChange={(e) => update("yearsOfExperience", parseInt(e.target.value) || 0)}
          />
          {errors.yearsOfExperience && (
            <p className="text-xs text-destructive">{errors.yearsOfExperience}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label>{isAr ? "القطاع" : "Sector"} *</Label>
          <div className="grid grid-cols-2 gap-2 pt-1">
            {SECTORS.map((sector) => (
              <label
                key={sector.id}
                className={`flex items-center gap-2 p-2 rounded-lg border cursor-pointer transition-colors text-sm ${
                  data.sector === sector.id
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/30"
                }`}
              >
                <input
                  type="radio"
                  name="sector"
                  value={sector.id}
                  checked={data.sector === sector.id}
                  onChange={() => update("sector", sector.id)}
                  className="sr-only"
                />
                {isAr ? sector.labelAr : sector.labelEn}
              </label>
            ))}
          </div>
          {errors.sector && (
            <p className="text-xs text-destructive">{errors.sector}</p>
          )}
        </div>
      </div>

      <div className="space-y-3">
        <Label>
          {isAr ? "الشهادات المهنية" : "Professional Certifications"}
        </Label>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {CERTIFICATIONS.map((cert) => (
            <label
              key={cert.id}
              className={`flex items-center gap-2 p-3 rounded-lg border cursor-pointer transition-colors ${
                data.certifications.includes(cert.id)
                  ? "border-accent bg-accent/10"
                  : "border-border hover:border-accent/30"
              }`}
            >
              <Checkbox
                checked={data.certifications.includes(cert.id)}
                onCheckedChange={() => toggleCertification(cert.id)}
              />
              <span className="text-sm font-medium">{cert.label}</span>
            </label>
          ))}
        </div>
      </div>

      {data.certifications.includes("other") && (
        <div className="space-y-2">
          <Label htmlFor="otherCertification">
            {isAr ? "شهادة أخرى" : "Other Certification"}
          </Label>
          <Input
            id="otherCertification"
            value={data.otherCertification || ""}
            onChange={(e) => update("otherCertification", e.target.value)}
            placeholder={isAr ? "اذكر الشهادة" : "Specify certification"}
          />
        </div>
      )}
    </motion.div>
  );
}
