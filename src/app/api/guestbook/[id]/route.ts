// app/api/guestbook/[id]/route.ts
import { NextResponse } from "next/server";
import { db } from "@/server";
import { weddingGuestbooks } from "@/server/schema/weddingDatas";
import { eq, desc } from "drizzle-orm";

export const runtime = "nodejs";

/** ✅ 방명록 목록 조회 (GET) */
export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params; // 중요: await 추가
  const weddingId = Number(id);

  const rows = await db
    .select()
    .from(weddingGuestbooks)
    .where(eq(weddingGuestbooks.weddingId, weddingId))
    .orderBy(desc(weddingGuestbooks.createdAt));

  return NextResponse.json(rows);
}

/** ✅ 방명록 등록 (POST) */
export async function POST(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params; //동일하게 await 필요
  const weddingId = Number(id);
  const { name, message } = await req.json();

  await db.insert(weddingGuestbooks).values({
    weddingId,
    name,
    message,
  });

  return NextResponse.json({ success: true });
}

/** ✅ 방명록 삭제 (DELETE) */
export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const { guestbookId } = await req.json();

  await db
    .delete(weddingGuestbooks)
    .where(eq(weddingGuestbooks.id, Number(guestbookId)));

  return NextResponse.json({ success: true });
}
