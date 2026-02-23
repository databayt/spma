import { PersonalInfoContent } from "@/components/member/onboarding/steps/personal-info/content"

export default async function PersonalInfoPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  return <PersonalInfoContent lang={lang} />
}
