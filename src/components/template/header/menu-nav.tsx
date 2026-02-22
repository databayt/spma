"use client"

import * as React from "react"
import { createPortal } from "react-dom"
import Link, { LinkProps } from "next/link"
import { useRouter } from "next/navigation"

import { NAV_ITEMS } from "@/components/home/constants"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import type { Dictionary } from "@/components/internationalization/dictionaries"

interface MenuNavProps {
  lang: string
  dictionary: Dictionary
}

export function MenuNav({ lang, dictionary }: MenuNavProps) {
  const [open, setOpen] = React.useState(false)
  const isAr = lang === "ar"

  // Close on Escape
  React.useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [open])

  return (
    <>
      <Button
        variant="ghost"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="extend-touch-target h-8 touch-manipulation items-center justify-start gap-2.5 !p-0 hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 active:bg-transparent dark:hover:bg-transparent"
      >
        <div className="relative flex h-8 w-5 items-center justify-center">
          <div className="relative w-5 h-5">
            <span
              className={cn(
                "bg-foreground absolute left-0 block h-0.5 w-5 transition-all duration-100",
                open ? "top-[0.5rem] -rotate-45" : "top-1"
              )}
            />
            <span
              className={cn(
                "bg-foreground absolute left-0 block h-0.5 w-5 transition-all duration-100",
                open ? "top-[0.5rem] rotate-45" : "top-3"
              )}
            />
          </div>
          <span className="sr-only">
            {dictionary.navigation.toggleMenu}
          </span>
        </div>
        <span className="flex h-8 items-center text-lg leading-none font-medium lg:hidden">
          {dictionary.navigation.menu}
        </span>
      </Button>

      {open &&
        createPortal(
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 top-[56px] z-40"
              onClick={() => setOpen(false)}
            />
            {/* Side panel */}
            <div
              role="dialog"
              className="bg-background/90 no-scrollbar fixed top-[56px] right-0 bottom-0 z-50 w-[30vw] min-w-[280px] overflow-y-auto border-l p-0 shadow-xl backdrop-blur"
            >
              <div className="flex flex-col gap-12 overflow-auto px-6 py-6 lg:px-12 lg:py-10">
                <div className="flex flex-col gap-4">
                  <div className="text-muted-foreground text-sm font-medium">
                    {dictionary.navigation.menu}
                  </div>
                  <div className="flex flex-col gap-3">
                    <MenuLink href={`/${lang}`} onOpenChange={setOpen}>
                      {isAr
                        ? dictionary.marketing.footer.links.home
                        : dictionary.marketing.footer.links.home}
                    </MenuLink>
                    {NAV_ITEMS.map((item) => (
                      <MenuLink
                        key={item.href}
                        href={`/${lang}${item.href}`}
                        onOpenChange={setOpen}
                      >
                        {isAr ? item.title : item.titleEn}
                      </MenuLink>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </>,
          document.body
        )}
    </>
  )
}

function MenuLink({
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
