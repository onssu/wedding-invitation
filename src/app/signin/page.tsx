"use client";

import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const onsubmit = (e: React.FormEvent) => {
    e.preventDefault();
    document.cookie = "ACCESS_TOKEN=sample_token; path=/; max-age=86400";
    router.push("/");
  };

  return (
    <main className="flex flex-col items-center bg-[#333]">
      <div className="overflow-hidden relative max-w-[100vw] w-[30rem] min-h-screen bg-[#fff]">
        로그인
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
