import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { getDictionary } from "@/components/internationalization/dictionaries"
import type { Locale } from "@/components/internationalization/config"
import { Header } from "@/components/template/header/header"
import { Footer } from "@/components/marketing/footer"
import { fetchMemberById } from "@/components/member/profile/actions"
import { ProfileHeader } from "@/components/member/profile/profile-header"
import { ProfileTabs } from "@/components/member/profile/profile-tabs"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; id: string }>
}): Promise<Metadata> {
  const { lang, id } = await params
  const member = await fetchMemberById(id)
  if (!member) return { title: "Not Found" }
  const name = lang === "ar" ? member.fullNameAr : member.fullNameEn
  return {
    title: name,
    description:
      lang === "ar"
        ? `الملف الشخصي لـ ${name}`
        : `${name}'s Profile`,
  }
}

export default async function MemberProfilePage({
  params,
}: {
  params: Promise<{ lang: string; id: string }>
}) {
  const { lang: langParam, id } = await params
  const lang = langParam as Locale
  const [dictionary, member] = await Promise.all([
    getDictionary(lang),
    fetchMemberById(id),
  ])

  if (!member) notFound()

  return (
    <>
      <Header lang={lang} dictionary={dictionary} />
      <main className="min-h-screen pt-20">
        <div className="layout-container mx-auto max-w-3xl py-8">
          <ProfileHeader member={member} lang={lang} />
          <div className="mt-6">
            <ProfileTabs member={member} lang={lang} />
          </div>
        </div>
      </main>
      <Footer lang={lang} dictionary={dictionary} />
    </>
  )
}
