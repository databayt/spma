"use client"

import { useState, useTransition } from "react"
import { toast } from "sonner"
import { User, Briefcase, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { COMMITTEES, SECTORS } from "../onboarding/config"
import { approveApplication, rejectApplication } from "./actions"
import type { Member } from "@prisma/client"

interface ApplicationDetailProps {
  member: Member | null
  open: boolean
  onClose: () => void
  onUpdate: () => void
  lang: string
}

export function ApplicationDetail({
  member,
  open,
  onClose,
  onUpdate,
  lang,
}: ApplicationDetailProps) {
  const isAr = lang === "ar"
  const [notes, setNotes] = useState("")
  const [isPending, startTransition] = useTransition()

  if (!member) return null

  const handleApprove = () => {
    startTransition(async () => {
      try {
        await approveApplication(member.id, notes)
        toast.success(isAr ? "تمت الموافقة على الطلب" : "Application approved")
        onUpdate()
        onClose()
      } catch {
        toast.error(isAr ? "حدث خطأ" : "Error")
      }
    })
  }

  const handleReject = () => {
    startTransition(async () => {
      try {
        await rejectApplication(member.id, notes)
        toast.success(isAr ? "تم رفض الطلب" : "Application rejected")
        onUpdate()
        onClose()
      } catch {
        toast.error(isAr ? "حدث خطأ" : "Error")
      }
    })
  }

  const name = isAr ? member.fullNameAr : member.fullNameEn
  const sector = SECTORS.find((s) => s.id === member.sector?.toLowerCase())
  const committeeNames = (member.committees || []).map((id) => {
    const c = COMMITTEES.find((com) => com.id === id)
    return c ? (isAr ? c.labelAr : c.labelEn) : id
  })

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{name}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Personal */}
          <div className="space-y-2 rounded-lg border p-4">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <User className="h-4 w-4" />
              {isAr ? "المعلومات الشخصية" : "Personal Info"}
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-muted-foreground">{isAr ? "الاسم (ع)" : "Name (AR)"}</span>
                <p>{member.fullNameAr}</p>
              </div>
              <div>
                <span className="text-muted-foreground">{isAr ? "الاسم (EN)" : "Name (EN)"}</span>
                <p>{member.fullNameEn}</p>
              </div>
              <div>
                <span className="text-muted-foreground">{isAr ? "البريد" : "Email"}</span>
                <p dir="ltr">{member.email}</p>
              </div>
              <div>
                <span className="text-muted-foreground">{isAr ? "الهاتف" : "Phone"}</span>
                <p dir="ltr">{member.phone}</p>
              </div>
              <div>
                <span className="text-muted-foreground">{isAr ? "المدينة" : "City"}</span>
                <p>{member.city}</p>
              </div>
              <div>
                <span className="text-muted-foreground">{isAr ? "الجنس" : "Gender"}</span>
                <p>{member.gender === "MALE" ? (isAr ? "ذكر" : "Male") : (isAr ? "أنثى" : "Female")}</p>
              </div>
            </div>
          </div>

          {/* Professional */}
          <div className="space-y-2 rounded-lg border p-4">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <Briefcase className="h-4 w-4" />
              {isAr ? "المعلومات المهنية" : "Professional Info"}
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-muted-foreground">{isAr ? "المسمى" : "Title"}</span>
                <p>{member.jobTitle || "-"}</p>
              </div>
              <div>
                <span className="text-muted-foreground">{isAr ? "المؤسسة" : "Organization"}</span>
                <p>{member.organization || "-"}</p>
              </div>
              <div>
                <span className="text-muted-foreground">{isAr ? "الخبرة" : "Experience"}</span>
                <p>{member.yearsExperience} {isAr ? "سنوات" : "years"}</p>
              </div>
              <div>
                <span className="text-muted-foreground">{isAr ? "القطاع" : "Sector"}</span>
                <p>{sector ? (isAr ? sector.labelAr : sector.labelEn) : member.sector}</p>
              </div>
              {member.certifications.length > 0 && (
                <div className="col-span-2">
                  <span className="text-muted-foreground">{isAr ? "الشهادات" : "Certifications"}</span>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {member.certifications.map((c) => (
                      <Badge key={c} variant="secondary" className="text-xs">
                        {c}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Committees */}
          {committeeNames.length > 0 && (
            <div className="space-y-2 rounded-lg border p-4">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <Users className="h-4 w-4" />
                {isAr ? "اللجان" : "Committees"}
              </div>
              <div className="flex flex-wrap gap-1">
                {committeeNames.map((n) => (
                  <Badge key={n} variant="outline">
                    {n}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Admin Notes */}
          {member.applicationStatus === "PENDING" && (
            <div className="space-y-2">
              <label className="text-sm font-medium">
                {isAr ? "ملاحظات المراجعة" : "Review Notes"}
              </label>
              <Textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder={isAr ? "ملاحظات اختيارية..." : "Optional notes..."}
                rows={3}
              />
              <div className="flex gap-2">
                <Button
                  onClick={handleApprove}
                  disabled={isPending}
                  className="flex-1 bg-green-600 hover:bg-green-700"
                >
                  {isAr ? "قبول" : "Approve"}
                </Button>
                <Button
                  onClick={handleReject}
                  disabled={isPending}
                  variant="destructive"
                  className="flex-1"
                >
                  {isAr ? "رفض" : "Reject"}
                </Button>
              </div>
            </div>
          )}

          {member.applicationStatus !== "PENDING" && (
            <div className="rounded-lg bg-muted p-3 text-sm">
              <p>
                <strong>{isAr ? "الحالة:" : "Status:"}</strong>{" "}
                {member.applicationStatus === "APPROVED"
                  ? isAr ? "مقبول" : "Approved"
                  : isAr ? "مرفوض" : "Rejected"}
              </p>
              {member.reviewedAt && (
                <p className="text-muted-foreground">
                  {new Date(member.reviewedAt).toLocaleDateString(
                    isAr ? "ar-SA" : "en-US"
                  )}
                </p>
              )}
              {member.reviewNotes && <p className="mt-1">{member.reviewNotes}</p>}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
