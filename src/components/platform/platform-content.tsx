import {
  Users,
  LayoutDashboard,
  CalendarDays,
  FolderKanban,
  Wallet,
  MessageSquare,
  FileText,
  Shield,
} from "lucide-react";

const MODULES = [
  {
    icon: LayoutDashboard,
    titleAr: "لوحة التحكم",
    titleEn: "Dashboard",
    descAr: "نظرة شاملة على نشاطك وإشعاراتك ومهامك",
    descEn: "Overview of your activity, notifications, and tasks",
    color: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  },
  {
    icon: Users,
    titleAr: "إدارة العضوية",
    titleEn: "Membership",
    descAr: "التسجيل وإدارة الملف الشخصي والتحقق من حالة العضوية",
    descEn: "Registration, profile management, and membership status",
    color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  },
  {
    icon: FolderKanban,
    titleAr: "المشاريع",
    titleEn: "Projects",
    descAr: "إنشاء وإدارة المشاريع مع فرق العمل والمهام والتقارير",
    descEn: "Create and manage projects with teams, tasks, and reports",
    color: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
  },
  {
    icon: CalendarDays,
    titleAr: "الفعاليات",
    titleEn: "Events",
    descAr: "تنظيم وإدارة الفعاليات والورش والمؤتمرات والتسجيل فيها",
    descEn: "Organize and manage events, workshops, conferences, and registration",
    color: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  },
  {
    icon: Wallet,
    titleAr: "المالية",
    titleEn: "Finance",
    descAr: "إدارة الاشتراكات والمدفوعات والتقارير المالية",
    descEn: "Manage subscriptions, payments, and financial reports",
    color: "bg-rose-500/10 text-rose-600 dark:text-rose-400",
  },
  {
    icon: MessageSquare,
    titleAr: "النقاشات",
    titleEn: "Discussions",
    descAr: "منتدى للأعضاء لتبادل الخبرات والأفكار والمعرفة",
    descEn: "Forum for members to share experiences, ideas, and knowledge",
    color: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400",
  },
  {
    icon: FileText,
    titleAr: "التقارير",
    titleEn: "Reports",
    descAr: "إعداد وتصدير التقارير حول الأنشطة والأعضاء والمشاريع",
    descEn: "Generate and export reports on activities, members, and projects",
    color: "bg-orange-500/10 text-orange-600 dark:text-orange-400",
  },
  {
    icon: Shield,
    titleAr: "الإدارة",
    titleEn: "Administration",
    descAr: "أدوات إدارية للمسؤولين لإدارة الجمعية والصلاحيات",
    descEn: "Admin tools for managing the association and permissions",
    color: "bg-slate-500/10 text-slate-600 dark:text-slate-400",
  },
];

interface PlatformContentProps {
  lang: string;
}

export function PlatformContent({ lang }: PlatformContentProps) {
  const isAr = lang === "ar";

  return (
    <div className="space-y-16">
      {/* Hero */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center rounded-full border px-4 py-1.5 text-sm text-muted-foreground">
          {isAr ? "قريبًا" : "Coming Soon"}
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          {isAr ? "منصة الجمعية" : "Association Platform"}
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          {isAr
            ? "منصة رقمية متكاملة لإدارة شؤون الجمعية والأعضاء والمشاريع والفعاليات"
            : "A comprehensive digital platform for managing association affairs, members, projects, and events"}
        </p>
      </div>

      {/* Platform Preview */}
      <div className="rounded-xl border bg-card overflow-hidden">
        {/* Mock header bar */}
        <div className="flex items-center gap-3 border-b px-6 py-3 bg-muted/30">
          <div className="flex gap-1.5">
            <div className="h-3 w-3 rounded-full bg-red-400/60" />
            <div className="h-3 w-3 rounded-full bg-yellow-400/60" />
            <div className="h-3 w-3 rounded-full bg-green-400/60" />
          </div>
          <div className="flex-1 flex justify-center">
            <div className="rounded-md bg-muted px-4 py-1 text-xs text-muted-foreground">
              platform.spma.sd
            </div>
          </div>
        </div>

        {/* Mock platform layout */}
        <div className="flex min-h-[400px]">
          {/* Sidebar */}
          <div className="hidden md:flex w-56 flex-col gap-1 border-e bg-muted/20 p-4">
            {MODULES.slice(0, 6).map((mod, i) => {
              const Icon = mod.icon;
              return (
                <div
                  key={i}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm ${i === 0 ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground"}`}
                >
                  <Icon className="h-4 w-4" />
                  {isAr ? mod.titleAr : mod.titleEn}
                </div>
              );
            })}
          </div>

          {/* Content area */}
          <div className="flex-1 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="h-5 w-32 rounded bg-muted" />
                <div className="h-3 w-48 rounded bg-muted/60 mt-2" />
              </div>
              <div className="h-8 w-20 rounded-md bg-primary/20" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="rounded-lg border bg-muted/20 p-4 space-y-2">
                  <div className="h-3 w-16 rounded bg-muted" />
                  <div className="h-6 w-12 rounded bg-muted/80" />
                </div>
              ))}
            </div>
            <div className="h-40 rounded-lg border bg-muted/10 mt-4" />
          </div>
        </div>
      </div>

      {/* Modules Grid */}
      <div>
        <h2 className="text-2xl font-bold text-center mb-8">
          {isAr ? "وحدات المنصة" : "Platform Modules"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {MODULES.map((mod, i) => {
            const Icon = mod.icon;
            return (
              <div
                key={i}
                className="rounded-xl border bg-card p-6 space-y-3 transition-colors hover:border-primary/40"
              >
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${mod.color}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-semibold">
                  {isAr ? mod.titleAr : mod.titleEn}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {isAr ? mod.descAr : mod.descEn}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* CTA */}
      <div className="text-center rounded-xl bg-primary/5 border border-primary/10 p-12 space-y-4">
        <h2 className="text-2xl font-bold">
          {isAr ? "كن أول من يستخدم المنصة" : "Be the first to use the platform"}
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          {isAr
            ? "سجّل اهتمامك وسنبلغك فور إطلاق المنصة"
            : "Register your interest and we'll notify you when the platform launches"}
        </p>
        <a
          href="mailto:info@spma.sd"
          className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          {isAr ? "سجّل اهتمامك" : "Register Interest"}
        </a>
      </div>
    </div>
  );
}
