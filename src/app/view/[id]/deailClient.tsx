"use client";

import { useEffect, useState } from "react";
import TemplateA from "@/(components)/template/TemplateA";

type FormDataType = {
  bride: string;
  groom: string;
  date: string;
  time: string;
  location: string;
  lat: number;
  lng: number;
  message: string;
  brideFater: string;
  brideMother: string;
  groomFater: string;
  groomMother: string;
  galleryItems: string[];
  info: string;
};

export default function DetailClient({ id }: { id: string }) {
  const [data, setData] = useState<FormDataType | null>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        // 브라우저에서 호출하므로 쿠키 자동 포함, 상대경로 사용 OK
        const res = await fetch(`/api/wedding-data/${id}`, {
          cache: "no-store",
        });
        if (!res.ok) {
          const j = await res.json().catch(() => ({}));
          throw new Error(j?.message || `요청 실패 (${res.status})`);
        }
        const { data } = await res.json();
        if (alive) setData(data);
      } catch (e: any) {
        if (alive) setErr(e?.message || "불러오기에 실패했습니다.");
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, [id]);

  if (loading) {
    return (
      <main className="min-h-screen grid place-items-center text-gray-500">
        불러오는 중...
      </main>
    );
  }

  if (err || !data) {
    return (
      <main className="min-h-screen grid place-items-center text-gray-500">
        {err ?? "해당 청첩장을 불러올 수 없습니다."}
      </main>
    );
  }

  return (
    <main>
      <TemplateA seq={id} data={data} />
    </main>
  );
}
