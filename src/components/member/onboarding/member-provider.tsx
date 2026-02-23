"use client"

import React, { createContext, useCallback, useContext, useState } from "react"
import type { Member } from "@prisma/client"
import { getMember } from "./actions"

interface MemberContextType {
  member: Member | null
  isLoading: boolean
  error: string | null
  setMember: (member: Member | null) => void
  updateMemberData: (data: Partial<Member>) => void
  loadMember: (id: string) => Promise<void>
}

const MemberContext = createContext<MemberContextType | undefined>(undefined)

interface MemberProviderProps {
  children: React.ReactNode
  initialMember?: Member | null
}

export function MemberProvider({
  children,
  initialMember = null,
}: MemberProviderProps) {
  const [member, setMember] = useState<Member | null>(initialMember)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const loadMember = useCallback(async (id: string) => {
    setIsLoading(true)
    setError(null)
    try {
      const result = await getMember(id)
      if (result) {
        setMember(result)
      } else {
        setError("Member not found")
      }
    } catch {
      setError("Failed to load member")
    } finally {
      setIsLoading(false)
    }
  }, [])

  const updateMemberData = useCallback((data: Partial<Member>) => {
    setMember((prev) => (prev ? { ...prev, ...data } : null))
  }, [])

  return (
    <MemberContext.Provider
      value={{ member, isLoading, error, setMember, updateMemberData, loadMember }}
    >
      {children}
    </MemberContext.Provider>
  )
}

export function useMember() {
  const context = useContext(MemberContext)
  if (context === undefined) {
    throw new Error("useMember must be used within a MemberProvider")
  }
  return context
}
