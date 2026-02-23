"use client"

import { useEffect } from "react"
import { motion } from "framer-motion"
import { Award, Users, BookOpen, Star, Rocket } from "lucide-react"
import { fadeInUp, staggerContainer } from "@/lib/animations"
import { useWizardValidation } from "../../wizard-validation-context"

const BENEFITS = [
  {
    icon: Users,
    titleAr: "شبكة مهنية",
    titleEn: "Professional Network",
    descAr: "تواصل مع خبراء وممارسين في إدارة المشاريع",
    descEn: "Connect with PM experts and practitioners",
  },
  {
    icon: BookOpen,
    titleAr: "تدريب وتطوير",
    titleEn: "Training & Development",
    descAr: "دورات تدريبية وورش عمل احترافية",
    descEn: "Professional courses and workshops",
  },
  {
    icon: Award,
    titleAr: "شهادات معتمدة",
    titleEn: "Recognized Certifications",
    descAr: "خصومات على الشهادات العالمية",
    descEn: "Discounts on global certifications",
  },
  {
    icon: Star,
    titleAr: "فعاليات حصرية",
    titleEn: "Exclusive Events",
    descAr: "PM Café وبودكاست تجربتي والمزيد",
    descEn: "PM Café, Tajribati Podcast, and more",
  },
]

interface WelcomeContentProps {
  lang: string
}

export function WelcomeContent({ lang }: WelcomeContentProps) {
  const isAr = lang === "ar"
  const { enableNext } = useWizardValidation()

  useEffect(() => {
    enableNext()
  }, [enableNext])

  return (
    <div className="space-y-8">
      <motion.div
        className="space-y-4 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-accent/20">
          <Rocket className="h-10 w-10 text-accent" />
        </div>
        <h2 className="text-2xl font-bold text-foreground md:text-3xl">
          {isAr
            ? "مرحباً بك في الجمعية السودانية لإدارة المشاريع"
            : "Welcome to SPMA"}
        </h2>
        <p className="mx-auto max-w-lg text-muted-foreground">
          {isAr
            ? "انضم إلى مجتمع مهني يضم أكثر من 500 عضو وخبير في مجال إدارة المشاريع"
            : "Join a professional community of 500+ members and experts in project management"}
        </p>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 gap-4 sm:grid-cols-2"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {BENEFITS.map((benefit) => {
          const Icon = benefit.icon
          return (
            <motion.div
              key={benefit.titleEn}
              variants={fadeInUp}
              className="space-y-2 rounded-xl border border-border bg-background p-5"
            >
              <Icon className="h-6 w-6 text-accent" />
              <h3 className="text-sm font-semibold text-foreground">
                {isAr ? benefit.titleAr : benefit.titleEn}
              </h3>
              <p className="text-xs text-muted-foreground">
                {isAr ? benefit.descAr : benefit.descEn}
              </p>
            </motion.div>
          )
        })}
      </motion.div>
    </div>
  )
}
