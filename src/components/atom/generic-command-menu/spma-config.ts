import {
  BookOpen,
  Bot,
  Calendar,
  FileText,
  Home,
  Info,
  Library,
  Lightbulb,
  UserPlus,
  Users,
  Video,
} from "lucide-react"

import type { SearchConfig } from "./types"

interface CommandMenuTranslations {
  home?: string
  about?: string
  events?: string
  publications?: string
  library?: string
  knowledge?: string
  articles?: string
  videos?: string
  members?: string
  join?: string
  docs?: string
  chatbot?: string
  search?: string
  noResults?: string
  light?: string
  dark?: string
  system?: string
}

export function getSpmaSearchConfig(
  locale: string,
  translations?: CommandMenuTranslations
): SearchConfig {
  const t = translations ?? {}
  const langPrefix = `/${locale}`

  return {
    navigation: [
      {
        id: "home",
        title: t.home ?? "Home",
        type: "navigation",
        href: `${langPrefix}`,
        icon: Home,
        keywords: ["main", "landing", "homepage", "الرئيسية"],
        breadcrumb: ["SPMA"],
      },
      {
        id: "about",
        title: t.about ?? "About",
        type: "navigation",
        href: `${langPrefix}/about`,
        icon: Info,
        keywords: ["about", "organization", "mission", "vision", "من نحن"],
        breadcrumb: ["SPMA"],
      },
      {
        id: "events",
        title: t.events ?? "Events",
        type: "navigation",
        href: `${langPrefix}/events`,
        icon: Calendar,
        keywords: ["events", "activities", "schedule", "calendar", "الفعاليات"],
        breadcrumb: ["SPMA"],
      },
      {
        id: "publications",
        title: t.publications ?? "Publications",
        type: "navigation",
        href: `${langPrefix}/publications`,
        icon: FileText,
        keywords: ["publications", "papers", "research", "journal", "المنشورات"],
        breadcrumb: ["SPMA"],
      },
      {
        id: "library",
        title: t.library ?? "Library",
        type: "navigation",
        href: `${langPrefix}/library`,
        icon: Library,
        keywords: ["library", "books", "resources", "references", "المكتبة"],
        breadcrumb: ["SPMA"],
      },
      {
        id: "knowledge",
        title: t.knowledge ?? "Knowledge",
        type: "navigation",
        href: `${langPrefix}/knowledge`,
        icon: Lightbulb,
        keywords: ["knowledge", "learning", "education", "wiki", "المعرفة"],
        breadcrumb: ["SPMA"],
      },
      {
        id: "articles",
        title: t.articles ?? "Articles",
        type: "navigation",
        href: `${langPrefix}/article`,
        icon: BookOpen,
        keywords: ["articles", "blog", "posts", "writing", "المقالات"],
        breadcrumb: ["SPMA", t.knowledge ?? "Knowledge"],
      },
      {
        id: "videos",
        title: t.videos ?? "Videos",
        type: "navigation",
        href: `${langPrefix}/video`,
        icon: Video,
        keywords: ["videos", "media", "watch", "stream", "الفيديوهات"],
        breadcrumb: ["SPMA", t.knowledge ?? "Knowledge"],
      },
      {
        id: "members",
        title: t.members ?? "Members",
        type: "navigation",
        href: `${langPrefix}/members`,
        icon: Users,
        keywords: ["members", "team", "people", "directory", "الأعضاء"],
        breadcrumb: ["SPMA"],
      },
      {
        id: "join",
        title: t.join ?? "Join",
        type: "navigation",
        href: `${langPrefix}/members/join`,
        icon: UserPlus,
        keywords: ["join", "register", "signup", "membership", "apply", "الانضمام"],
        breadcrumb: ["SPMA", t.members ?? "Members"],
      },
      {
        id: "docs",
        title: t.docs ?? "Docs",
        type: "navigation",
        href: `${langPrefix}/docs`,
        icon: FileText,
        keywords: ["documentation", "docs", "guide", "help", "التوثيق"],
        breadcrumb: ["SPMA"],
      },
      {
        id: "chatbot",
        title: t.chatbot ?? "Chatbot",
        type: "navigation",
        href: `${langPrefix}/chatbot`,
        icon: Bot,
        keywords: ["chatbot", "ai", "assistant", "chat", "help", "المساعد"],
        breadcrumb: ["SPMA"],
      },
    ],
    actions: [],
    settings: [],
    showRecent: true,
    maxRecent: 5,
    placeholder: t.search,
    emptyMessage: t.noResults,
  }
}

// Keep backward-compatible export for any remaining static usage
export const spmaSearchConfig: SearchConfig = getSpmaSearchConfig("ar")
