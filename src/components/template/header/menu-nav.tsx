"use client"

import * as React from "react"
import Link, { LinkProps } from "next/link"
import { useRouter } from "next/navigation"

import { NAV_ITEMS } from "@/components/home/constants"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import type { Dictionary } from "@/components/internationalization/dictionaries"

interface MenuNavProps {
  lang: string
  dictionary: Dictionary
}

export function MenuNav({ lang, dictionary }: MenuNavProps) {
  const [open, setOpen] = React.useState(false)
  const isAr = lang === "ar"

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className="extend-touch-target h-8 touch-manipulation items-center justify-start gap-2.5 !p-0 hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 active:bg-transparent dark:hover:bg-transparent"
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
            <span className="sr-only">
              {dictionary.navigation.toggleMenu}
            </span>
          </div>
          <span className="flex h-8 items-center text-lg leading-none font-medium">
            {dictionary.navigation.menu}
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="bg-background/90 no-scrollbar h-(--radix-popper-available-height) w-(--radix-popper-available-width) overflow-y-auto rounded-none border-none p-0 shadow-none backdrop-blur duration-100 md:h-auto md:w-[30vw] md:min-w-[280px] md:max-w-[400px] md:rounded-md md:border md:shadow-md"
        align="end"
        side="bottom"
        alignOffset={-16}
        sideOffset={14}
      >
        <div className="flex flex-col gap-12 overflow-auto px-6 py-6">
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
      </PopoverContent>
    </Popover>
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
