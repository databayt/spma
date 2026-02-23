import type { Metadata } from "next";
import { getDictionary } from "@/components/internationalization/dictionaries";
import type { Locale } from "@/components/internationalization/config";
import { Header } from "@/components/template/header/header";
import { Footer } from "@/components/marketing/footer";
import LibraryAdminBooksNewContent from "@/components/library/admin/books/new-content";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  return {
    title: lang === "ar" ? "إضافة كتاب جديد" : "Add New Book",
  };
}

export default async function NewBookPage({
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
          <LibraryAdminBooksNewContent dictionary={dictionary} lang={lang} />
        </div>
      </main>
      <Footer lang={lang} dictionary={dictionary} />
    </>
  );
}
