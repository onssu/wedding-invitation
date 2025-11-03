import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { db } from "@/server";
import { users } from "@/server/schema/users";
import { eq } from "drizzle-orm";
import * as argon2 from "argon2";
import { SignJWT } from "jose";

type Body = { email: string; password: string };

const COOKIE_NAME = "access_token";
const TOKEN_TTL_SEC = 60 * 60 * 24; // 24h

function getKey() {
  const secret = process.env.AUTH_SECRET;
  if (!secret) throw new Error("AUTH_SECRET is missing");
  return new TextEncoder().encode(secret);
}

export async function POST(req: Request) {
  try {
    const { email, password } = (await req.json()) as Body;

    if (!email || !password) {
      return NextResponse.json(
        { message: "이메일/비밀번호를 입력하세요." },
        { status: 400 }
      );
    }

    const normalized = email.toLowerCase().trim();
    const rows = await db
      .select({
        id: users.id,
        email: users.email,
        passwordHash: users.passwordHash,
        role: users.role,
        name: users.name,
      })
      .from(users)
      .where(eq(users.email, normalized))
      .limit(1);

    const user = rows[0];
    if (!user || !user.passwordHash) {
      return NextResponse.json(
        { message: "가입 정보가 없거나 비밀번호 로그인 불가 계정입니다." },
        { status: 401 }
      );
    }

    const normalizedPassword = password.normalize("NFC").trim();
    const ok = await argon2.verify(user.passwordHash, normalizedPassword);

    if (!ok) {
      return NextResponse.json(
        { message: "이메일 또는 비밀번호가 올바르지 않습니다." },
        { status: 401 }
      );
    }

    // JWT 발급
    const key = getKey();
    const now = Math.floor(Date.now() / 1000);
    const jwt = await new SignJWT({
      role: user.role, // "USER" | "ADMIN"
      email: user.email,
      name: user.name ?? undefined,
    })
      .setProtectedHeader({ alg: "HS256", typ: "JWT" })
      .setSubject(String(user.id))
      .setIssuedAt(now)
      .setExpirationTime(now + TOKEN_TTL_SEC)
      .sign(key);

    // httpOnly 쿠키로 저장
    const cookie = cookies();

    const isProd = process.env.NODE_ENV === "production";

    (await cookie).set(COOKIE_NAME, jwt, {
      httpOnly: true,
      secure: isProd,
      sameSite: "lax",
      path: "/",
      maxAge: TOKEN_TTL_SEC,
    });

    return NextResponse.json({
      ok: true,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        name: user.name,
      },
    });
  } catch (e: any) {
    console.error("LOGIN_ERROR", e);
    return NextResponse.json(
      { message: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
