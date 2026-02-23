import { WelcomeContent } from "@/components/member/onboarding/steps/welcome/content"

export default async function WelcomePage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  return <WelcomeContent lang={lang} />
}
