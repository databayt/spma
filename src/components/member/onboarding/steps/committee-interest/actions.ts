"use server"

import { db } from "@/lib/db"

export async function updateCommitteeInterest(
  memberId: string,
  committees: string[]
) {
  await db.member.update({
    where: { id: memberId },
    data: {
      committees,
      onboardingStep: "committee-interest",
    },
  })
}
