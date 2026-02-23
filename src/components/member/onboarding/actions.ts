"use server"

import { db } from "@/lib/db"

export async function createMemberDraft() {
  const member = await db.member.create({
    data: {
      fullNameAr: "",
      fullNameEn: "",
      email: `draft-${Date.now()}@placeholder.temp`,
      phone: "",
      city: "",
      gender: "MALE",
      onboardingStatus: "NOT_STARTED",
      onboardingStep: "welcome",
      applicationStatus: "PENDING",
    },
  })
  return { id: member.id }
}

export async function getMember(id: string) {
  return db.member.findUnique({ where: { id } })
}
