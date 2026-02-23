"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"
import type { Member } from "@prisma/client"

export function getAdminColumns(
  lang: string,
  onView: (member: Member) => void
): ColumnDef<Member>[] {
  const isAr = lang === "ar"

  return [
    {
      accessorKey: isAr ? "fullNameAr" : "fullNameEn",
      header: isAr ? "الاسم" : "Name",
      cell: ({ row }) => {
        const name = isAr ? row.original.fullNameAr : row.original.fullNameEn
        return <span className="font-medium">{name}</span>
      },
    },
    {
      accessorKey: "email",
      header: isAr ? "البريد" : "Email",
      cell: ({ getValue }) => (
        <span dir="ltr" className="text-sm">
          {getValue() as string}
        </span>
      ),
    },
    {
      accessorKey: "createdAt",
      header: isAr ? "التاريخ" : "Date",
      cell: ({ getValue }) => {
        const date = new Date(getValue() as string)
        return (
          <span className="text-sm text-muted-foreground">
            {date.toLocaleDateString(isAr ? "ar-SA" : "en-US")}
          </span>
        )
      },
    },
    {
      accessorKey: "applicationStatus",
      header: isAr ? "الحالة" : "Status",
      cell: ({ getValue }) => {
        const status = getValue() as string
        const variant =
          status === "APPROVED"
            ? "default"
            : status === "REJECTED"
              ? "destructive"
              : "secondary"
        const label =
          status === "APPROVED"
            ? isAr ? "مقبول" : "Approved"
            : status === "REJECTED"
              ? isAr ? "مرفوض" : "Rejected"
              : isAr ? "قيد المراجعة" : "Pending"
        return <Badge variant={variant}>{label}</Badge>
      },
      filterFn: (row, _, filterValue) => {
        if (!filterValue || filterValue === "all") return true
        return row.original.applicationStatus === filterValue.toUpperCase()
      },
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <Button
          variant="ghost"
          size="sm"
          className="h-7 text-xs"
          onClick={() => onView(row.original)}
        >
          <Eye className="mr-1 h-3.5 w-3.5" />
          {isAr ? "تفاصيل" : "Details"}
        </Button>
      ),
    },
  ]
}
