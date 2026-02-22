import React from "react"
import SiteHeaderClient from "./client"
import type { Dictionary } from "@/components/internationalization"

interface SiteHeaderProps {
  dictionary: Dictionary
}

export default function SiteHeader({ dictionary }: SiteHeaderProps) {
  return <SiteHeaderClient dictionary={dictionary} />
}
