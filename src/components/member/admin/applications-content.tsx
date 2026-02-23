"use client"

import { useEffect, useState, useCallback } from "react"
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  flexRender,
  type ColumnFiltersState,
} from "@tanstack/react-table"
import { Search } from "lucide-react"
import type { Member } from "@prisma/client"

import { Input } from "@/components/ui/input"
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

import { getAdminColumns } from "./columns"
import { ApplicationDetail } from "./application-detail"
import { fetchApplications } from "./actions"

interface ApplicationsContentProps {
  lang: string
}

export function ApplicationsContent({ lang }: ApplicationsContentProps) {
  const isAr = lang === "ar"
  const [data, setData] = useState<Member[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [globalFilter, setGlobalFilter] = useState("")
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [selectedMember, setSelectedMember] = useState<Member | null>(null)
  const [detailOpen, setDetailOpen] = useState(false)

  const loadData = useCallback(() => {
    setIsLoading(true)
    fetchApplications().then((apps) => {
      setData(apps)
      setIsLoading(false)
    })
  }, [])

  useEffect(() => {
    loadData()
  }, [loadData])

  const handleView = (member: Member) => {
    setSelectedMember(member)
    setDetailOpen(true)
  }

  const columns = getAdminColumns(lang, handleView)

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
        row.original.email.toLowerCase().includes(search)
      )
    },
  })

  const pendingCount = data.filter(
    (m) => m.applicationStatus === "PENDING"
  ).length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground md:text-4xl">
          {isAr ? "مراجعة الطلبات" : "Application Review"}
        </h1>
        <p className="mt-1 text-muted-foreground">
          {isAr
            ? `${pendingCount} طلب بانتظار المراجعة`
            : `${pendingCount} applications pending review`}
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder={isAr ? "بحث بالاسم أو البريد..." : "Search by name or email..."}
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="ps-9"
          />
        </div>
        <Select
          value={
            (columnFilters.find((f) => f.id === "applicationStatus")
              ?.value as string) || "all"
          }
          onValueChange={(value) => {
            if (value === "all") {
              setColumnFilters((prev) =>
                prev.filter((f) => f.id !== "applicationStatus")
              )
            } else {
              setColumnFilters((prev) => [
                ...prev.filter((f) => f.id !== "applicationStatus"),
                { id: "applicationStatus", value },
              ])
            }
          }}
        >
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder={isAr ? "الحالة" : "Status"} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{isAr ? "الكل" : "All"}</SelectItem>
            <SelectItem value="pending">
              {isAr ? "قيد المراجعة" : "Pending"}
            </SelectItem>
            <SelectItem value="approved">
              {isAr ? "مقبول" : "Approved"}
            </SelectItem>
            <SelectItem value="rejected">
              {isAr ? "مرفوض" : "Rejected"}
            </SelectItem>
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
                  {isAr ? "لا توجد طلبات" : "No applications found"}
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

      {/* Detail Dialog */}
      <ApplicationDetail
        member={selectedMember}
        open={detailOpen}
        onClose={() => setDetailOpen(false)}
        onUpdate={loadData}
        lang={lang}
      />
    </div>
  )
}
