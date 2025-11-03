"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/(components)/ui/Button";
import Input from "@/(components)/ui/Input";

export default function SignUpPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("이메일 형식을 확인하세요.");
      return;
    }
    if (password.length < 8) {
      setError("비밀번호는 8자 이상이어야 합니다.");
      return;
    }
    if (password !== confirm) {
      setError("비밀번호 확인이 일치하지 않습니다.");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "회원가입에 실패했어요.");
      router.push("/login?registered=1");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="w-full p-6">
      <header className="mb-6 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">회원가입</h1>
        <p className="mt-1 text-sm text-gray-500">
          모바일 청첩장을 만들기 위한 계정을 생성합니다.
        </p>
      </header>

      <form onSubmit={submit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">이메일</label>
          <Input
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value.toLowerCase())}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">이름</label>
          <Input
            type="text"
            autoComplete="name"
            placeholder="홍길동"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">비밀번호</label>
          <Input
            type="password"
            autoComplete="new-password"
            placeholder="8자 이상"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
          />
          <p className="mt-1 text-xs text-gray-500">
            영문/숫자/기호 조합을 권장합니다.
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            비밀번호 확인
          </label>
          <Input
            type="password"
            autoComplete="new-password"
            placeholder="다시 입력"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
          />
        </div>

        {error && (
          <div className="rounded-xl bg-red-50 text-red-700 text-sm p-3">
            {error}
          </div>
        )}

        <Button type="submit" disabled={loading}>
          {loading ? "가입 중..." : "가입하기"}
        </Button>

        <p className="text-center text-sm text-gray-500">
          이미 계정이 있으신가요?{" "}
          <a href="/login" className="text-indigo-600 hover:underline">
            로그인
          </a>
        </p>
      </form>
    </main>
  );
}
