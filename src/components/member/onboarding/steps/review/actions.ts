"use server"

import { db } from "@/lib/db"

export async function completeOnboarding(memberId: string) {
  await db.member.update({
    where: { id: memberId },
    data: {
      onboardingStatus: "COMPLETED",
      onboardingStep: "review",
      applicationStatus: "PENDING",
    },
  })
}
