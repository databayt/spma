"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import type { Dictionary } from "@/components/internationalization/types"
import { type Locale } from "@/components/internationalization/config"

import { deleteBook } from "../../actions"

interface Props {
  bookId: string
  lang: Locale
  dictionary: Dictionary
}

export default function BookTableActions({
  bookId,
  lang,
  dictionary,
}: Props) {
  const [isDeleting, setIsDeleting] = useState(false)
  const router = useRouter()

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this book?")) {
      return
    }

    setIsDeleting(true)

    try {
      const result = await deleteBook({ id: bookId })

      if (result.success) {
        toast.success(result.message)
        router.refresh()
      } else {
        toast.error(result.error || result.message)
      }
    } catch {
      toast.error("An error occurred")
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => router.push(`/${lang}/library/books/${bookId}`)}
      >
        View
      </Button>
      <Button
        variant="destructive"
        size="sm"
        onClick={handleDelete}
        disabled={isDeleting}
      >
        {isDeleting ? "Deleting..." : "Delete"}
      </Button>
    </div>
  )
}
