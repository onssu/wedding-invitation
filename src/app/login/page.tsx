"use client";

import Button from "@/(components)/ui/Button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuthStore } from "@/(store)/authStore";

export default function LoginPage() {
  const router = useRouter();

  const setAuth = useAuthStore((s) => s.setAuth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError("이메일과 비밀번호를 입력해주세요.");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "로그인 실패");
      console.log('data.user.role === "ADMIN": ', data.user.role === "ADMIN");

      setAuth({
        isLoggedIn: true,
        isAdmin: data.user.role === "ADMIN",
        user: data.user,
      });
      // ✅ 로그인 성공 시 — 서버에서 JWT 쿠키가 자동 저장됨
      router.replace("/"); // 메인 페이지로 이동 (또는 `/dashboard`)
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const moveToSignUp = () => {
    router.push("/sign-up");
  };

  return (
    <main>
      <div className="flex flex-col items-center justify-center h-screen">
        <Image
          src="/assets/images/rose.png"
          alt={"장미"}
          width={30}
          height={70}
        />
        <h3 className="text-center">모바일 청첩장</h3>
        <div className="flex flex-col items-center p-4">
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="아이디"
            className="mb-4 p-2 border border-gray-300 rounded"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호"
            className="mb-4 p-2 border border-gray-300 rounded"
          />
          <Button type="button" primary onClick={handleLogin}>
            로그인
          </Button>
          <Button type="button" primary onClick={moveToSignUp}>
            회원가입
          </Button>
        </div>
      </div>
    </main>
  );
}
