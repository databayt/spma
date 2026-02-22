"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { slideInLeft, slideInRight } from "@/lib/animations";
import type { Dictionary } from "@/components/internationalization/dictionaries";

interface Props {
  lang: string;
  dictionary: Dictionary;
}

export function WhoWeAre({ lang, dictionary }: Props) {
  const isAr = lang === "ar";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
      <motion.div
        className="space-y-6"
        variants={isAr ? slideInRight : slideInLeft}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="text-accent text-sm font-medium tracking-widest uppercase">
          {dictionary.about.sectionTitle}
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-primary leading-tight">
          {dictionary.about.whoWeAre}
        </h2>
        <p className="text-muted-foreground text-lg leading-relaxed">
          {dictionary.about.whoWeAreText}
        </p>
      </motion.div>

      <motion.div
        variants={isAr ? slideInLeft : slideInRight}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <Image
          src="/facebook/597868630_917467723939531_2717005173723912320_n.jpg"
          alt="SPMA Team"
          width={600}
          height={400}
          className="w-full h-[400px] rounded-2xl object-cover shadow-lg"
        />
      </motion.div>
    </div>
  );
}
