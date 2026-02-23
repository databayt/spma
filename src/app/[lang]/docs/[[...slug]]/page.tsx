import fs from "node:fs"
import path from "node:path"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { findNeighbour } from "fumadocs-core/page-tree"
import type { Metadata } from "next"
import { docsSource } from "@/lib/source"
import { DocsCopyPage } from "@/components/docs/docs-copy-page"
import { DocsTableOfContents } from "@/components/docs/toc"
import { Button } from "@/components/ui/button"
import { mdxComponents } from "@/mdx-components"
import { getDictionary } from "@/components/internationalization/dictionaries"
import type { Locale } from "@/components/internationalization/config"

export const runtime = "nodejs"
export const revalidate = false
export const dynamic = "force-static"
export const dynamicParams = false

export function generateStaticParams() {
  return docsSource.generateParams().flatMap((p) => [
    { ...p, lang: "en" },
    { ...p, lang: "ar" },
  ])
}

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[]; lang: string }>
}): Promise<Metadata> {
  const params = await props.params
  const page = docsSource.getPage(params.slug)
  if (!page) notFound()

  return {
    title: page.data.title,
    description: page.data.description,
  }
}

export default async function DocsPage(props: {
  params: Promise<{ slug?: string[]; lang: string }>
}) {
  const params = await props.params
  const page = docsSource.getPage(params.slug)
  const dictionary = await getDictionary(params.lang as Locale)

  if (!page) notFound()

  const doc = page.data
  const MDX = doc.body
  const neighbours = findNeighbour(docsSource.pageTree, page.url)
  const prefix = `/${params.lang}`

  const slugPath = params.slug?.join("/") || "index"
  const mdxFile = path.join(process.cwd(), "content/docs", `${slugPath}.mdx`)
  const raw = fs.existsSync(mdxFile) ? fs.readFileSync(mdxFile, "utf-8") : ""
  const pageUrl = `${prefix}${page.url}`

  return (
    <div className="flex items-stretch text-[1.1rem] sm:text-base xl:w-full">
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex w-full max-w-2xl min-w-0 flex-1 flex-col gap-8 py-4 text-neutral-800 lg:py-6 dark:text-neutral-300">
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-2">
              <div className="flex items-start justify-between">
                <h1 className="scroll-m-20 text-4xl font-semibold tracking-tight sm:text-3xl xl:text-4xl">
                  {doc.title}
                </h1>
                <div className="docs-nav bg-background/80 border-border/50 fixed inset-x-0 bottom-0 isolate z-50 flex items-center gap-2 border-t px-6 py-4 backdrop-blur-sm sm:static sm:z-0 sm:border-t-0 sm:bg-transparent sm:px-0 sm:pt-1.5 sm:backdrop-blur-none">
                  <DocsCopyPage page={raw} url={pageUrl} dictionary={dictionary} />
                  {neighbours.previous && (
                    <Button
                      variant="secondary"
                      size="icon"
                      className="extend-touch-target ms-auto size-8 shadow-none md:size-7"
                      asChild
                    >
                      <Link href={`${prefix}${neighbours.previous.url}`}>
                        <ArrowLeft />
                        <span className="sr-only">{dictionary?.common?.previous || "Previous"}</span>
                      </Link>
                    </Button>
                  )}
                  {neighbours.next && (
                    <Button
                      variant="secondary"
                      size="icon"
                      className="extend-touch-target size-8 shadow-none md:size-7"
                      asChild
                    >
                      <Link href={`${prefix}${neighbours.next.url}`}>
                        <span className="sr-only">{dictionary?.common?.next || "Next"}</span>
                        <ArrowRight />
                      </Link>
                    </Button>
                  )}
                </div>
              </div>
              {doc.description && (
                <p className="text-muted-foreground text-[1.1rem] text-balance sm:text-base">
                  {doc.description}
                </p>
              )}
            </div>
          </div>

          <div className="w-full flex-1 *:data-[slot=alert]:first:mt-0">
            <MDX components={mdxComponents} />
          </div>
        </div>
        <div className="hidden h-16 w-full max-w-2xl items-center gap-2 sm:flex">
          {neighbours.previous && (
            <Button
              variant="secondary"
              size="sm"
              asChild
              className="shadow-none"
            >
              <Link href={`${prefix}${neighbours.previous.url}`}>
                <ArrowLeft /> {neighbours.previous.name}
              </Link>
            </Button>
          )}
          {neighbours.next && (
            <Button
              variant="secondary"
              size="sm"
              className="ms-auto shadow-none"
              asChild
            >
              <Link href={`${prefix}${neighbours.next.url}`}>
                {neighbours.next.name} <ArrowRight />
              </Link>
            </Button>
          )}
        </div>
      </div>
      <div className="sticky top-20 z-30 ms-auto hidden h-[calc(100vh-5rem)] w-72 shrink-0 flex-col gap-4 overflow-hidden pb-8 ps-6 xl:flex">
        {doc.toc?.length ? (
          <div className="no-scrollbar overflow-y-auto px-4">
            <DocsTableOfContents
              toc={doc.toc as any}
              dictionary={dictionary}
            />
            <div className="h-12" />
          </div>
        ) : null}
      </div>
    </div>
  )
}
