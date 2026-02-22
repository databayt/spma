"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const easeOut: [number, number, number, number] = [0.33, 1, 0.68, 1];

const videoVariants = {
  hidden: { x: "-40%", scale: 1.4, opacity: 1 },
  visible: {
    x: 0,
    scale: 1,
    transition: { duration: 0.8, ease: easeOut, delay: 1.8 },
  },
};

const textVariants = {
  hidden: { x: "-80%", opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.8, ease: easeOut, delay: 1.8 },
  },
};

const buttonVariants = {
  hidden: { y: "30%", opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.8, ease: easeOut, delay: 2.0 },
  },
};

interface HeroProps {
  lang: string;
}

export function Hero({ lang }: HeroProps) {
  const isAr = lang === "ar";

  return (
    <section className="min-h-screen flex flex-col justify-center overflow-hidden">
      <div className="layout-container">
        <div className="flex flex-col lg:flex-row items-center justify-between w-full gap-8">
          <motion.div
            className="text-center lg:text-start lg:w-[450px] xl:w-[500px] z-10 order-2 lg:order-1 lg:ps-8 xl:ps-16"
            variants={textVariants}
            initial="hidden"
            animate="visible"
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-medium text-black dark:text-white leading-[1.1] tracking-tight mb-8">
              {isAr ? (
                <>
                  <span className="whitespace-nowrap">الجمعية السودانية</span>
                  <br />
                  لإدارة المشاريع
                </>
              ) : (
                <>
                  <span className="whitespace-nowrap">Sudanese Project</span>
                  <br />
                  Management Association
                </>
              )}
            </h1>
            <motion.div
              variants={buttonVariants}
              initial="hidden"
              animate="visible"
            >
              <Link
                href="#explore"
                className="inline-block bg-navy hover:bg-navy/90 text-white font-medium px-8 py-3 rounded-lg transition-all duration-300 text-[17px] tracking-wide"
              >
                EXPLORE
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            className="flex-1 w-full lg:w-[55%] xl:w-[60%] order-1 lg:order-2 lg:me-4 xl:me-0"
            variants={videoVariants}
            initial="hidden"
            animate="visible"
          >
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-auto"
            >
              <source src="/videos/hero-3d.mp4" type="video/mp4" />
            </video>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
