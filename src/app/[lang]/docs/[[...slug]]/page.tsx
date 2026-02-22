import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { findNeighbour } from "fumadocs-core/page-tree"
import type { Metadata } from "next"
import { docsSource } from "@/lib/source"
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
  const onThisPageText = dictionary?.docs?.onThisPage || "On This Page"

  return (
    <div className="flex items-stretch text-[15px] xl:w-full">
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="mx-auto flex w-full max-w-2xl min-w-0 flex-1 flex-col gap-8 py-6 text-neutral-800 lg:py-8 dark:text-neutral-300">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold tracking-tight">
              {doc.title}
            </h1>
            {doc.description && (
              <p className="text-muted-foreground text-base">
                {doc.description}
              </p>
            )}
          </div>

          <div className="w-full flex-1">
            <MDX components={mdxComponents} />
          </div>

          <div className="flex items-center justify-between border-t pt-6">
            {neighbours.previous ? (
              <Button variant="ghost" asChild>
                <Link href={`${prefix}${neighbours.previous.url}`}>
                  <ArrowLeft className="me-2 h-4 w-4" />
                  {neighbours.previous.name}
                </Link>
              </Button>
            ) : (
              <div />
            )}
            {neighbours.next ? (
              <Button variant="ghost" asChild>
                <Link href={`${prefix}${neighbours.next.url}`}>
                  {neighbours.next.name}
                  <ArrowRight className="ms-2 h-4 w-4" />
                </Link>
              </Button>
            ) : (
              <div />
            )}
          </div>
        </div>
      </div>

      {doc.toc?.length ? (
        <div className="sticky top-8 z-30 ms-auto hidden h-[calc(100vh-4rem)] w-72 flex-col gap-4 overflow-hidden pb-8 xl:flex">
          <div className="no-scrollbar overflow-y-auto px-8">
            <DocsTableOfContents
              toc={doc.toc as any}
              onThisPageText={onThisPageText}
            />
          </div>
        </div>
      ) : null}
    </div>
  )
}
