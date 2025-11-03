import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify, type JWTPayload } from "jose";

const COOKIE_NAME = "access_token";
const AUTH_SECRET = process.env.AUTH_SECRET!;
const PUBLIC_PATHS = ["/login", "/view", "/signup", "/public", "/share"]; // /share 토큰형 공개 링크
const ADMIN_PREFIXES = ["/admin"];
const PUBLIC_API_PREFIXES = ["/api/auth", "/api/wedding-data"]; // ← 추가

// 공개 경로 여부
function isPublic(pathname: string) {
  // if (pathname === "/") return true;
  // /public/*, /share/* 등
  if (PUBLIC_PATHS.some((p) => pathname === p || pathname.startsWith(p + "/")))
    return true;
  if (
    PUBLIC_API_PREFIXES.some(
      (p) => pathname === p || pathname.startsWith(p + "/")
    )
  )
    return true;
  return false;
}

// 관리자 전용 경로 여부
function isAdminOnly(pathname: string) {
  return ADMIN_PREFIXES.some(
    (p) => pathname === p || pathname.startsWith(p + "/")
  );
}

// API 경로 여부
function isApi(pathname: string) {
  return pathname.startsWith("/api/");
}

async function verifyJWT(token: string) {
  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(AUTH_SECRET)
    );
    return payload as JWTPayload & {
      role?: "USER" | "ADMIN";
      email?: string;
      name?: string;
      sub?: string;
    };
  } catch {
    return null;
  }
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 정적/프레임워크 자원은 통과 (config.matcher에도 필터링 있지만 한 번 더 안전망)
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon") ||
    pathname.startsWith("/images") ||
    pathname.startsWith("/fonts")
  ) {
    return NextResponse.next();
  }

  // 공개 라우트는 통과
  if (isPublic(pathname)) {
    return NextResponse.next();
  }

  // 보호/관리자 라우트 → 토큰 검증
  const token = req.cookies.get(COOKIE_NAME)?.value;
  const payload = token ? await verifyJWT(token) : null;

  // 미로그인
  if (!payload) {
    if (isApi(pathname)) {
      return NextResponse.json({ message: "UNAUTHORIZED" }, { status: 401 });
    }
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("redirect", pathname);
    return NextResponse.redirect(url);
  }

  // 관리자 전용
  if (isAdminOnly(pathname) && payload.role !== "ADMIN") {
    if (isApi(pathname)) {
      return NextResponse.json({ message: "FORBIDDEN" }, { status: 403 });
    }
    const url = req.nextUrl.clone();
    url.pathname = "/403";
    return NextResponse.rewrite(url);
  }

  // ↓ 선택: 검증한 유저 정보를 라우트 핸들러에 전달하고 싶다면 헤더에 주입
  const requestHeaders = new Headers(req.headers);
  if (payload.sub) requestHeaders.set("x-user-id", String(payload.sub));
  if (payload.role) requestHeaders.set("x-user-role", String(payload.role));
  if (payload.email) requestHeaders.set("x-user-email", String(payload.email));

  return NextResponse.next({
    request: { headers: requestHeaders },
  });
}

export const config = {
  // 미들웨어를 적용할 경로(정적 리소스 제외)
  matcher: ["/((?!_next/static|_next/image|favicon.ico|images|fonts).*)"],
};
