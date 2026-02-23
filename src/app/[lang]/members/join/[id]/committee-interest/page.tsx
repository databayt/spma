import { CommitteeInterestContent } from "@/components/member/onboarding/steps/committee-interest/content"

export default async function CommitteeInterestPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  return <CommitteeInterestContent lang={lang} />
}
