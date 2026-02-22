"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import type { Dictionary } from "@/components/internationalization/types"

import { borrowBook, returnBook } from "../actions"

interface Props {
  bookId: string
  userId?: string
  availableCopies: number
  hasBorrowedBook: boolean
  borrowRecordId?: string
  dictionary?: Dictionary["library"]
}

export default function BorrowBook({
  bookId,
  userId,
  availableCopies,
  hasBorrowedBook,
  borrowRecordId,
  dictionary: lib,
}: Props) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  // No auth - show login message
  if (!userId) {
    return (
      <Button disabled variant="secondary">
        {lib?.loginRequired || "Login required to borrow books"}
      </Button>
    )
  }

  const handleBorrow = async () => {
    setIsLoading(true)

    try {
      const result = await borrowBook({
        bookId,
        userId,
      })

      if (result.success) {
        toast.success(result.message)
        router.refresh()
      } else {
        toast.error(result.error || "Failed to borrow book")
      }
    } catch {
      toast.error("An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  const handleReturn = async () => {
    if (!borrowRecordId) return

    setIsLoading(true)

    try {
      const result = await returnBook({
        borrowRecordId,
      })

      if (result.success) {
        toast.success(result.message)
        router.refresh()
      } else {
        toast.error(result.error || "Failed to return book")
      }
    } catch {
      toast.error("An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  if (hasBorrowedBook) {
    return (
      <div>
        <p className="mb-2 text-sm text-emerald-600">
          {lib?.borrowedThisBook || "You have borrowed this book"}
        </p>
        <Button onClick={handleReturn} disabled={isLoading} variant="outline">
          {isLoading
            ? lib?.returning || "Returning..."
            : lib?.returnBook || "Return Book"}
        </Button>
      </div>
    )
  }

  if (availableCopies === 0) {
    return (
      <Button disabled variant="secondary">
        {lib?.currentlyUnavailable || "Currently Unavailable"}
      </Button>
    )
  }

  return (
    <Button onClick={handleBorrow} disabled={isLoading}>
      {isLoading
        ? lib?.borrowing || "Borrowing..."
        : lib?.borrowBook || "Borrow Book"}
    </Button>
  )
}
