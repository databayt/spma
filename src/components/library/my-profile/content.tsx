import Image from "next/image"
import Link from "next/link"

import { db } from "@/lib/db"
import { Button } from "@/components/ui/button"
import type { Dictionary } from "@/components/internationalization/types"

interface Props {
  userId?: string
  dictionary?: Dictionary
  lang?: string
}

export default async function LibraryMyProfileContent({
  userId,
  dictionary,
  lang = "ar",
}: Props) {
  const lib = dictionary?.library

  if (!userId) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center">
        <h2 className="mb-4">
          {lib?.loginRequired || "Login required to view your profile"}
        </h2>
        <p className="text-muted-foreground">
          {lang === "ar"
            ? "يرجى تسجيل الدخول لعرض ملفك الشخصي في المكتبة"
            : "Please login to view your library profile"}
        </p>
      </div>
    )
  }

  // Fetch user's borrow records
  const borrowRecords = await db.borrowRecord.findMany({
    where: { userId },
    include: { book: true },
    orderBy: { borrowDate: "desc" },
    take: 50,
  })

  const activeBorrows = borrowRecords.filter(
    (record) => record.status === "BORROWED"
  )

  const borrowHistory = borrowRecords.filter(
    (record) => record.status === "RETURNED"
  )

  return (
    <div className="library-profile-container">
      <h1 className="library-profile-title">
        {lib?.myProfile || "My Library Profile"}
      </h1>

      {/* Active Borrows Section */}
      <section className="library-profile-section">
        <h2 className="library-profile-section-title">
          {lib?.currentlyBorrowed || "Currently Borrowed"} (
          {activeBorrows.length})
        </h2>

        {activeBorrows.length === 0 ? (
          <p className="text-muted-foreground">
            {lib?.noBorrowedBooks || "You haven't borrowed any books yet"}
          </p>
        ) : (
          <div className="library-profile-grid">
            {activeBorrows.map((record) => (
              <div key={record.id} className="library-profile-card">
                <div className="library-profile-card-image">
                  {record.book.coverUrl ? (
                    <Image
                      src={record.book.coverUrl}
                      alt={record.book.title}
                      width={150}
                      height={225}
                      className="h-full w-full rounded object-cover"
                    />
                  ) : (
                    <div
                      className="flex h-full w-full items-center justify-center rounded p-2 text-center"
                      style={{
                        backgroundColor: record.book.coverColor || "#1a1a2e",
                      }}
                    >
                      <p className="text-xs font-bold text-white">
                        {record.book.title}
                      </p>
                    </div>
                  )}
                </div>

                <div className="library-profile-card-content">
                  <h5 className="font-semibold">{record.book.title}</h5>
                  <p className="text-muted-foreground text-sm">
                    {lib?.by || "by"} {record.book.author}
                  </p>

                  <div className="library-profile-card-meta">
                    <small>
                      <strong>{lib?.borrowDate || "Borrowed"}:</strong>{" "}
                      {new Date(record.borrowDate).toLocaleDateString()}
                    </small>
                    <small>
                      <strong>{lib?.dueDate || "Due"}:</strong>{" "}
                      {new Date(record.dueDate).toLocaleDateString()}
                    </small>

                    {new Date(record.dueDate) < new Date() && (
                      <small className="text-destructive">
                        {lib?.overdue || "Overdue!"}
                      </small>
                    )}
                  </div>

                  <Button asChild size="sm" className="mt-2">
                    <Link href={`/${lang}/library/books/${record.book.id}`}>
                      {lib?.viewBook || "View Book"}
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Borrow History Section */}
      <section className="library-profile-section">
        <h2 className="library-profile-section-title">
          {lib?.borrowHistory || "Borrow History"} ({borrowHistory.length})
        </h2>

        {borrowHistory.length === 0 ? (
          <p className="text-muted-foreground">
            {lib?.noBorrowHistory || "No borrow history yet"}
          </p>
        ) : (
          <div className="library-profile-history">
            {borrowHistory.map((record) => (
              <div key={record.id} className="library-profile-history-item">
                <div className="library-profile-history-image">
                  {record.book.coverUrl ? (
                    <Image
                      src={record.book.coverUrl}
                      alt={record.book.title}
                      width={80}
                      height={120}
                      className="h-full w-full rounded object-cover"
                    />
                  ) : (
                    <div
                      className="flex h-full w-full items-center justify-center rounded p-1 text-center"
                      style={{
                        backgroundColor: record.book.coverColor || "#1a1a2e",
                      }}
                    >
                      <p className="text-[10px] font-bold text-white">
                        {record.book.title}
                      </p>
                    </div>
                  )}
                </div>

                <div className="library-profile-history-content">
                  <h6 className="font-medium">{record.book.title}</h6>
                  <p className="text-muted-foreground text-sm">
                    {lib?.by || "by"} {record.book.author}
                  </p>

                  <div className="library-profile-history-dates">
                    <small className="text-muted-foreground">
                      {lib?.borrowDate || "Borrowed"}:{" "}
                      {new Date(record.borrowDate).toLocaleDateString()}
                    </small>
                    <small className="text-muted-foreground">
                      {lib?.returnDate || "Returned"}:{" "}
                      {record.returnDate
                        ? new Date(record.returnDate).toLocaleDateString()
                        : "N/A"}
                    </small>
                  </div>
                </div>

                <Button asChild variant="outline" size="sm">
                  <Link href={`/${lang}/library/books/${record.book.id}`}>
                    {lib?.viewBook || "View"}
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
