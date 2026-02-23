"use client"

import * as React from "react"
import { createPortal } from "react-dom"
import Link, { LinkProps } from "next/link"
import { useRouter } from "next/navigation"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import type { Dictionary } from "@/components/internationalization/dictionaries"

interface MenuNavProps {
  lang: string
  dictionary: Dictionary
}

export function MenuNav({ lang, dictionary }: MenuNavProps) {
  const [open, setOpen] = React.useState(false)
  const btnRef = React.useRef<HTMLButtonElement>(null)
  const [btnPos, setBtnPos] = React.useState({ top: 0, left: 0 })
  const isAr = lang === "ar"

  // Capture button position before opening panel
  const handleToggle = React.useCallback(() => {
    if (!open && btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect()
      setBtnPos({ top: rect.top, left: rect.left })
    }
    setOpen((v) => !v)
  }, [open])

  // Close on Escape or scroll
  React.useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }
    const onScroll = () => setOpen(false)
    document.addEventListener("keydown", onKey)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      document.removeEventListener("keydown", onKey)
      window.removeEventListener("scroll", onScroll)
    }
  }, [open])

  return (
    <>
      <Button
        ref={btnRef}
        variant="ghost"
        onClick={handleToggle}
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
              className="fixed inset-0 z-40"
              onClick={() => setOpen(false)}
            />
            {/* Close button at exact same position as header hamburger */}
            <button
              onClick={() => setOpen(false)}
              aria-label={dictionary.navigation.toggleMenu}
              className="fixed z-[70] flex h-8 w-5 items-center justify-center"
              style={{ top: btnPos.top, left: btnPos.left }}
            >
              <div className="relative w-5 h-5">
                <span className="bg-foreground absolute left-0 top-[0.5rem] block h-0.5 w-5 -rotate-45 transition-all duration-100" />
                <span className="bg-foreground absolute left-0 top-[0.5rem] block h-0.5 w-5 rotate-45 transition-all duration-100" />
              </div>
            </button>
            {/* Side panel */}
            <div
              role="dialog"
              className="bg-background/90 no-scrollbar fixed inset-y-0 right-0 z-[60] w-[30vw] min-w-[280px] overflow-y-auto border-l p-0 shadow-xl backdrop-blur"
            >
              <div className="flex flex-col gap-12 overflow-auto px-6 pt-20 pb-6 lg:px-12 lg:pt-24 lg:pb-10">
                <div className="flex flex-col gap-4">
                  <div className="text-muted-foreground text-sm font-medium">
                    {dictionary.navigation.menu}
                  </div>
                  <div className="flex flex-col gap-3">
                    <MenuLink href={`/${lang}`} onOpenChange={setOpen}>
                      {isAr ? "الرئيسية" : "Home"}
                    </MenuLink>
                    <MenuLink href={`/${lang}/about`} onOpenChange={setOpen}>
                      {isAr ? "من نحن" : "About"}
                    </MenuLink>
                    <MenuLink href={`/${lang}/publications`} onOpenChange={setOpen}>
                      {isAr ? "المنشورات" : "Publications"}
                    </MenuLink>
                    <MenuLink href={`/${lang}/library`} onOpenChange={setOpen}>
                      {isAr ? "المكتبة" : "Library"}
                    </MenuLink>
                    <MenuLink href={`/${lang}/video`} onOpenChange={setOpen}>
                      {isAr ? "الفيديوهات" : "Videos"}
                    </MenuLink>
                    <MenuLink href={`/${lang}/article`} onOpenChange={setOpen}>
                      {isAr ? "المقالات" : "Articles"}
                    </MenuLink>
                    <MenuLink href={`/${lang}/docs`} onOpenChange={setOpen}>
                      {isAr ? "التوثيق" : "Documentation"}
                    </MenuLink>
                    <MenuLink href={`/${lang}/events`} onOpenChange={setOpen}>
                      {isAr ? "الأحداث" : "Events"}
                    </MenuLink>
                    <MenuLink href={`/${lang}/members`} onOpenChange={setOpen}>
                      {isAr ? "الأعضاء" : "Members"}
                    </MenuLink>
                    <MenuLink href={`/${lang}/community`} onOpenChange={setOpen}>
                      {isAr ? "المجتمع" : "Community"}
                    </MenuLink>
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
