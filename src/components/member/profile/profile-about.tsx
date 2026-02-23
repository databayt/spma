"use client"

import {
  Building2,
  Clock,
  Landmark,
  Linkedin,
  Twitter,
  Mail,
  Phone,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { COMMITTEES, SECTORS } from "../onboarding/config"
import type { Member } from "@prisma/client"

interface ProfileAboutProps {
  member: Member
  lang: string
}

export function ProfileAbout({ member, lang }: ProfileAboutProps) {
  const isAr = lang === "ar"

  const sector = SECTORS.find(
    (s) => s.id === member.sector?.toLowerCase()
  )

  const committeeNames = (member.committees || []).map((id) => {
    const c = COMMITTEES.find((com) => com.id === id)
    return c ? (isAr ? c.labelAr : c.labelEn) : id
  })

  return (
    <div className="space-y-6">
      {/* Professional Details */}
      <div className="space-y-4 rounded-xl border border-border p-5">
        <h3 className="font-semibold text-foreground">
          {isAr ? "المعلومات المهنية" : "Professional Info"}
        </h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {member.organization && (
            <div className="flex items-start gap-2">
              <Building2 className="mt-0.5 h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">
                  {isAr ? "جهة العمل" : "Organization"}
                </p>
                <p className="text-sm font-medium">{member.organization}</p>
              </div>
            </div>
          )}
          <div className="flex items-start gap-2">
            <Clock className="mt-0.5 h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">
                {isAr ? "سنوات الخبرة" : "Experience"}
              </p>
              <p className="text-sm font-medium">
                {member.yearsExperience}{" "}
                {isAr ? "سنوات" : "years"}
              </p>
            </div>
          </div>
          {sector && (
            <div className="flex items-start gap-2">
              <Landmark className="mt-0.5 h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">
                  {isAr ? "القطاع" : "Sector"}
                </p>
                <p className="text-sm font-medium">
                  {isAr ? sector.labelAr : sector.labelEn}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Committees */}
      {committeeNames.length > 0 && (
        <div className="space-y-3 rounded-xl border border-border p-5">
          <h3 className="font-semibold text-foreground">
            {isAr ? "اللجان" : "Committees"}
          </h3>
          <div className="flex flex-wrap gap-2">
            {committeeNames.map((name) => (
              <Badge key={name} variant="secondary">
                {name}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Contact / Social */}
      <div className="space-y-3 rounded-xl border border-border p-5">
        <h3 className="font-semibold text-foreground">
          {isAr ? "التواصل" : "Contact"}
        </h3>
        <div className="space-y-2">
          <a
            href={`mailto:${member.email}`}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <Mail className="h-4 w-4" />
            {member.email}
          </a>
          <a
            href={`tel:${member.phone}`}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <Phone className="h-4 w-4" />
            {member.phone}
          </a>
          {member.linkedin && (
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
            >
              <Linkedin className="h-4 w-4" />
              LinkedIn
            </a>
          )}
          {member.twitter && (
            <a
              href={member.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
            >
              <Twitter className="h-4 w-4" />
              Twitter
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
