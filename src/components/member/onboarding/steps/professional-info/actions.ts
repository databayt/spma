"use server"

import { db } from "@/lib/db"
import type { Sector } from "@prisma/client"

interface ProfessionalInfoInput {
  jobTitle: string
  organization: string
  yearsOfExperience: number
  sector: string
  certifications: string[]
}

export async function updateProfessionalInfo(
  memberId: string,
  data: ProfessionalInfoInput
) {
  await db.member.update({
    where: { id: memberId },
    data: {
      jobTitle: data.jobTitle,
      organization: data.organization,
      yearsExperience: data.yearsOfExperience,
      sector: data.sector.toUpperCase() as Sector,
      certifications: data.certifications,
      onboardingStep: "professional-info",
    },
  })
}
