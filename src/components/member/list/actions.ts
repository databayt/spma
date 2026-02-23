"use server"

import { db } from "@/lib/db"
import type { MemberListItem } from "./types"

export async function fetchAllMembers(): Promise<MemberListItem[]> {
  const members = await db.member.findMany({
    where: {
      onboardingStatus: "COMPLETED",
      applicationStatus: "APPROVED",
    },
    select: {
      id: true,
      fullNameAr: true,
      fullNameEn: true,
      email: true,
      phone: true,
      city: true,
      image: true,
      jobTitle: true,
      organization: true,
      certifications: true,
      committees: true,
    },
    orderBy: { createdAt: "desc" },
  })
  return members
}
