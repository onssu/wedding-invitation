import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|fonts|images).*)"],
};

const publicRoutes = ["/signin", "/view/[seq]", "/example"];
// 로그인 하지 않을 경우 접근할 수 있는 페이지

export function middleware(request: NextRequest) {
  const token = request.cookies.get("ACCESS_TOKEN");
  const currentPath = request.nextUrl.pathname;
  console.log(token);

  if (!token && !publicRoutes.includes(currentPath)) {
    const url = request.nextUrl.clone();
    url.pathname = "/signin";
    return NextResponse.redirect(url);
  }

  if (token && publicRoutes.includes(currentPath)) {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
