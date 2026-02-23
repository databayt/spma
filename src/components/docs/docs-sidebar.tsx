"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const DOCS_LINKS = [
  { key: "introduction", href: "/docs", fallback: "Introduction" },
  { key: "membership", href: "/docs/membership", fallback: "Membership Guide" },
  { key: "standards", href: "/docs/standards", fallback: "PM Standards" },
  { key: "certifications", href: "/docs/certifications", fallback: "Certifications" },
  { key: "governance", href: "/docs/governance", fallback: "Governance & Bylaws" },
  { key: "events", href: "/docs/events", fallback: "Events & Programs" },
  { key: "resources", href: "/docs/resources", fallback: "Resources & Library" },
] as const

interface DocsSidebarProps {
  dictionary?: {
    docs?: {
      sidebar?: Record<string, string>
    }
  }
  lang?: string
}

export function DocsSidebar({
  dictionary,
  lang,
  ...props
}: DocsSidebarProps & React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()
  const prefix = lang ? `/${lang}` : ""

  return (
    <Sidebar
      className="sticky top-20 z-30 hidden h-[calc(100svh-5rem)] overscroll-none bg-transparent lg:flex"
      collapsible="none"
      {...props}
    >
      <SidebarContent className="no-scrollbar overflow-x-hidden">
        <div className="pb-4 pt-2 ps-0">
          <SidebarGroup className="p-0">
            <SidebarGroupContent>
              <SidebarMenu>
                {DOCS_LINKS.map(({ key, href, fallback }) => {
                  const fullHref = `${prefix}${href}`
                  const isActive = pathname === fullHref || pathname === href
                  const name =
                    dictionary?.docs?.sidebar?.[key] || fallback

                  return (
                    <SidebarMenuItem key={href}>
                      <SidebarMenuButton
                        asChild
                        isActive={isActive}
                        className="relative h-[30px] w-full border border-transparent text-[0.8rem] font-medium p-0 hover:bg-transparent data-[active=true]:bg-transparent data-[active=true]:font-semibold"
                      >
                        <Link href={fullHref} className="block w-full">
                          {name}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </div>
      </SidebarContent>
    </Sidebar>
  )
}
