import { NextResponse } from "next/server";

type ReqBody = {
  style?: string;
  relationship?: string;
  keyword?: string;
  count?: number;
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as ReqBody;
    const { style = "감성적인", keyword = "" } = body;

    const prompt = `
  당신은 결혼식 청첩장에 적을 문구를 추천하는 작가입니다.
  아래 조건에 따라 문구를 만들어주세요.

  - 문체: ${style}
  - 키워드: ${keyword || "자유롭게"}

  각 문장은 1~2문장, 줄바꿈으로 구분해서 출력해주세요.
`;

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent?key=${process.env.GOOGLE_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ role: "user", parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.8,
            maxOutputTokens: 512,
          },
        }),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        {
          message: "Gemini API 호출 실패",
          detail: data,
        },
        { status: res.status }
      );
    }

    // Gemini 응답 구조 파싱
    const text =
      data?.candidates?.[0]?.content?.parts
        ?.map((p: any) => p.text)
        .join("\n") ?? "";

    const items = text
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .slice(0, count);

    return NextResponse.json({ items });
  } catch (e: any) {
    console.error("Gemini fetch error:", e);
    return NextResponse.json(
      { message: "서버 오류", detail: e.message },
      { status: 500 }
    );
  }
}
