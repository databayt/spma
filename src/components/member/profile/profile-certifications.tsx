"use client"

import { Award } from "lucide-react"
import type { Member } from "@prisma/client"

interface ProfileCertificationsProps {
  member: Member
  lang: string
}

export function ProfileCertifications({
  member,
  lang,
}: ProfileCertificationsProps) {
  const isAr = lang === "ar"

  if (!member.certifications?.length) {
    return (
      <div className="rounded-xl border border-border p-5 text-center text-sm text-muted-foreground">
        {isAr ? "لا توجد شهادات" : "No certifications"}
      </div>
    )
  }

  return (
    <div className="space-y-3 rounded-xl border border-border p-5">
      <h3 className="font-semibold text-foreground">
        {isAr ? "الشهادات المهنية" : "Professional Certifications"}
      </h3>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {member.certifications.map((cert) => (
          <div
            key={cert}
            className="flex items-center gap-3 rounded-lg border border-border p-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/20">
              <Award className="h-5 w-5 text-accent" />
            </div>
            <span className="text-sm font-medium">{cert}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
