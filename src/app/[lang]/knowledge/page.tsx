import type { Metadata } from "next";
import { getDictionary } from "@/components/internationalization/dictionaries";
import type { Locale } from "@/components/internationalization/config";
import { Header } from "@/components/template/header/header";
import { Footer } from "@/components/template/footer/footer";
import { KnowledgeContent } from "@/components/knowledge/knowledge-content";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  return {
    title: lang === "ar" ? "المعرفة" : "Knowledge Hub",
    description: lang === "ar"
      ? "فيديوهات ومقالات وبودكاست تجربتي في إدارة المشاريع"
      : "Videos, articles, and Tajribati Podcast on project management",
  };
}

export default async function KnowledgePage({
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
          <KnowledgeContent lang={lang} dictionary={dictionary} />
        </div>
      </main>
      <Footer lang={lang} dictionary={dictionary} />
    </>
  );
}
