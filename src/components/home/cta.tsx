"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { fadeIn } from "@/lib/animations";
import type { Dictionary } from "@/components/internationalization/dictionaries";

interface CTAProps {
  lang: string;
  dictionary: Dictionary;
}

export function CTA({ lang, dictionary }: CTAProps) {
  return (
    <section className="py-16 md:py-24 bg-primary">
      <motion.div
        className="layout-container max-w-7xl mx-auto text-center space-y-6"
        variants={fadeIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground">
          {dictionary.cta.title}
        </h2>
        <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
          {dictionary.cta.subtitle}
        </p>
        <Link
          href={`/${lang}/members`}
          className="inline-flex items-center justify-center h-12 px-8 bg-accent text-accent-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity text-lg"
        >
          {dictionary.cta.button}
        </Link>
      </motion.div>
    </section>
  );
}
