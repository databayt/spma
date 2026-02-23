import { docsSource } from "@/lib/source"
import { DocsSidebar } from "@/components/docs/docs-sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"
import { Header } from "@/components/template/header/header"
import { Footer } from "@/components/marketing/footer"
import { getDictionary } from "@/components/internationalization/dictionaries"
import type { Locale } from "@/components/internationalization/config"

interface DocsLayoutProps {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}

export default async function DocsLayout({ children, params }: DocsLayoutProps) {
  const { lang } = await params
  const dictionary = await getDictionary(lang as Locale)

  return (
    <>
      <Header lang={lang} dictionary={dictionary} />
      <div className="layout-container mx-auto flex flex-1 flex-col px-6 pt-14 md:px-16 lg:px-24 xl:px-32">
        <SidebarProvider className="min-h-min flex-1 items-start [--sidebar-width:220px] [--top-spacing:0] lg:[--sidebar-width:240px] lg:[--top-spacing:calc(var(--spacing)*2)] lg:grid lg:grid-cols-[var(--sidebar-width)_minmax(0,1fr)] lg:gap-6">
          <DocsSidebar
            dictionary={dictionary}
            lang={lang}
          />
          <div className="h-full w-full">{children}</div>
        </SidebarProvider>
      </div>
      <Footer lang={lang} dictionary={dictionary} />
    </>
  )
}
