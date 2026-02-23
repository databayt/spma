"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProfileAbout } from "./profile-about"
import { ProfileCertifications } from "./profile-certifications"
import type { Member } from "@prisma/client"

interface ProfileTabsProps {
  member: Member
  lang: string
}

export function ProfileTabs({ member, lang }: ProfileTabsProps) {
  const isAr = lang === "ar"

  return (
    <Tabs defaultValue="about" className="w-full">
      <TabsList className="w-full justify-start">
        <TabsTrigger value="about">
          {isAr ? "نبذة" : "About"}
        </TabsTrigger>
        <TabsTrigger value="certifications">
          {isAr ? "الشهادات" : "Certifications"}
        </TabsTrigger>
      </TabsList>
      <TabsContent value="about" className="mt-4">
        <ProfileAbout member={member} lang={lang} />
      </TabsContent>
      <TabsContent value="certifications" className="mt-4">
        <ProfileCertifications member={member} lang={lang} />
      </TabsContent>
    </Tabs>
  )
}
