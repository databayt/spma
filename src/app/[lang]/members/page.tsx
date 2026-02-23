import type { Metadata } from "next"
import { getDictionary } from "@/components/internationalization/dictionaries"
import type { Locale } from "@/components/internationalization/config"
import { Header } from "@/components/template/header/header"
import { Footer } from "@/components/marketing/footer"
import { MemberListContent } from "@/components/member/list/content"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params
  return {
    title: lang === "ar" ? "الأعضاء" : "Members",
    description:
      lang === "ar"
        ? "دليل أعضاء الجمعية السودانية لإدارة المشاريع"
        : "SPMA Member Directory",
  }
}

export default async function MembersPage({
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
          <MemberListContent lang={lang} />
        </div>
      </main>
      <Footer lang={lang} dictionary={dictionary} />
    </>
  )
}
