"use server"

import { revalidatePath } from "next/cache"

import { db } from "@/lib/db"

import { LIBRARY_CONFIG } from "./config"
import type { ActionResponse, Book } from "./types"
import {
  bookSchema,
  deleteBookSchema,
  type BookSchema,
  type DeleteBookSchema,
} from "./validation"

// Create a new book
export async function createBook(
  data: BookSchema
): Promise<ActionResponse<Book>> {
  try {
    const validatedData = bookSchema.parse(data)

    const book = await db.book.create({
      data: {
        ...validatedData,
        availableCopies: validatedData.totalCopies,
      },
    })

    revalidatePath("/library")
    revalidatePath("/library/admin/books")

    return {
      success: true,
      message: "Book created successfully",
      data: book as Book,
    }
  } catch (error) {
    console.error("Create book error:", error)
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to create book",
    }
  }
}

// Borrow a book
export async function borrowBook(
  data: { bookId: string; userId: string }
): Promise<ActionResponse> {
  try {
    const { bookId, userId } = data

    // Check if book exists and is available
    const book = await db.book.findFirst({
      where: { id: bookId },
    })

    if (!book) {
      return { success: false, message: "Book not found" }
    }

    if (book.availableCopies <= 0) {
      return { success: false, message: "No copies available" }
    }

    // Check if user already borrowed this book
    const existingBorrow = await db.borrowRecord.findFirst({
      where: {
        bookId,
        userId,
        status: "BORROWED",
      },
    })

    if (existingBorrow) {
      return {
        success: false,
        message: "You have already borrowed this book",
      }
    }

    // Calculate due date
    const dueDate = new Date()
    dueDate.setDate(dueDate.getDate() + LIBRARY_CONFIG.MAX_BORROW_DAYS)

    // Create borrow record and update book availability
    await db.$transaction([
      db.borrowRecord.create({
        data: {
          bookId,
          userId,
          dueDate,
          status: "BORROWED",
        },
      }),
      db.book.update({
        where: { id: bookId },
        data: {
          availableCopies: {
            decrement: 1,
          },
        },
      }),
    ])

    revalidatePath("/library")
    revalidatePath(`/library/books/${bookId}`)
    revalidatePath("/library/my-profile")

    return {
      success: true,
      message: `Book borrowed successfully. Due date: ${dueDate.toLocaleDateString()}`,
    }
  } catch (error) {
    console.error("Borrow book error:", error)
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to borrow book",
    }
  }
}

// Return a book
export async function returnBook(
  data: { borrowRecordId: string }
): Promise<ActionResponse> {
  try {
    const { borrowRecordId } = data

    // Find borrow record
    const borrowRecord = await db.borrowRecord.findFirst({
      where: { id: borrowRecordId },
      include: { book: true },
    })

    if (!borrowRecord) {
      return { success: false, message: "Borrow record not found" }
    }

    if (borrowRecord.status === "RETURNED") {
      return { success: false, message: "Book already returned" }
    }

    // Update borrow record and increment available copies
    await db.$transaction([
      db.borrowRecord.update({
        where: { id: borrowRecordId },
        data: {
          status: "RETURNED",
          returnDate: new Date(),
        },
      }),
      db.book.update({
        where: { id: borrowRecord.bookId },
        data: {
          availableCopies: {
            increment: 1,
          },
        },
      }),
    ])

    revalidatePath("/library")
    revalidatePath(`/library/books/${borrowRecord.bookId}`)
    revalidatePath("/library/my-profile")

    return {
      success: true,
      message: "Book returned successfully",
    }
  } catch (error) {
    console.error("Return book error:", error)
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to return book",
    }
  }
}

// Delete a book (admin only)
export async function deleteBook(
  data: DeleteBookSchema
): Promise<ActionResponse> {
  try {
    const { id } = deleteBookSchema.parse(data)

    // Verify book exists
    const book = await db.book.findFirst({
      where: { id },
    })

    if (!book) {
      return { success: false, message: "Book not found" }
    }

    // Check if book has active borrows
    const activeBorrows = await db.borrowRecord.count({
      where: {
        bookId: id,
        status: "BORROWED",
      },
    })

    if (activeBorrows > 0) {
      return {
        success: false,
        message: "Cannot delete book with active borrows",
      }
    }

    await db.book.delete({
      where: { id },
    })

    revalidatePath("/library")
    revalidatePath("/library/admin/books")

    return {
      success: true,
      message: "Book deleted successfully",
    }
  } catch (error) {
    console.error("Delete book error:", error)
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to delete book",
    }
  }
}
