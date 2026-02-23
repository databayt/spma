"use client"

import { useMemo } from "react"
import { GenericCommandMenu } from "@/components/atom/generic-command-menu"
import { getSpmaSearchConfig } from "@/components/atom/generic-command-menu/spma-config"
import { useTranslations } from "@/lib/use-translations"

import { LanguageToggle } from "./language-toggle"
import { ModeSwitcher } from "./mode-switcher"

export function RightActions() {
  const { t, locale } = useTranslations()

  const searchConfig = useMemo(
    () => getSpmaSearchConfig(locale, (t as any).commandMenu),
    [locale, t]
  )

  return (
    <div className="flex items-center gap-4">
      <GenericCommandMenu config={searchConfig} variant="icon" />
      <LanguageToggle />
      <ModeSwitcher />
    </div>
  )
}
