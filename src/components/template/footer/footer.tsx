"use client";

import Link from "next/link";
import Image from "next/image";
import { Facebook, Linkedin, Twitter, Youtube } from "lucide-react";
import { NAV_ITEMS, SOCIAL_LINKS } from "@/components/home/constants";
import type { Dictionary } from "@/components/internationalization/dictionaries";

const socialIcons: Record<string, React.ElementType> = {
  facebook: Facebook,
  linkedin: Linkedin,
  twitter: Twitter,
  youtube: Youtube,
};

interface FooterProps {
  lang: string;
  dictionary: Dictionary;
}

export function Footer({ lang, dictionary }: FooterProps) {
  const isAr = lang === "ar";

  return (
    <footer className="bg-[oklch(0.145_0_0)] text-[oklch(0.97_0_0)]">
      <div className="layout-container max-w-7xl mx-auto py-16 md:py-20">
        <div className="flex flex-col md:flex-row gap-12 md:gap-10">
          {/* Logo & Description */}
          <div className="md:w-1/4 -mt-4 md:-mt-6">
            <Link href={`/${lang}`} className="inline-block mb-5">
              <Image
                src="/logo.webp"
                alt="SPMA"
                width={64}
                height={64}
                className="rounded-full"
              />
            </Link>
            <p className="text-sm text-white/70 leading-relaxed max-w-[280px]">
              {dictionary.footer.description}
            </p>
          </div>

          {/* Links Grid */}
          <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-10 md:gap-8">
            {/* Quick Links */}
            <div>
              <h3 className="font-semibold text-white mb-5">
                {dictionary.footer.quickLinks}
              </h3>
              <ul className="space-y-3">
                {NAV_ITEMS.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={`/${lang}${item.href === "/" ? "" : item.href}`}
                      className="text-sm text-white/70 hover:text-white transition-colors"
                    >
                      {isAr ? item.title : item.titleEn}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="font-semibold text-white mb-5">
                {dictionary.footer.resources}
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link href={`/${lang}/library`} className="text-sm text-white/70 hover:text-white transition-colors">
                    {dictionary.footer?.library ?? (isAr ? "المكتبة" : "Library")}
                  </Link>
                </li>
                <li>
                  <Link href={`/${lang}/knowledge`} className="text-sm text-white/70 hover:text-white transition-colors">
                    {dictionary.footer?.knowledge ?? (isAr ? "المعرفة" : "Knowledge")}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-semibold text-white mb-5">
                {dictionary.footer.contact}
              </h3>
              <ul className="space-y-3">
                <li className="text-sm text-white/70">
                  {dictionary.footer.phone}
                </li>
                <li className="text-sm text-white/70">
                  {dictionary.footer.email}
                </li>
              </ul>
            </div>
          </div>

          {/* Newsletter */}
          <div className="md:w-1/4">
            <h3 className="font-semibold text-white mb-5">
              {dictionary.footer.newsletter.title}
            </h3>
            <p className="text-sm text-white/60 mb-4">
              {dictionary.footer.newsletter.description}
            </p>
            <form
              className="relative inline-flex items-center mb-6 w-full"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder={dictionary.footer.newsletter.placeholder}
                className="h-12 w-full ps-4 pe-24 rounded-full border border-white/30 bg-white/10 text-white placeholder:text-white/50 text-sm focus:outline-none focus:ring-2 focus:ring-white/40"
              />
              <button
                type="submit"
                className="absolute end-1.5 bg-accent hover:bg-accent/90 text-accent-foreground font-medium h-9 px-4 rounded-full text-sm transition-colors"
              >
                {dictionary.footer.newsletter.button}
              </button>
            </form>

            {/* Social Icons */}
            <div className="flex items-center gap-4">
              {SOCIAL_LINKS.map((link) => {
                const Icon = socialIcons[link.icon];
                if (!Icon) return null;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-transform hover:scale-110"
                    aria-label={link.label}
                  >
                    <Icon className="h-6 w-6 text-white/70 hover:text-white transition-colors" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/10">
        <div className="layout-container max-w-7xl mx-auto py-6">
          <p className="text-start text-white/50 text-sm">
            &copy; {new Date().getFullYear()} {dictionary.common.appNameShort}.{" "}
            {dictionary.footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
