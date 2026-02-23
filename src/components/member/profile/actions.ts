"use server"

import { db } from "@/lib/db"

export async function fetchMemberById(id: string) {
  return db.member.findUnique({ where: { id } })
}
