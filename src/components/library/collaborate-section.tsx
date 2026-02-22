import Link from "next/link"

import { buttonVariants } from "@/components/ui/button"
import type { Dictionary } from "@/components/internationalization/types"

interface CollaborateSectionProps {
  lang?: string
  dictionary?: Dictionary
}

export function CollaborateSection({
  lang = "ar",
  dictionary,
}: CollaborateSectionProps) {
  const lib = dictionary?.library?.collaborate

  return (
    <section className="dark:bg-muted/50 w-full max-w-full overflow-hidden rounded-2xl bg-[#F5F5F0]">
      <div className="flex flex-col lg:flex-row">
        {/* Color Block - Left side */}
        <div className="relative flex aspect-[4/3] items-center justify-center bg-[#002F5D] lg:aspect-auto lg:w-1/2">
          <div className="p-12 text-center text-white">
            <h3 className="mb-2 text-4xl font-bold">PMBOK</h3>
            <p className="text-lg text-white/80">7th Edition</p>
          </div>
        </div>

        {/* Content - Right side */}
        <div className="flex flex-col justify-center p-8 lg:w-1/2 lg:p-12">
          <h2 className="mb-2 text-3xl font-semibold tracking-tight lg:text-4xl">
            {lib?.title || "PMBOK Guide - 7th Edition"}
          </h2>
          <p className="text-muted-foreground mb-4 text-lg">
            {lib?.author || "By Project Management Institute"}
          </p>
          <p className="text-muted-foreground mb-6">
            {lib?.description ||
              "The essential guide for project management professionals, covering principles and performance domains."}
          </p>
          <div>
            <Link
              href={`/${lang}/library/books`}
              className={buttonVariants({ variant: "outline", size: "lg" })}
            >
              {lib?.cta || "Get book"}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
