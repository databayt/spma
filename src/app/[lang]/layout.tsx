import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Rubik } from "next/font/google";
import { getDir, type Locale, i18n } from "@/components/internationalization/config";
import { ThemeProvider } from "@/components/atom/theme-provider";
import { DirectionProvider } from "@/components/ui/direction";
import { ChatbotContent } from "@/components/chatbot/content";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  icons: { icon: "/logo.webp", apple: "/logo.webp" },
  title: {
    default: "الجمعية السودانية لإدارة المشاريع | SPMA",
    template: "%s | SPMA",
  },
  description:
    "جمعية مهنية طوعية غير ربحية تعمل على نشر ثقافة إدارة المشاريع في السودان | A voluntary nonprofit professional association dedicated to spreading project management culture in Sudan",
  keywords: [
    "SPMA",
    "إدارة المشاريع",
    "السودان",
    "Project Management",
    "Sudan",
    "PMP",
    "PMI",
  ],
  openGraph: {
    type: "website",
    locale: "ar_SD",
    alternateLocale: "en_US",
    siteName: "SPMA - الجمعية السودانية لإدارة المشاريع",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export function generateStaticParams() {
  return i18n.locales.map((lang) => ({ lang }));
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang: langParam } = await params;
  const lang = langParam as Locale;
  const dir = getDir(lang);

  return (
    <html lang={lang} dir={dir} suppressHydrationWarning>
      <body
        className={`${rubik.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <DirectionProvider dir={dir}>
          <ThemeProvider>
            {children}
            <ChatbotContent />
          </ThemeProvider>
        </DirectionProvider>
      </body>
    </html>
  );
}
