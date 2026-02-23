"use client"

import { motion } from "framer-motion"
import { CheckCircle2, ArrowRight, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useParams } from "next/navigation"

export default function SuccessPage() {
  const params = useParams()
  const lang = (params.lang as string) || "ar"
  const isAr = lang === "ar"
  const Arrow = isAr ? ArrowLeft : ArrowRight

  return (
    <div className="mx-auto max-w-2xl px-4 py-20">
      <motion.div
        className="space-y-6 py-8 text-center"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.2, stiffness: 200 }}
        >
          <CheckCircle2 className="mx-auto h-20 w-20 text-accent" />
        </motion.div>

        <div className="space-y-3">
          <h2 className="text-2xl font-bold text-foreground md:text-3xl">
            {isAr ? "تم إرسال طلبك بنجاح!" : "Application Submitted!"}
          </h2>
          <p className="mx-auto max-w-md text-muted-foreground">
            {isAr
              ? "شكراً لانضمامك! سيقوم فريقنا بمراجعة طلبك والتواصل معك عبر البريد الإلكتروني خلال 48 ساعة"
              : "Thank you for joining! Our team will review your application and contact you via email within 48 hours"}
          </p>
        </div>

        <div className="mx-auto max-w-md space-y-3 rounded-xl bg-muted/50 p-6">
          <h3 className="font-semibold text-foreground">
            {isAr ? "الخطوات التالية" : "Next Steps"}
          </h3>
          <ul className="space-y-2 text-start text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-accent/20 text-xs font-bold text-accent">
                1
              </span>
              {isAr
                ? "ستصلك رسالة تأكيد على بريدك الإلكتروني"
                : "You'll receive a confirmation email"}
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-accent/20 text-xs font-bold text-accent">
                2
              </span>
              {isAr
                ? "سيتم مراجعة طلبك من قبل لجنة العضوية"
                : "Your application will be reviewed by the membership committee"}
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-accent/20 text-xs font-bold text-accent">
                3
              </span>
              {isAr
                ? "ستتلقى إشعار القبول وتفعيل العضوية"
                : "You'll receive approval notification and membership activation"}
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
              <Arrow className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
