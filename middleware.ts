// /middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;

  // 1) 공개 경로(로그인/회원가입/정적파일/Next 내부 경로)는 통과
  const isPublic =
    pathname.startsWith("/login") ||
    pathname.startsWith("/signup") ||
    pathname.startsWith("/api/auth") || // NextAuth 콜백 등
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon") ||
    pathname.match(/\.(?:png|jpg|jpeg|gif|svg|ico|css|js|txt|woff2?)$/);

  if (isPublic) return NextResponse.next();

  // 2) 토큰 확인 (쿠키의 next-auth 세션/JWT)
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET, // .env에 설정 필요
  });

  if (!token) {
    // 3) 없으면 로그인 페이지로, 원래 가려던 주소는 callbackUrl로 보관
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("callbackUrl", pathname + search);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// 보호하고 싶은 경로만 지정(추천)
// 예: /dashboard, /account 이하만 보호
export const config = {
  matcher: ["/dashboard/:path*", "/account/:path*"],
};
