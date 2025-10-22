"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Button from "@/(components)/ui/Button";

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

          <div className="w-10 flex justify-end">
            {isLoggedIn ? (
              <Button
                size="small"
                type="button"
                onClick={() => onAuthChange?.()}
                aria-label="로그아웃"
              >
                로그아웃
              </Button>
            ) : (
              <Button
                size="small"
                type="button"
                onClick={() => router.push("/signin")}
                aria-label="로그인"
              >
                로그인
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
