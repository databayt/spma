"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { STATS } from "./constants";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import type { Dictionary } from "@/components/internationalization/dictionaries";

function CountUp({ target, duration = 2 }: { target: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const numericValue = parseInt(target.replace(/[^0-9]/g, ""));
  const suffix = target.replace(/[0-9]/g, "");

  useEffect(() => {
    if (!isInView) return;
    let startTime: number;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * numericValue));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isInView, numericValue, duration]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

interface StatsProps {
  lang: string;
  dictionary: Dictionary;
}

export function Stats({ lang }: StatsProps) {
  const isAr = lang === "ar";

  return (
    <section className="bg-primary py-16 md:py-24">
      <motion.div
        className="layout-container max-w-7xl mx-auto"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {STATS.map((stat) => (
            <motion.div key={stat.labelAr} variants={fadeInUp}>
              <div className="text-4xl md:text-5xl font-bold text-accent mb-2">
                <CountUp target={stat.value} />
              </div>
              <div className="text-primary-foreground/80 text-lg">
                {isAr ? stat.labelAr : stat.labelEn}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
