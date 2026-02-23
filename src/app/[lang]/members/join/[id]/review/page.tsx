import { ReviewContent } from "@/components/member/onboarding/steps/review/content"

export default async function ReviewPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  return <ReviewContent lang={lang} />
}
