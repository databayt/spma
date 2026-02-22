import Link from "next/link"

import { db } from "@/lib/db"
import { Button } from "@/components/ui/button"
import type { Dictionary } from "@/components/internationalization/types"
import { type Locale } from "@/components/internationalization/config"

import BookTableActions from "./book-table-actions"

interface LibraryAdminBooksContentProps {
  dictionary: Dictionary
  lang: Locale
}

export default async function LibraryAdminBooksContent({
  dictionary,
  lang,
}: LibraryAdminBooksContentProps) {
  const lib = dictionary.library

  const books = await db.book.findMany({
    orderBy: { createdAt: "desc" },
  })

  return (
    <section className="library-admin-books-container">
      <div className="library-admin-books-header">
        <h2 className="library-admin-books-title">
          {lib?.admin?.allBooks || "All Books"}
        </h2>
        <Button asChild>
          <Link href={`/${lang}/library/admin/books/new`}>
            + {lib?.admin?.createNewBook || "Create New Book"}
          </Link>
        </Button>
      </div>

      <div className="library-admin-books-table-wrapper">
        {books.length === 0 ? (
          <div className="library-admin-books-empty">
            <p>{lib?.admin?.noBooks || "No books found"}</p>
            <Button asChild className="mt-4">
              <Link href={`/${lang}/library/admin/books/new`}>
                {lib?.admin?.addFirstBook || "Add First Book"}
              </Link>
            </Button>
          </div>
        ) : (
          <table className="library-admin-books-table">
            <thead>
              <tr>
                <th>{lib?.admin?.bookTitle || "Title"}</th>
                <th>{lib?.admin?.bookAuthor || "Author"}</th>
                <th>{lib?.admin?.bookGenre || "Genre"}</th>
                <th>{lib?.admin?.totalCopies || "Total Copies"}</th>
                <th>{lib?.available || "Available"}</th>
                <th>{lib?.rating || "Rating"}</th>
                <th>{lib?.admin?.actions || "Actions"}</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book.id}>
                  <td>
                    <strong>{book.title}</strong>
                  </td>
                  <td>{book.author}</td>
                  <td>{book.genre}</td>
                  <td>{book.totalCopies}</td>
                  <td>{book.availableCopies}</td>
                  <td>{book.rating}/5</td>
                  <td>
                    <BookTableActions
                      bookId={book.id}
                      lang={lang}
                      dictionary={dictionary}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  )
}
