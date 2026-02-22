"use client"

import { GenericCommandMenu } from "@/components/atom/generic-command-menu"
import { spmaSearchConfig } from "@/components/atom/generic-command-menu/spma-config"

import { LanguageToggle } from "./language-toggle"
import { ModeSwitcher } from "./mode-switcher"

export function RightActions() {
  return (
    <div className="flex items-center gap-4">
      <GenericCommandMenu config={spmaSearchConfig} variant="icon" />
      <LanguageToggle />
      <ModeSwitcher />
    </div>
  )
}
