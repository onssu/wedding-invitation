import { NextResponse } from "next/server";
import { db } from "@/server";
import { guests } from "@/server/schema/guests";
import { desc } from "drizzle-orm";

// ✅ GET: 전체 게스트 목록 조회
export async function GET() {
  try {
    const data = await db.select().from(guests).orderBy(desc(guests.createdAt)); // 최신순 정렬

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("❌ Error fetching guests:", error);
    return NextResponse.json(
      { success: false, message: "게스트 데이터를 불러오지 못했습니다." },
      { status: 500 }
    );
  }
}
