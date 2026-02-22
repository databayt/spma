import type { Metadata } from "next";
import { getDictionary } from "@/components/internationalization/dictionaries";
import type { Locale } from "@/components/internationalization/config";
import { Header } from "@/components/template/header/header";
import { Footer } from "@/components/template/footer/footer";
import { OnboardingWizard } from "@/components/member/onboarding/onboarding-wizard";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  return {
    title: lang === "ar" ? "انضم إلينا" : "Join Us",
    description: lang === "ar"
      ? "تقدم بطلب الانضمام إلى الجمعية السودانية لإدارة المشاريع"
      : "Apply to join the Sudanese Project Management Association",
  };
}

export default async function JoinPage({
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
          <OnboardingWizard lang={lang} />
        </div>
      </main>
      <Footer lang={lang} dictionary={dictionary} />
    </>
  );
}
