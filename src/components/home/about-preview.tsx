"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { fadeIn, slideInLeft, slideInRight } from "@/lib/animations";
import type { Dictionary } from "@/components/internationalization/dictionaries";

interface AboutPreviewProps {
  lang: string;
  dictionary: Dictionary;
}

export function AboutPreview({ lang, dictionary }: AboutPreviewProps) {
  const isAr = lang === "ar";

  return (
    <section className="py-16 md:py-24 bg-muted/50">
      <div className="layout-container max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            className="space-y-6"
            variants={isAr ? slideInRight : slideInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary">
              {dictionary.about.whoWeAre}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {dictionary.about.whoWeAreText}
            </p>
            <blockquote className="border-s-4 border-accent ps-4 italic text-foreground/80">
              {dictionary.about.visionText}
            </blockquote>
            <Link
              href={`/${lang}/about`}
              className="inline-flex items-center gap-2 text-primary font-semibold hover:text-accent transition-colors"
            >
              {dictionary.common.readMore} &larr;
            </Link>
          </motion.div>

          <motion.div
            variants={isAr ? slideInLeft : slideInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="/facebook/595985859_917467487272888_8655546574144256559_n.jpg"
                alt="SPMA Team"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
