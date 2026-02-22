"use client";

import { motion } from "framer-motion";
import { User } from "lucide-react";
import { BOARD_MEMBERS } from "@/components/home/constants";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import type { Dictionary } from "@/components/internationalization/dictionaries";

interface Props {
  lang: string;
  dictionary: Dictionary;
}

export function BoardOfDirectors({ lang, dictionary }: Props) {
  const isAr = lang === "ar";

  return (
    <div>
      <motion.div
        className="text-center space-y-4 mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-accent text-sm font-medium tracking-widest uppercase">
          {dictionary.about.boardPeriod}
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-primary">
          {dictionary.about.board}
        </h2>
      </motion.div>

      <motion.div
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-8"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {BOARD_MEMBERS.map((member) => (
          <motion.div
            key={member.name}
            className="text-center space-y-3"
            variants={fadeInUp}
          >
            <div className="relative w-28 h-28 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
              <User className="w-12 h-12 text-primary/40" />
            </div>
            <div className="space-y-1">
              <h3 className="font-semibold text-sm md:text-base text-foreground">
                {member.name}
              </h3>
              <p className="text-muted-foreground text-xs md:text-sm font-medium">
                {isAr ? member.role : member.roleEn}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
