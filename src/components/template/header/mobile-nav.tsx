"use client"

import * as React from "react"
import Link, { LinkProps } from "next/link"
import { useRouter } from "next/navigation"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { LanguageToggle } from "@/components/template/site-header/language-toggle"
import { ModeSwitcher } from "@/components/template/site-header/mode-switcher"

interface MobileNavProps {
  lang: string
  className?: string
}

export function MobileNav({ lang, className }: MobileNavProps) {
  const [open, setOpen] = React.useState(false)
  const isAr = lang === "ar"

  const navItems = React.useMemo(
    () => [
      { href: `/${lang}`, label: isAr ? "الرئيسية" : "Home" },
      { href: `/${lang}/about`, label: isAr ? "من نحن" : "About" },
      { href: `/${lang}/publications`, label: isAr ? "المنشورات" : "Publications" },
      { href: `/${lang}/library`, label: isAr ? "المكتبة" : "Library" },
      { href: `/${lang}/video`, label: isAr ? "الفيديوهات" : "Videos" },
      { href: `/${lang}/article`, label: isAr ? "المقالات" : "Articles" },
      { href: `/${lang}/docs`, label: isAr ? "التوثيق" : "Documentation" },
      { href: `/${lang}/events`, label: isAr ? "الأحداث" : "Events" },
      { href: `/${lang}/members`, label: isAr ? "الأعضاء" : "Members" },
      { href: `/${lang}/community`, label: isAr ? "المجتمع" : "Community" },
    ],
    [lang, isAr]
  )

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            "extend-touch-target h-8 touch-manipulation items-center justify-start gap-2.5 !p-0 hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 active:bg-transparent dark:hover:bg-transparent",
            className
          )}
        >
          <div className="relative flex h-8 w-4 items-center justify-center">
            <div className="relative size-4">
              <span
                className={cn(
                  "bg-foreground absolute left-0 block h-0.5 w-4 transition-all duration-100",
                  open ? "top-[0.4rem] -rotate-45" : "top-1"
                )}
              />
              <span
                className={cn(
                  "bg-foreground absolute left-0 block h-0.5 w-4 transition-all duration-100",
                  open ? "top-[0.4rem] rotate-45" : "top-2.5"
                )}
              />
            </div>
            <span className="sr-only">Toggle Menu</span>
          </div>
          <span className="flex h-8 items-center text-lg leading-none font-medium">
            {isAr ? "القائمة" : "Menu"}
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="bg-background/90 no-scrollbar h-(--radix-popper-available-height) w-(--radix-popper-available-width) overflow-y-auto rounded-none border-none p-0 shadow-none backdrop-blur duration-100"
        align="start"
        side="bottom"
        alignOffset={-16}
        sideOffset={14}
      >
        <div className="flex flex-col gap-12 overflow-auto px-6 py-6">
          <div className="flex flex-col gap-4">
            <div className="text-muted-foreground text-sm font-medium">
              {isAr ? "القائمة" : "Menu"}
            </div>
            <div className="flex flex-col gap-3">
              {navItems.map((item, index) => (
                <MobileLink key={index} href={item.href} onOpenChange={setOpen}>
                  {item.label}
                </MobileLink>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="text-muted-foreground text-sm font-medium">
              {isAr ? "الإعدادات" : "Settings"}
            </div>
            <div className="flex items-center gap-2">
              <LanguageToggle />
              <ModeSwitcher />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

function MobileLink({
  href,
  onOpenChange,
  className,
  children,
  ...props
}: LinkProps & {
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
  className?: string
}) {
  const router = useRouter()
  return (
    <Link
      href={href}
      onClick={() => {
        router.push(href.toString())
        onOpenChange?.(false)
      }}
      className={cn("text-2xl font-medium", className)}
      {...props}
    >
      {children}
    </Link>
  )
}
