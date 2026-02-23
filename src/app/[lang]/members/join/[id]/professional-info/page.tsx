import { ProfessionalInfoContent } from "@/components/member/onboarding/steps/professional-info/content"

export default async function ProfessionalInfoPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  return <ProfessionalInfoContent lang={lang} />
}
