"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo } from "react";
import { motion } from "framer-motion";
import { GenericCommandMenu } from "@/components/atom/generic-command-menu";
import { getSpmaSearchConfig } from "@/components/atom/generic-command-menu/spma-config";
import { LanguageToggle } from "@/components/template/site-header/language-toggle";
import { ModeSwitcher } from "@/components/template/site-header/mode-switcher";
import { MenuNav } from "./menu-nav";
import type { Dictionary } from "@/components/internationalization/dictionaries";

const easeOut: [number, number, number, number] = [0.33, 1, 0.68, 1];

// LTR: logo starts at viewport center, slides to left
const logoVariantsLTR = {
  hidden: { x: "calc(50vw - 50% - 1rem)" },
  visible: {
    x: 0,
    transition: { duration: 0.8, ease: easeOut, delay: 1.8 },
  },
};

// RTL: logo starts at viewport center, slides to right
const logoVariantsRTL = {
  hidden: { x: "calc(-50vw + 50% + 1rem)" },
  visible: {
    x: 0,
    transition: { duration: 0.8, ease: easeOut, delay: 1.8 },
  },
};

// LTR: actions slide in from right
const actionsVariantsLTR = {
  hidden: { x: 100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: easeOut, delay: 2.0 },
  },
};

// RTL: actions slide in from left
const actionsVariantsRTL = {
  hidden: { x: -100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: easeOut, delay: 2.0 },
  },
};

interface HeaderProps {
  lang: string;
  dictionary: Dictionary;
}

export function Header({ lang, dictionary }: HeaderProps) {
  const isAr = lang === "ar";
  const logoVariants = isAr ? logoVariantsRTL : logoVariantsLTR;
  const actionsVariants = isAr ? actionsVariantsRTL : actionsVariantsLTR;

  const searchConfig = useMemo(
    () => getSpmaSearchConfig(lang, (dictionary as any).commandMenu),
    [lang, dictionary]
  );

  return (
    <header className="relative z-50 overflow-hidden bg-background">
      <nav className="layout-container py-3 flex items-center justify-between">
        <motion.div variants={logoVariants} initial="hidden" animate="visible">
          <Link href={`/${lang}`} className="flex items-center gap-2.5 ms-20">
            <Image
              src="/logo.webp"
              alt="SPMA"
              width={32}
              height={32}
              className="rounded-full"
            />
            <span className="hidden sm:block font-bold text-primary text-xl">
              SPMA
            </span>
          </Link>
        </motion.div>

        <motion.div
          className="flex items-center gap-5 me-20"
          variants={actionsVariants}
          initial="hidden"
          animate="visible"
        >
          <GenericCommandMenu config={searchConfig} variant="icon" />
          <LanguageToggle />
          <ModeSwitcher />
          <MenuNav lang={lang} dictionary={dictionary} />
        </motion.div>
      </nav>
    </header>
  );
}
