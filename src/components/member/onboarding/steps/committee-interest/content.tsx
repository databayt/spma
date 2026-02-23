"use client"

import { useEffect, useState, useTransition } from "react"
import { useParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { toast } from "sonner"
import {
  FlaskConical,
  Megaphone,
  Globe,
  Users,
  CalendarDays,
  GraduationCap,
} from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { staggerContainer, fadeInUp } from "@/lib/animations"
import { COMMITTEES } from "../../config"
import type { Committee } from "../../types"
import { useWizardValidation } from "../../wizard-validation-context"
import { useMember } from "../../member-provider"
import { updateCommitteeInterest } from "./actions"

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  FlaskConical,
  Megaphone,
  Globe,
  Users,
  CalendarDays,
  GraduationCap,
}

interface CommitteeInterestContentProps {
  lang: string
}

export function CommitteeInterestContent({ lang }: CommitteeInterestContentProps) {
  const isAr = lang === "ar"
  const router = useRouter()
  const params = useParams()
  const memberId = params.id as string
  const { member, updateMemberData } = useMember()
  const { enableNext, setCustomNavigation } = useWizardValidation()
  const [isPending, startTransition] = useTransition()
  const [selected, setSelected] = useState<Committee[]>(
    (member?.committees as Committee[]) || []
  )

  // Committees are optional, so always enable next
  useEffect(() => {
    enableNext()
  }, [enableNext])

  const toggle = (id: Committee) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    )
  }

  useEffect(() => {
    setCustomNavigation({
      onNext: () => {
        startTransition(async () => {
          try {
            await updateCommitteeInterest(memberId, selected)
            updateMemberData({ committees: selected })
            router.push(`/${lang}/members/join/${memberId}/review`)
          } catch {
            toast.error(isAr ? "حدث خطأ أثناء الحفظ" : "Error saving data")
          }
        })
      },
      nextDisabled: isPending,
    })

    return () => setCustomNavigation(undefined)
  }, [
    selected,
    isPending,
    memberId,
    lang,
    router,
    setCustomNavigation,
    updateMemberData,
    isAr,
  ])

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mb-8 text-center">
        <h2 className="text-xl font-bold text-foreground md:text-2xl">
          {isAr ? "اللجان" : "Committees"}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {isAr
            ? "اختر اللجان التي ترغب في الانضمام إليها (اختياري)"
            : "Select committees you'd like to join (optional)"}
        </p>
      </div>

      <motion.div
        className="grid grid-cols-1 gap-4 sm:grid-cols-2"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {COMMITTEES.map((committee) => {
          const isSelected = selected.includes(committee.id)
          const Icon = ICON_MAP[committee.icon] || Users

          return (
            <motion.label
              key={committee.id}
              variants={fadeInUp}
              className={`flex cursor-pointer items-start gap-4 rounded-xl border-2 p-4 transition-all ${
                isSelected
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/30"
              }`}
            >
              <Checkbox
                checked={isSelected}
                onCheckedChange={() => toggle(committee.id)}
                className="mt-1"
              />
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <Icon className="h-4 w-4 text-primary" />
                  <h3 className="text-sm font-semibold text-foreground">
                    {isAr ? committee.labelAr : committee.labelEn}
                  </h3>
                </div>
                <p className="text-xs text-muted-foreground">
                  {isAr ? committee.descAr : committee.descEn}
                </p>
              </div>
            </motion.label>
          )
        })}
      </motion.div>
    </motion.div>
  )
}
