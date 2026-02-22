"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { UserPlus, FileText, CreditCard, CheckCircle } from "lucide-react";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import type { Dictionary } from "@/components/internationalization/dictionaries";

interface Props {
  lang: string;
  dictionary: Dictionary;
}

const stepsAr = [
  { icon: FileText, title: "تعبئة الاستمارة", desc: "قم بملء نموذج العضوية الإلكتروني" },
  { icon: CreditCard, title: "سداد الرسوم", desc: "اختر نوع العضوية وسدد الرسوم" },
  { icon: CheckCircle, title: "المراجعة والقبول", desc: "سيتم مراجعة طلبك والرد خلال أسبوع" },
  { icon: UserPlus, title: "الانضمام الرسمي", desc: "تهانينا! أنت الآن عضو في الجمعية" },
];

const stepsEn = [
  { icon: FileText, title: "Fill Application", desc: "Complete the online membership form" },
  { icon: CreditCard, title: "Pay Fees", desc: "Choose membership type and pay fees" },
  { icon: CheckCircle, title: "Review & Accept", desc: "Application reviewed within a week" },
  { icon: UserPlus, title: "Official Membership", desc: "Welcome! You are now an SPMA member" },
];

export function HowToJoin({ lang, dictionary }: Props) {
  const isAr = lang === "ar";
  const steps = isAr ? stepsAr : stepsEn;

  return (
    <div className="bg-primary rounded-3xl p-8 md:p-12">
      <motion.div
        className="text-center space-y-4 mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground">
          {dictionary.about.howToJoin}
        </h2>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <motion.div
              key={index}
              className="text-center space-y-4 p-6 rounded-xl bg-primary-foreground/10"
              variants={fadeInUp}
            >
              <div className="w-14 h-14 rounded-full bg-accent flex items-center justify-center mx-auto">
                <Icon className="w-7 h-7 text-accent-foreground" />
              </div>
              <div className="text-2xl font-bold text-accent">
                {index + 1}
              </div>
              <h3 className="font-semibold text-primary-foreground">
                {step.title}
              </h3>
              <p className="text-sm text-primary-foreground/70">{step.desc}</p>
            </motion.div>
          );
        })}
      </motion.div>

      <motion.div
        className="text-center mt-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
      >
        <Link
          href={`/${lang}/members`}
          className="inline-flex items-center justify-center h-12 px-8 bg-accent text-accent-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity text-lg"
        >
          {dictionary.common.joinUs}
        </Link>
      </motion.div>
    </div>
  );
}
