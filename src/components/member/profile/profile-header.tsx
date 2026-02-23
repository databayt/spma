"use client"

import { MapPin, Briefcase } from "lucide-react"
import type { Member } from "@prisma/client"

interface ProfileHeaderProps {
  member: Member
  lang: string
}

export function ProfileHeader({ member, lang }: ProfileHeaderProps) {
  const isAr = lang === "ar"
  const name = isAr ? member.fullNameAr : member.fullNameEn
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()

  return (
    <div>
      {/* Banner */}
      <div className="h-32 rounded-t-xl bg-gradient-to-r from-primary/80 to-accent/60 sm:h-48" />

      {/* Avatar + Info */}
      <div className="relative px-4 pb-4 sm:px-6">
        <div className="-mt-12 flex flex-col gap-4 sm:-mt-16 sm:flex-row sm:items-end sm:gap-6">
          {/* Avatar */}
          <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-background bg-primary/10 text-2xl font-bold text-primary sm:h-32 sm:w-32 sm:text-3xl">
            {member.image ? (
              <img
                src={member.image}
                alt={name}
                className="h-full w-full rounded-full object-cover"
              />
            ) : (
              initials
            )}
          </div>

          {/* Name + Title */}
          <div className="flex-1 space-y-1 pb-2">
            <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
              {name}
            </h1>
            {member.jobTitle && (
              <p className="flex items-center gap-1.5 text-muted-foreground">
                <Briefcase className="h-4 w-4" />
                {member.jobTitle}
                {member.organization && ` @ ${member.organization}`}
              </p>
            )}
            {member.city && (
              <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <MapPin className="h-3.5 w-3.5" />
                {member.city}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
