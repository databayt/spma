"use client"

import { MobileNav } from "./mobile-nav"

interface MobileHeaderProps {
  lang: string
}

export default function MobileHeader({ lang }: MobileHeaderProps) {
  return (
    <header className="bg-background sticky top-0 z-50 w-full md:hidden">
      <div className="layout-container flex h-14 items-center">
        <MobileNav lang={lang} />
      </div>
    </header>
  )
}
