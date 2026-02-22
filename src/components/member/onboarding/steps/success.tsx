"use client";

import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Props {
  lang: string;
}

export function SuccessStep({ lang }: Props) {
  const isAr = lang === "ar";
  const Arrow = isAr ? ArrowLeft : ArrowRight;

  return (
    <motion.div
      className="text-center space-y-6 py-8"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", delay: 0.2, stiffness: 200 }}
      >
        <CheckCircle2 className="w-20 h-20 text-accent mx-auto" />
      </motion.div>

      <div className="space-y-3">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground">
          {isAr ? "تم إرسال طلبك بنجاح!" : "Application Submitted!"}
        </h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          {isAr
            ? "شكراً لانضمامك! سيقوم فريقنا بمراجعة طلبك والتواصل معك عبر البريد الإلكتروني خلال 48 ساعة"
            : "Thank you for joining! Our team will review your application and contact you via email within 48 hours"}
        </p>
      </div>

      <div className="bg-muted/50 rounded-xl p-6 max-w-md mx-auto space-y-3">
        <h3 className="font-semibold text-foreground">
          {isAr ? "الخطوات التالية" : "Next Steps"}
        </h3>
        <ul className="text-sm text-muted-foreground space-y-2 text-start">
          <li className="flex items-start gap-2">
            <span className="w-5 h-5 rounded-full bg-accent/20 text-accent text-xs flex items-center justify-center flex-shrink-0 mt-0.5 font-bold">1</span>
            {isAr ? "ستصلك رسالة تأكيد على بريدك الإلكتروني" : "You'll receive a confirmation email"}
          </li>
          <li className="flex items-start gap-2">
            <span className="w-5 h-5 rounded-full bg-accent/20 text-accent text-xs flex items-center justify-center flex-shrink-0 mt-0.5 font-bold">2</span>
            {isAr ? "سيتم مراجعة طلبك من قبل لجنة العضوية" : "Your application will be reviewed by the membership committee"}
          </li>
          <li className="flex items-start gap-2">
            <span className="w-5 h-5 rounded-full bg-accent/20 text-accent text-xs flex items-center justify-center flex-shrink-0 mt-0.5 font-bold">3</span>
            {isAr ? "ستتلقى تعليمات الدفع وتفعيل العضوية" : "You'll receive payment instructions and membership activation"}
          </li>
        </ul>
      </div>

      <div className="flex justify-center gap-4 pt-4">
        <Link href={`/${lang}`}>
          <Button variant="outline">
            {isAr ? "الرئيسية" : "Home"}
          </Button>
        </Link>
        <Link href={`/${lang}/members`}>
          <Button className="bg-accent text-accent-foreground hover:opacity-90">
            {isAr ? "صفحة الأعضاء" : "Members Page"}
            <Arrow className="w-4 h-4" />
          </Button>
        </Link>
      </div>
    </motion.div>
  );
}
