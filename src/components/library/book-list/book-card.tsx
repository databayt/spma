"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"

import type { Book } from "../types"

interface Props {
  book: Book
}

export default function BookCard({ book }: Props) {
  const [imageError, setImageError] = useState(false)

  const hasValidImage =
    book.coverUrl && !book.coverUrl.includes("placeholder") && !imageError

  // Fallback content for missing images
  const FallbackContent = () => (
    <div className="flex h-full flex-col items-center justify-center p-4 text-center">
      <h3 className="mb-2 line-clamp-3 text-lg font-bold text-white">
        {book.title}
      </h3>
      <p className="text-sm text-white/80">{book.author}</p>
    </div>
  )

  return (
    <li className="list-none">
      <Link
        href={`/library/books/${book.id}`}
        className="bg-card border-border block overflow-hidden rounded-lg border transition-shadow hover:shadow-lg"
      >
        {/* Book Cover */}
        <div
          className="relative aspect-[3/4] overflow-hidden"
          style={{ backgroundColor: book.coverColor || "#1a1a2e" }}
        >
          {hasValidImage ? (
            <Image
              src={book.coverUrl}
              alt={book.title}
              fill
              className="object-cover"
              onError={() => setImageError(true)}
            />
          ) : (
            <FallbackContent />
          )}
        </div>

        {/* Book Info */}
        <div className="space-y-2 p-4">
          <h4 className="text-foreground line-clamp-1 font-semibold">
            {book.title}
          </h4>
          <p className="text-muted-foreground text-sm">by {book.author}</p>

          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">{book.genre}</span>
            <span className="text-amber-500">{book.rating}/5</span>
          </div>

          <p
            className={`text-sm font-medium ${
              book.availableCopies > 0
                ? "text-green-600 dark:text-green-400"
                : "text-red-600 dark:text-red-400"
            }`}
          >
            {book.availableCopies > 0
              ? `${book.availableCopies} available`
              : "Unavailable"}
          </p>
        </div>
      </Link>
    </li>
  )
}
