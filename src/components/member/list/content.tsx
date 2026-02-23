"use client"

import { useEffect, useState } from "react"
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  flexRender,
  type ColumnFiltersState,
} from "@tanstack/react-table"
import { Search, UserPlus } from "lucide-react"
import Link from "next/link"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { COMMITTEES } from "../onboarding/config"
import { getColumns } from "./columns"
import { fetchAllMembers } from "./actions"
import type { MemberListItem } from "./types"

interface MemberListContentProps {
  lang: string
}

export function MemberListContent({ lang }: MemberListContentProps) {
  const isAr = lang === "ar"
  const [data, setData] = useState<MemberListItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [globalFilter, setGlobalFilter] = useState("")
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

  useEffect(() => {
    fetchAllMembers().then((members) => {
      setData(members)
      setIsLoading(false)
    })
  }, [])

  const columns = getColumns(lang)

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: { globalFilter, columnFilters },
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,
    globalFilterFn: (row, _, filterValue) => {
      const search = filterValue.toLowerCase()
      return (
        row.original.fullNameAr.toLowerCase().includes(search) ||
        row.original.fullNameEn.toLowerCase().includes(search) ||
        (row.original.organization?.toLowerCase().includes(search) ?? false) ||
        (row.original.jobTitle?.toLowerCase().includes(search) ?? false)
      )
    },
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground md:text-4xl">
            {isAr ? "دليل الأعضاء" : "Member Directory"}
          </h1>
          <p className="mt-1 text-muted-foreground">
            {isAr
              ? `${data.length} عضو معتمد`
              : `${data.length} approved members`}
          </p>
        </div>
        <Link href={`/${lang}/members/join`}>
          <Button>
            <UserPlus className="mr-2 h-4 w-4" />
            {isAr ? "انضم إلينا" : "Join Us"}
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder={isAr ? "بحث بالاسم أو المؤسسة..." : "Search by name or organization..."}
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="ps-9"
          />
        </div>
        <Select
          value={
            (columnFilters.find((f) => f.id === "committees")?.value as string) ||
            "all"
          }
          onValueChange={(value) => {
            if (value === "all") {
              setColumnFilters((prev) =>
                prev.filter((f) => f.id !== "committees")
              )
            } else {
              setColumnFilters((prev) => [
                ...prev.filter((f) => f.id !== "committees"),
                { id: "committees", value },
              ])
            }
          }}
        >
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder={isAr ? "اللجنة" : "Committee"} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">
              {isAr ? "جميع اللجان" : "All Committees"}
            </SelectItem>
            {COMMITTEES.map((c) => (
              <SelectItem key={c.id} value={c.id}>
                {isAr ? c.labelAr : c.labelEn}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  {isAr ? "جاري التحميل..." : "Loading..."}
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  {isAr ? "لا يوجد أعضاء" : "No members found"}
                </TableCell>
              </TableRow>
            ) : (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
