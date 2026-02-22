"use client";

import { motion } from "framer-motion";
import {
  GraduationCap,
  Coffee,
  Mic,
  BookOpen,
  Heart,
  Newspaper,
  Award,
} from "lucide-react";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import type { Dictionary } from "@/components/internationalization/dictionaries";

const iconMap: Record<string, React.ElementType> = {
  GraduationCap,
  Coffee,
  Mic,
  BookOpen,
  HandHeart: Heart,
  Newspaper,
  Award,
};

interface ServicesProps {
  lang: string;
  dictionary: Dictionary;
}

export function Services({ lang, dictionary }: ServicesProps) {
  const items = dictionary.services.items;

  return (
    <section className="py-16 md:py-24">
      <div className="layout-container max-w-7xl mx-auto">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-primary mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {dictionary.services.title}
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {items.map((item: { title: string; icon: string }, index: number) => {
            const Icon = iconMap[item.icon] || BookOpen;
            return (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="group flex flex-col items-center text-center p-6 rounded-xl border border-border hover:border-accent hover:shadow-lg transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                  <Icon className="w-7 h-7 text-primary group-hover:text-accent transition-colors" />
                </div>
                <h3 className="font-semibold text-foreground">{item.title}</h3>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
