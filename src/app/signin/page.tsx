"use client";

import { useRouter } from "next/navigation";

export default function SigninPage() {
  const router = useRouter();

  const onsubmit = (e: React.FormEvent) => {
    e.preventDefault();
    document.cookie = "ACCESS_TOKEN=sample_token; path=/; max-age=86400";
    router.push("/");
  };

  return (
    <main>
      <div className="flex flex-col items-center justify-center h-screen">
        <h3 className="text-center">모바일 청첩장</h3>
        <form className="flex flex-col items-center p-4" onSubmit={onsubmit}>
          <input
            type="text"
            placeholder="아이디"
            className="mb-4 p-2 border border-gray-300 rounded"
          />
          <input
            type="password"
            placeholder="비밀번호"
            className="mb-4 p-2 border border-gray-300 rounded"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            로그인
          </button>
        </form>
      </div>
    </main>
  );
}
