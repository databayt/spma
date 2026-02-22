"use client";

import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { PersonalInfoData } from "../types";

interface Props {
  lang: string;
  data: PersonalInfoData;
  onChange: (data: PersonalInfoData) => void;
  errors: Record<string, string>;
}

export function PersonalInfoStep({ lang, data, onChange, errors }: Props) {
  const isAr = lang === "ar";

  const update = (field: keyof PersonalInfoData, value: string) => {
    onChange({ ...data, [field]: value });
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
          <Label htmlFor="fullNameAr">
            {isAr ? "الاسم الكامل (عربي)" : "Full Name (Arabic)"} *
          </Label>
          <Input
            id="fullNameAr"
            value={data.fullNameAr}
            onChange={(e) => update("fullNameAr", e.target.value)}
            placeholder={isAr ? "الاسم باللغة العربية" : "Name in Arabic"}
            dir="rtl"
          />
          {errors.fullNameAr && (
            <p className="text-xs text-destructive">{errors.fullNameAr}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="fullNameEn">
            {isAr ? "الاسم الكامل (إنجليزي)" : "Full Name (English)"} *
          </Label>
          <Input
            id="fullNameEn"
            value={data.fullNameEn}
            onChange={(e) => update("fullNameEn", e.target.value)}
            placeholder={isAr ? "الاسم باللغة الإنجليزية" : "Name in English"}
            dir="ltr"
          />
          {errors.fullNameEn && (
            <p className="text-xs text-destructive">{errors.fullNameEn}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="email">
            {isAr ? "البريد الإلكتروني" : "Email"} *
          </Label>
          <Input
            id="email"
            type="email"
            value={data.email}
            onChange={(e) => update("email", e.target.value)}
            placeholder="email@example.com"
            dir="ltr"
          />
          {errors.email && (
            <p className="text-xs text-destructive">{errors.email}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">
            {isAr ? "رقم الهاتف" : "Phone Number"} *
          </Label>
          <Input
            id="phone"
            type="tel"
            value={data.phone}
            onChange={(e) => update("phone", e.target.value)}
            placeholder="+249"
            dir="ltr"
          />
          {errors.phone && (
            <p className="text-xs text-destructive">{errors.phone}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="city">
            {isAr ? "المدينة" : "City"} *
          </Label>
          <Input
            id="city"
            value={data.city}
            onChange={(e) => update("city", e.target.value)}
            placeholder={isAr ? "الخرطوم" : "Khartoum"}
          />
          {errors.city && (
            <p className="text-xs text-destructive">{errors.city}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label>{isAr ? "الجنس" : "Gender"} *</Label>
          <div className="flex gap-4 pt-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="gender"
                value="male"
                checked={data.gender === "male"}
                onChange={() => update("gender", "male")}
                className="accent-primary"
              />
              <span className="text-sm">{isAr ? "ذكر" : "Male"}</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="gender"
                value="female"
                checked={data.gender === "female"}
                onChange={() => update("gender", "female")}
                className="accent-primary"
              />
              <span className="text-sm">{isAr ? "أنثى" : "Female"}</span>
            </label>
          </div>
          {errors.gender && (
            <p className="text-xs text-destructive">{errors.gender}</p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
