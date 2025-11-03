import type { Metadata } from "next";
import DetailClient from "./deailClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `청첩장 #${id}`,
    description: "우리의 특별한 날에 초대합니다",
    openGraph: {
      title: `청첩장 #${id}`,
      description: "신랑과 신부의 결혼식에 초대합니다.",
      images: [{ url: "https://example.com/og-image.jpg" }],
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <DetailClient id={id} />;
}
