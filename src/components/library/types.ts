// Library Management System - Type Definitions

export interface Book {
  id: string
  title: string
  author: string
  genre: string
  rating: number
  coverUrl: string
  coverColor: string
  description: string
  totalCopies: number
  availableCopies: number
  videoUrl?: string | null
  summary: string
  createdAt: Date
  updatedAt: Date
}

export interface BorrowRecord {
  id: string
  userId: string
  bookId: string
  borrowDate: Date
  dueDate: Date
  returnDate?: Date | null
  status: BorrowStatus
  createdAt: Date
  updatedAt: Date
  book?: Book
}

export enum BorrowStatus {
  BORROWED = "BORROWED",
  RETURNED = "RETURNED",
  OVERDUE = "OVERDUE",
}

// Form types for book creation/editing
export interface BookFormData {
  title: string
  author: string
  genre: string
  rating: number
  coverUrl: string
  coverColor: string
  description: string
  totalCopies: number
  videoUrl?: string
  summary: string
}

// Return types for server actions
export interface ActionResponse<T = void> {
  success: boolean
  message: string
  data?: T
  error?: string
}
