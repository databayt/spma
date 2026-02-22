"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArticleSchema } from "./validation";
import { ArticleFormValues } from "./type";
import { createArticle, updateArticle } from "./action";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { CheckIcon, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslations } from "@/lib/use-translations";

interface ArticleFormProps {
  mode: "create" | "edit";
  defaultValues?: Partial<ArticleFormValues>;
  articleId?: string;
  onSuccess?: () => void;
}

const authors = [
  "المقداد الهجان",
  "هشام احمد",
  "ابو بكر جيكوني",
  "قاسم الظافر",
  "الفاضل فرح",
  "يوسف مورو",
];

export default function ArticleForm({
  mode,
  defaultValues = {},
  articleId,
  onSuccess,
}: ArticleFormProps) {
  const router = useRouter();
  const { t } = useTranslations();
  const a = t.article;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(
    defaultValues.image || null,
  );
  const [authorOpen, setAuthorOpen] = useState(false);
  const [textareaHeight, setTextareaHeight] = useState("150px");

  const form = useForm<ArticleFormValues>({
    resolver: zodResolver(ArticleSchema),
    defaultValues: defaultValues as ArticleFormValues,
  });

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    form.setValue("title", title);
    form.setValue("slug", generateSlug(title));
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    form.setValue("body", e.target.value);

    e.target.style.height = "150px";
    const newHeight = Math.max(150, e.target.scrollHeight);
    e.target.style.height = `${newHeight}px`;
    setTextareaHeight(`${newHeight}px`);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setUploadedImage(previewUrl);
      form.setValue("image", previewUrl);
    }
  };

  const handleAuthorSelect = (author: string) => {
    form.setValue("author", author);
    setAuthorOpen(false);
  };

  const handleSubmit = async (values: ArticleFormValues) => {
    try {
      setIsSubmitting(true);
      setError(null);

      if (!uploadedImage) {
        setError(a?.imageRequired ?? "الرجاء تحميل صورة للمقال");
        setIsSubmitting(false);
        return;
      }

      if (!values.slug) {
        values.slug = generateSlug(values.title || "article");
      }

      let result;
      if (mode === "create") {
        result = await createArticle(values);
      } else if (articleId) {
        result = await updateArticle(articleId, values);
      } else {
        throw new Error("Invalid form mode or missing article ID");
      }

      if (result.status === "error") {
        setError(result.message || a?.unknownError || "حدث خطأ غير معروف");
        setIsSubmitting(false);
        return;
      }

      router.refresh();
      if (onSuccess) onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : a?.unknownError ?? "حدث خطأ غير معروف");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={form.handleSubmit(handleSubmit)}
      className="space-y-8 text-end"
    >
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
          {error}
        </div>
      )}

      <div className="flex flex-col space-y-6">
        <div>
          <Input
            id="title"
            {...form.register("title")}
            onChange={handleTitleChange}
            placeholder={a?.titlePlaceholder ?? "عنوان المقال"}
            className="text-end"
          />
          {form.formState.errors.title && (
            <p className="text-red-500 text-sm mt-1 text-end">
              {form.formState.errors.title.message}
            </p>
          )}
        </div>

        <div>
          <Textarea
            id="description"
            {...form.register("description")}
            placeholder={a?.descriptionPlaceholder ?? "وصف موجز للمقال"}
            rows={3}
            className="text-end resize-none"
          />
          {form.formState.errors.description && (
            <p className="text-red-500 text-sm mt-1 text-end">
              {form.formState.errors.description.message}
            </p>
          )}
        </div>

        <div>
          <Popover open={authorOpen} onOpenChange={setAuthorOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={authorOpen}
                className="w-full justify-between text-end"
              >
                {form.getValues("author") ? (
                  form.getValues("author")
                ) : (
                  <span className="text-muted-foreground">{a?.selectAuthor ?? "اختر كاتب"}</span>
                )}
                <ChevronsUpDown className="ms-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0" align="start">
              <Command>
                <CommandList>
                  <CommandGroup>
                    {authors.map((author) => (
                      <CommandItem
                        key={author}
                        value={author}
                        onSelect={() => handleAuthorSelect(author)}
                        className="text-end"
                      >
                        <CheckIcon
                          className={cn(
                            "me-2 h-4 w-4",
                            form.getValues("author") === author
                              ? "opacity-100"
                              : "opacity-0",
                          )}
                        />
                        {author}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          {form.formState.errors.author && (
            <p className="text-red-500 text-sm mt-1 text-end">
              {form.formState.errors.author.message}
            </p>
          )}
        </div>

        <div>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full text-sm text-gray-500 file:me-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
          />
          <input
            type="hidden"
            {...form.register("image")}
            value={uploadedImage || ""}
          />
          {uploadedImage && (
            <div className="mt-2">
              <img
                src={uploadedImage}
                alt="Article image preview"
                className="w-full max-h-48 object-cover rounded-md"
              />
            </div>
          )}
          {form.formState.errors.image && (
            <p className="text-red-500 text-sm mt-1 text-end">
              {form.formState.errors.image.message}
            </p>
          )}
        </div>

        <div>
          <Textarea
            id="body"
            {...form.register("body")}
            onChange={handleTextareaChange}
            placeholder={a?.bodyPlaceholder ?? "المحتوى الكامل للمقال"}
            style={{ height: textareaHeight }}
            className="text-end resize-none"
          />
          {form.formState.errors.body && (
            <p className="text-red-500 text-sm mt-1 text-end">
              {form.formState.errors.body.message}
            </p>
          )}
        </div>
      </div>

      <div className="flex justify-start gap-4">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="bg-primary text-white"
        >
          {isSubmitting
            ? (a?.processing ?? "جاري المعالجة...")
            : mode === "create"
              ? (a?.createArticle ?? "إنشاء المقال")
              : (a?.updateArticle ?? "تحديث المقال")}
        </Button>
      </div>
    </form>
  );
}
