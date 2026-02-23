"use server"

import { db } from "@/lib/db"
import type { Gender } from "@prisma/client"

interface PersonalInfoInput {
  fullNameAr: string
  fullNameEn: string
  email: string
  phone: string
  city: string
  gender: string
}

export async function updatePersonalInfo(
  memberId: string,
  data: PersonalInfoInput
) {
  await db.member.update({
    where: { id: memberId },
    data: {
      fullNameAr: data.fullNameAr,
      fullNameEn: data.fullNameEn,
      email: data.email,
      phone: data.phone,
      city: data.city,
      gender: data.gender.toUpperCase() as Gender,
      onboardingStatus: "IN_PROGRESS",
      onboardingStep: "personal-info",
    },
  })
}
