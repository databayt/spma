"use server"

import { db } from "@/lib/db"

export async function fetchApplications(filter?: string) {
  const where = filter && filter !== "all"
    ? { applicationStatus: filter.toUpperCase() as "PENDING" | "APPROVED" | "REJECTED" }
    : {}

  return db.member.findMany({
    where: {
      onboardingStatus: "COMPLETED",
      ...where,
    },
    orderBy: { createdAt: "desc" },
  })
}

export async function approveApplication(memberId: string, notes?: string) {
  await db.member.update({
    where: { id: memberId },
    data: {
      applicationStatus: "APPROVED",
      reviewedAt: new Date(),
      reviewNotes: notes || null,
    },
  })
}

export async function rejectApplication(memberId: string, notes?: string) {
  await db.member.update({
    where: { id: memberId },
    data: {
      applicationStatus: "REJECTED",
      reviewedAt: new Date(),
      reviewNotes: notes || null,
    },
  })
}
