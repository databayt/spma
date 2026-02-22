import type { Metadata } from "next";
import { getDictionary } from "@/components/internationalization/dictionaries";
import type { Locale } from "@/components/internationalization/config";
import { Header } from "@/components/template/header/header";
import { Footer } from "@/components/template/footer/footer";
import AllBooksContent from "@/components/library/book-list/all-books-content";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  return {
    title: lang === "ar" ? "جميع الكتب" : "All Books",
    description: lang === "ar"
      ? "تصفح جميع الكتب في المكتبة الإلكترونية"
      : "Browse all books in the electronic library",
  };
}

export default async function AllBooksPage({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ page?: string; search?: string; genre?: string }>;
}) {
  const [{ lang: langParam }, resolvedSearchParams] = await Promise.all([
    params,
    searchParams,
  ]);
  const lang = langParam as Locale;
  const dictionary = await getDictionary(lang);

  return (
    <>
      <Header lang={lang} dictionary={dictionary} />
      <main className="min-h-screen pt-20">
        <div className="layout-container max-w-7xl mx-auto py-12">
          <AllBooksContent
            searchParams={resolvedSearchParams}
            dictionary={dictionary}
          />
        </div>
      </main>
      <Footer lang={lang} dictionary={dictionary} />
    </>
  );
}
