import { Header } from "@/components/template/header/header"
import { Footer } from "@/components/marketing/footer"
import { getDictionary } from "@/components/internationalization/dictionaries"
import type { Locale } from "@/components/internationalization/config"

interface VideoLayoutProps {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}

export default async function VideoLayout({ children, params }: VideoLayoutProps) {
  const { lang } = await params
  const dictionary = await getDictionary(lang as Locale)

  return (
    <>
      <Header lang={lang} dictionary={dictionary} />
      <main className="min-h-screen pt-20">
        {children}
      </main>
      <Footer lang={lang} dictionary={dictionary} />
    </>
  )
}
