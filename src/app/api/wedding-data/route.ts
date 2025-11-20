// /src/app/api/wedding-data/route.ts
import { NextResponse } from "next/server";
import { db } from "@/server";
import { weddingDatas } from "@/server/schema/weddingDatas";
import { sql, desc } from "drizzle-orm";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const page = Number(searchParams.get("page") ?? "1");
    const pageSize = Number(searchParams.get("pageSize") ?? "5");
    const offset = (page - 1) * pageSize;

    // 전체 개수 가져오기
    const [{ count }] = await db
      .select({ count: sql<number>`count(*)`.mapWith(Number) })
      .from(weddingDatas);

    // 데이터 가져오기
    const rows = await db
      .select()
      .from(weddingDatas)
      .orderBy(desc(weddingDatas.createdAt))
      .limit(pageSize)
      .offset(offset);

    // title에 `${신랑}, ${신부}의 청첩장 ${count}` 형식으로 넣기
    const data = rows.map((item) => ({
      ...item,
      title: `${item.groom}, ${item.bride}의 청첩장 ${count}`, // <-- 이 부분
    }));

    return NextResponse.json({
      ok: true,
      totalCount: count,
      data,
    });
  } catch (e) {
    console.error("API_ERROR", e);
    return NextResponse.json(
      { ok: false, message: "서버 오류 발생" },
      { status: 500 }
    );
  }
}
