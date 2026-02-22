"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import type { Dictionary } from "@/components/internationalization/types"
import { type Locale } from "@/components/internationalization/config"

import { createBook } from "../../actions"
import { BOOK_GENRES } from "../../config"
import { bookSchema, type BookSchema } from "../../validation"
import ColorPicker from "./color-picker"
import FileUpload from "./file-upload"

interface Props {
  type?: "create" | "update"
  bookData?: Partial<BookSchema>
  dictionary: Dictionary
  lang: Locale
}

export default function BookForm({
  type = "create",
  bookData,
  dictionary,
  lang,
}: Props) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const lib = dictionary.library

  const form = useForm<BookSchema>({
    // @ts-expect-error -- Zod v4 / hookform-resolvers v5 type mismatch
    resolver: zodResolver(bookSchema),
    defaultValues: {
      title: bookData?.title || "",
      author: bookData?.author || "",
      genre: bookData?.genre || "",
      rating: bookData?.rating || 0,
      coverUrl: bookData?.coverUrl || "",
      coverColor: bookData?.coverColor || "#000000",
      description: bookData?.description || "",
      totalCopies: bookData?.totalCopies || 1,
      videoUrl: bookData?.videoUrl || "",
      summary: bookData?.summary || "",
    },
  })

  const onSubmit = async (values: BookSchema) => {
    setIsSubmitting(true)

    try {
      const result = await createBook(values)

      if (result.success) {
        toast.success(result.message)
        router.push(`/${lang}/library/admin/books`)
        router.refresh()
      } else {
        toast.error(result.error || result.message)
      }
    } catch {
      toast.error("An error occurred")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{lib?.admin?.bookTitle || "Title"}</FormLabel>
              <FormControl>
                <Input placeholder={lib?.admin?.bookTitle || "Title"} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="author"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{lib?.admin?.bookAuthor || "Author"}</FormLabel>
              <FormControl>
                <Input placeholder={lib?.admin?.bookAuthor || "Author"} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="genre"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{lib?.admin?.bookGenre || "Genre"}</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={lib?.admin?.selectGenre || "Select genre"} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {BOOK_GENRES.map((genre) => (
                    <SelectItem key={genre} value={genre}>
                      {genre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="rating"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{lib?.admin?.bookRating || "Rating"}</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min={0}
                  max={5}
                  step={0.1}
                  placeholder={lib?.admin?.enterRating || "Enter rating (0-5)"}
                  {...field}
                  onChange={(e) => field.onChange(parseFloat(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="totalCopies"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{lib?.admin?.totalCopies || "Total Copies"}</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min={1}
                  placeholder={lib?.admin?.totalCopies || "Total Copies"}
                  {...field}
                  onChange={(e) => field.onChange(parseInt(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="coverUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{lib?.admin?.bookCover || "Book Cover"}</FormLabel>
              <FormControl>
                <FileUpload
                  value={field.value}
                  onChange={field.onChange}
                  accept="image"
                  placeholder={lib?.admin?.uploadBookCover || "Enter cover image URL"}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="coverColor"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{lib?.admin?.coverColor || "Cover Color"}</FormLabel>
              <FormControl>
                <ColorPicker value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="videoUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{lib?.admin?.bookTrailer || "Book Trailer"}</FormLabel>
              <FormControl>
                <FileUpload
                  value={field.value || ""}
                  onChange={field.onChange}
                  accept="video"
                  placeholder={lib?.admin?.uploadBookTrailer || "Enter video URL"}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{lib?.admin?.bookDescription || "Description"}</FormLabel>
              <FormControl>
                <Textarea
                  placeholder={lib?.admin?.bookDescription || "Description"}
                  rows={5}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="summary"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{lib?.admin?.bookSummary || "Summary"}</FormLabel>
              <FormControl>
                <Textarea
                  placeholder={lib?.admin?.bookSummary || "Summary"}
                  rows={4}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-4">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            {lib?.admin?.cancel || "Cancel"}
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting
              ? lib?.admin?.creating || "Creating..."
              : lib?.admin?.addBookToLibrary || "Add Book to Library"}
          </Button>
        </div>
      </form>
    </Form>
  )
}
