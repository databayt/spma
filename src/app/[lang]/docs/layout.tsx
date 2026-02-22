import { docsSource } from "@/lib/source"
import { DocsSidebar } from "@/components/docs/docs-sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"
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
    <div className="layout-container mx-auto flex flex-1 flex-col">
      <SidebarProvider className="min-h-min flex-1 items-start lg:grid lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-6">
        <DocsSidebar
          dictionary={dictionary}
          lang={lang}
        />
        <div className="h-full w-full">{children}</div>
      </SidebarProvider>
    </div>
  )
}
