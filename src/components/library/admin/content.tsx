import Link from "next/link"

import { db } from "@/lib/db"
import { Button } from "@/components/ui/button"
import type { Dictionary } from "@/components/internationalization/types"
import { type Locale } from "@/components/internationalization/config"

interface LibraryAdminContentProps {
  dictionary: Dictionary
  lang: Locale
}

export default async function LibraryAdminContent({
  dictionary,
  lang,
}: LibraryAdminContentProps) {
  const lib = dictionary.library

  // Fetch statistics
  const [totalBooks, totalBorrows, activeBorrows, overdueBooks] =
    await Promise.all([
      db.book.count(),
      db.borrowRecord.count(),
      db.borrowRecord.count({
        where: { status: "BORROWED" },
      }),
      db.borrowRecord.count({
        where: {
          status: "BORROWED",
          dueDate: { lt: new Date() },
        },
      }),
    ])

  return (
    <div className="library-admin-container">
      <div className="library-admin-header">
        <h1 className="library-admin-title">
          {lib?.admin?.dashboard || "Library Dashboard"}
        </h1>
        <Button asChild>
          <Link href={`/${lang}/library/admin/books/new`}>
            + {lib?.admin?.addBook || "Add Book"}
          </Link>
        </Button>
      </div>

      {/* Statistics Grid */}
      <div className="library-admin-stats-grid">
        <div className="library-admin-stat-card">
          <h3 className="library-admin-stat-label">
            {lib?.admin?.totalBooks || "Total Books"}
          </h3>
          <p className="library-admin-stat-value">{totalBooks}</p>
        </div>

        <div className="library-admin-stat-card">
          <h3 className="library-admin-stat-label">
            {lib?.admin?.totalBorrows || "Total Borrows"}
          </h3>
          <p className="library-admin-stat-value">{totalBorrows}</p>
        </div>

        <div className="library-admin-stat-card">
          <h3 className="library-admin-stat-label">
            {lib?.admin?.activeBorrows || "Active Borrows"}
          </h3>
          <p className="library-admin-stat-value">{activeBorrows}</p>
        </div>

        <div className="library-admin-stat-card">
          <h3 className="library-admin-stat-label">
            {lib?.admin?.overdueBooks || "Overdue Books"}
          </h3>
          <p className="library-admin-stat-value text-destructive">
            {overdueBooks}
          </p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="library-admin-actions">
        <h4 className="mb-4">
          {lib?.admin?.quickActions || "Quick Actions"}
        </h4>
        <div className="library-admin-actions-grid">
          <Button asChild variant="outline" className="w-full">
            <Link href={`/${lang}/library/admin/books`}>
              {lib?.admin?.viewAllBooks || "View All Books"}
            </Link>
          </Button>
          <Button asChild variant="outline" className="w-full">
            <Link href={`/${lang}/library/admin/books/new`}>
              {lib?.admin?.addBook || "Add Book"}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
