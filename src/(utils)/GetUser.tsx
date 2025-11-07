import { cookies } from "next/headers";
import { jwtVerify } from "jose";

const COOKIE_NAME = "access_token";
const AUTH_SECRET = process.env.AUTH_SECRET!;

export async function getUser() {
  const cookie = cookies().get(COOKIE_NAME);
  if (!cookie) return null;

  try {
    const { payload } = await jwtVerify(
      cookie.value,
      new TextEncoder().encode(AUTH_SECRET)
    );
    return payload as {
      sub?: string;
      email?: string;
      name?: string;
      role?: "USER" | "ADMIN";
    };
  } catch {
    return null;
  }
}
