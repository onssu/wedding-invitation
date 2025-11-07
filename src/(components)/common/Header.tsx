"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Button from "@/(components)/ui/Button";
import { useState } from "react";
import HamburgerMenu from "./HamburgerMenu";

type HeaderProps = {
  title?: string;
  isLoggedIn?: boolean;
  onAuthChange?: () => void;
};

export default function Header({
  title = "웨딩 초대장",
  isLoggedIn = false,
  onAuthChange,
}: HeaderProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/auth/logout", { method: "POST" });
      if (res.ok) {
        // 쿠키 삭제 성공
        alert("로그아웃 되었습니다.");
        router.push("/login"); // 로그인 페이지로 이동
      } else {
        const data = await res.json();
        alert(data.message || "로그아웃 실패");
      }
    } catch (e) {
      console.error(e);
      alert("서버 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  // 부모 컨테이너가 relative 상태이므로 아래처럼 absolute로 두면 부모 너비에 맞춰집니다.
  return (
    <header className="absolute inset-x-0 top-0 z-40 pointer-events-auto">
      {/* 중앙 컨테이너 너비에 맞춘 래퍼 */}
      <div className="max-w-[30rem] w-full mx-auto bg-white border-b">
        <div className="flex items-center justify-between h-12 px-4">
          <div className="w-10" />
          <h1 className="text-center text-lg font-semibold text-[#a77e51] truncate">
            {title}
          </h1>
          <div className="w-9 flex justify-end">
            <HamburgerMenu />
          </div>
        </div>
      </div>
    </header>
  );
}
