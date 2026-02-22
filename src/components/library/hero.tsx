"use client"

import Link from "next/link"

import { buttonVariants } from "@/components/ui/button"
import type { Dictionary } from "@/components/internationalization/types"

import { LibraryAnimation } from "./library-animation"

interface LibraryHeroProps {
  lang?: string
  dictionary?: Dictionary
}

export function LibraryHero({ lang = "ar", dictionary }: LibraryHeroProps) {
  const lib = dictionary?.library

  return (
    <section className="relative">
      <div className="flex flex-col items-center gap-8 lg:flex-row lg:gap-16 lg:rtl:flex-row-reverse">
        {/* Text Content */}
        <div className="flex flex-1 flex-col items-start space-y-6 text-start lg:items-start lg:text-start">
          <h1 className="text-5xl leading-none font-extrabold tracking-tighter md:text-6xl lg:text-7xl">
            {lib?.title || "المكتبة الإلكترونية"}
            <br />
            <span className="mt-2 block text-3xl font-semibold md:text-4xl lg:text-5xl">
              {lang === "ar"
                ? "اكتشف المعرفة"
                : "Discover Knowledge"}
            </span>
          </h1>

          <div className="flex flex-col gap-4 sm:flex-row sm:rtl:flex-row-reverse">
            <Link
              className={buttonVariants({
                size: "lg",
              })}
              href={`/${lang}/library/books`}
            >
              {lib?.navigation?.browse || "Browse Books"}
            </Link>

            <Link
              className={buttonVariants({
                size: "lg",
                variant: "ghost",
              })}
              href={`/${lang}/library/my-profile`}
            >
              {lib?.navigation?.favorite || "Favorites"}
            </Link>
          </div>
        </div>

        {/* Animation */}
        <div className="flex flex-1 justify-center">
          <LibraryAnimation className="h-56 w-full max-w-md md:h-72" />
        </div>
      </div>
    </section>
  )
}
