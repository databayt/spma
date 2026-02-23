import type { Metadata } from "next";
import { getDictionary } from "@/components/internationalization/dictionaries";
import type { Locale } from "@/components/internationalization/config";
import { Header } from "@/components/template/header/header";
import { Footer } from "@/components/marketing/footer";
import { PlatformContent } from "@/components/platform/platform-content";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  return {
    title: lang === "ar" ? "المنصة" : "Platform",
    description: lang === "ar"
      ? "منصة الجمعية السودانية لإدارة المشاريع - إدارة العضوية والمشاريع والفعاليات"
      : "SPMA Platform - Membership, project, and event management",
  };
}

export default async function PlatformPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: langParam } = await params;
  const lang = langParam as Locale;
  const dictionary = await getDictionary(lang);

  return (
    <>
      <Header lang={lang} dictionary={dictionary} />
      <main className="min-h-screen pt-20">
        <div className="layout-container max-w-7xl mx-auto py-12">
          <PlatformContent lang={lang} />
        </div>
      </main>
      <Footer lang={lang} dictionary={dictionary} />
    </>
  );
}
