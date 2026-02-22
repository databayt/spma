import type { Dictionary } from "@/components/internationalization/types"
import { type Locale } from "@/components/internationalization/config"

import BookForm from "./book-form"

interface LibraryAdminBooksNewContentProps {
  dictionary: Dictionary
  lang: Locale
}

export default async function LibraryAdminBooksNewContent({
  dictionary,
  lang,
}: LibraryAdminBooksNewContentProps) {
  const lib = dictionary.library

  return (
    <div className="library-admin-new-book-container">
      <h1 className="library-admin-new-book-title">
        {lib?.admin?.addBook || "Add Book"}
      </h1>
      <BookForm dictionary={dictionary} lang={lang} />
    </div>
  )
}
