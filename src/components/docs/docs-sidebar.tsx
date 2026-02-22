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
      className="sticky top-0 z-30 hidden h-[calc(100svh-4rem)] overscroll-none bg-transparent lg:flex"
      collapsible="none"
      {...props}
    >
      <SidebarContent className="no-scrollbar overflow-x-hidden">
        <div className="pb-4 pt-6 ps-0">
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
                        className="relative h-[30px] w-full border border-transparent text-[0.8rem] font-medium p-0"
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
