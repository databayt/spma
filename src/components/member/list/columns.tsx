"use client"

import { ColumnDef } from "@tanstack/react-table"
import Link from "next/link"
import { Eye, Mail, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { COMMITTEES } from "../onboarding/config"
import type { MemberListItem } from "./types"

export function getColumns(lang: string): ColumnDef<MemberListItem>[] {
  const isAr = lang === "ar"

  return [
    {
      accessorKey: isAr ? "fullNameAr" : "fullNameEn",
      header: isAr ? "الاسم" : "Name",
      cell: ({ row }) => {
        const name = isAr ? row.original.fullNameAr : row.original.fullNameEn
        const initials = name
          .split(" ")
          .map((n) => n[0])
          .join("")
          .slice(0, 2)
          .toUpperCase()

        return (
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
              {row.original.image ? (
                <img
                  src={row.original.image}
                  alt={name}
                  className="h-9 w-9 rounded-full object-cover"
                />
              ) : (
                initials
              )}
            </div>
            <div>
              <p className="font-medium">{name}</p>
              {row.original.jobTitle && (
                <p className="text-xs text-muted-foreground">
                  {row.original.jobTitle}
                </p>
              )}
            </div>
          </div>
        )
      },
    },
    {
      accessorKey: "organization",
      header: isAr ? "جهة العمل" : "Organization",
      cell: ({ getValue }) => getValue() || "-",
    },
    {
      accessorKey: "certifications",
      header: isAr ? "الشهادات" : "Certifications",
      cell: ({ getValue }) => {
        const certs = getValue() as string[]
        if (!certs?.length) return "-"
        return (
          <div className="flex flex-wrap gap-1">
            {certs.slice(0, 3).map((cert) => (
              <Badge key={cert} variant="secondary" className="text-[10px]">
                {cert}
              </Badge>
            ))}
            {certs.length > 3 && (
              <Badge variant="outline" className="text-[10px]">
                +{certs.length - 3}
              </Badge>
            )}
          </div>
        )
      },
    },
    {
      accessorKey: "committees",
      header: isAr ? "اللجنة" : "Committee",
      cell: ({ getValue }) => {
        const committees = getValue() as string[]
        if (!committees?.length) return "-"
        return (
          <div className="flex flex-wrap gap-1">
            {committees.slice(0, 2).map((id) => {
              const c = COMMITTEES.find((com) => com.id === id)
              const label = c ? (isAr ? c.labelAr : c.labelEn) : id
              return (
                <Badge key={id} variant="outline" className="text-[10px]">
                  {label}
                </Badge>
              )
            })}
            {committees.length > 2 && (
              <Badge variant="outline" className="text-[10px]">
                +{committees.length - 2}
              </Badge>
            )}
          </div>
        )
      },
      filterFn: (row, _, filterValue) => {
        const committees = row.original.committees
        if (!filterValue) return true
        return committees.includes(filterValue)
      },
    },
    {
      accessorKey: "city",
      header: isAr ? "المدينة" : "City",
    },
    {
      id: "contact",
      header: isAr ? "التواصل" : "Contact",
      cell: ({ row }) => (
        <div className="flex items-center gap-1">
          <a href={`mailto:${row.original.email}`}>
            <Button variant="ghost" size="icon" className="h-7 w-7">
              <Mail className="h-3.5 w-3.5" />
            </Button>
          </a>
          <a href={`tel:${row.original.phone}`}>
            <Button variant="ghost" size="icon" className="h-7 w-7">
              <Phone className="h-3.5 w-3.5" />
            </Button>
          </a>
        </div>
      ),
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <Link href={`/${lang}/members/${row.original.id}`}>
          <Button variant="ghost" size="sm" className="h-7 text-xs">
            <Eye className="mr-1 h-3.5 w-3.5" />
            {isAr ? "عرض" : "View"}
          </Button>
        </Link>
      ),
    },
  ]
}
