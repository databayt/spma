"use client";

import { ModalProvider } from "@/components/atom/modal/context";

export default function ArticleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ModalProvider>{children}</ModalProvider>;
}
