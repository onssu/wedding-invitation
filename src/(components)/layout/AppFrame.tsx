"use client";

import { usePathname } from "next/navigation";
import Header from "@/(components)/common/Header";
import React from "react";

export default function AppFrame({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // ❌ 헤더를 '노출하지 말아야' 하는 경로 목록
  const hiddenHeaderPaths = ["/login", "/signin", "/example", "/view"];

  const isHeaderVisible = !hiddenHeaderPaths.some((p) =>
    pathname.startsWith(p)
  );

  return (
    <div className="min-h-screen flex items-start justify-center">
      <div className="w-full max-w-[30rem] min-h-screen bg-white shadow-sm relative overflow-hidden">
        {isHeaderVisible && <Header />}

        <main
          className="h-full transition-all duration-200"
          style={{
            paddingTop: isHeaderVisible
              ? "calc(3rem + env(safe-area-inset-top, 0px))"
              : "env(safe-area-inset-top, 0px)",
            paddingBottom: isHeaderVisible ? "32px" : "0px",
          }}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
