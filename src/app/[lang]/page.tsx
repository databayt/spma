import type { Metadata } from "next";
import { getDictionary } from "@/components/internationalization/dictionaries";
import type { Locale } from "@/components/internationalization/config";
import { Content } from "@/components/home/content";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const isAr = lang === "ar";
  return {
    title: isAr
      ? "الجمعية السودانية لإدارة المشاريع"
      : "Sudanese Project Management Association",
    description: isAr
      ? "انطلاقاً من أساس راسخ من الحضارة والمشاريع، نحن مصممون على جعل السودان مكاناً أفضل"
      : "Building on a solid foundation of civilization and projects, we are determined to make Sudan a better place",
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: langParam } = await params;
  const lang = langParam as Locale;
  const dictionary = await getDictionary(lang);

  return <Content lang={lang} dictionary={dictionary} />;
}
