import type { Metadata } from "next"
import { getDictionary } from "@/components/internationalization/dictionaries"
import type { Locale } from "@/components/internationalization/config"
import { Header } from "@/components/template/header/header"
import { Footer } from "@/components/marketing/footer"
import { ApplicationsContent } from "@/components/member/admin/applications-content"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params
  return {
    title: lang === "ar" ? "مراجعة الطلبات" : "Application Review",
    description:
      lang === "ar"
        ? "مراجعة طلبات العضوية"
        : "Review membership applications",
  }
}

export default async function ApplicationsPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang: langParam } = await params
  const lang = langParam as Locale
  const dictionary = await getDictionary(lang)

  return (
    <>
      <Header lang={lang} dictionary={dictionary} />
      <main className="min-h-screen pt-20">
        <div className="layout-container mx-auto max-w-7xl py-12">
          <ApplicationsContent lang={lang} />
        </div>
      </main>
      <Footer lang={lang} dictionary={dictionary} />
    </>
  )
}
