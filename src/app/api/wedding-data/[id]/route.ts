import { NextResponse } from "next/server";
import { db } from "@/server";
import { weddingDatas } from "@/server/schema/weddingDatas";
import { eq } from "drizzle-orm";

// GET /api/wedding/[id]
export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    // const userId = Number(_req.headers.get("x-user-id") ?? 0);
    const role = (_req.headers.get("x-user-role") ?? "USER") as
      | "USER"
      | "ADMIN";

    // if (!userId)
    //   return NextResponse.json({ message: "UNAUTHORIZED" }, { status: 401 });

    const id = Number(params.id);
    const [row] = await db
      .select()
      .from(weddingDatas)
      .where(eq(weddingDatas.id, id))
      .limit(1);

    if (!row) {
      return NextResponse.json(
        { ok: false, message: "청첩장을 찾을 수 없습니다." },
        { status: 404 }
      );
    }
    // 접근 제어: 작성자 본인 또는 관리자만
    // if (role !== "ADMIN" && row.userId !== userId) {
    //   return NextResponse.json({ message: "FORBIDDEN" }, { status: 403 });
    // }

    return NextResponse.json({ ok: true, data: row });
  } catch (err) {
    console.error("GET_INVITATION_ERROR", err);
    return NextResponse.json(
      { ok: false, message: "조회 실패" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const userId = Number(req.headers.get("x-user-id")); // ← 미들웨어에서 주입
    if (!userId)
      return NextResponse.json({ message: "UNAUTHORIZED" }, { status: 401 });

    const body = await req.json();
    const [row] = await db
      .insert(weddingDatas)
      .values({ ...body, userId }) // 소유자 매핑
      .returning();

    return NextResponse.json({ ok: true, data: row });
  } catch (e) {
    return NextResponse.json(
      { ok: false, message: "등록 실패" },
      { status: 500 }
    );
  }
}
