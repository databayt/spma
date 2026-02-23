import { redirect } from "next/navigation";
import { createMemberDraft } from "@/components/member/onboarding/actions";

export default async function JoinPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const { id } = await createMemberDraft();
  redirect(`/${lang}/members/join/${id}/welcome`);
}
