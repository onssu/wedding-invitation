"use client";

import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

type HamburgerMenuProps = {
  isLoggedIn?: boolean;
  onLogin?: () => void;
  onLogout?: () => void;
  loading?: boolean;
  className?: string;
};

export default function HamburgerMenu({
  isLoggedIn = false,
  onLogin,
  onLogout,
  loading = false,
  className,
}: HamburgerMenuProps) {
  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  // 바깥 클릭 닫기
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!open) return;
      const t = e.target as Node;
      if (menuRef.current?.contains(t) || btnRef.current?.contains(t)) return;
      setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  // ESC 닫기
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const handleToggle = () => setOpen((v) => !v);

  const handleLoginClick = () => {
    onLogin?.();
    setOpen(false);
  };

  const handleLogoutClick = () => {
    if (loading) return;
    onLogout?.();
    setOpen(false);
  };

  return (
    <div className={clsx("relative", className)}>
      <button
        ref={btnRef}
        type="button"
        aria-label="메뉴 열기"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls="header-hamburger-menu"
        onClick={handleToggle}
        className={clsx(
          "inline-flex items-center justify-center",
          "h-9 w-9 active:scale-[0.98] transition"
        )}
      >
        {/* 햄버거 아이콘 (SVG) */}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
          className="h-5 w-5"
        >
          <path
            d="M4 7h16M4 12h16M4 17h16"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </button>

      {/* 드롭다운 */}
      {open && (
        <div
          id="header-hamburger-menu"
          role="menu"
          ref={menuRef}
          className={clsx(
            "absolute right-0 mt-2 min-w-40 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg z-50"
          )}
        >
          <button
            role="menuitem"
            type="button"
            onClick={isLoggedIn ? handleLogoutClick : handleLoginClick}
            disabled={loading}
            className={clsx(
              "w-full px-4 py-3 text-left text-sm",
              "hover:bg-gray-50 focus:bg-gray-50 focus:outline-none",
              "disabled:opacity-50"
            )}
          >
            {isLoggedIn ? (loading ? "로그아웃 중..." : "로그아웃") : "로그인"}
          </button>

          {/* 필요하면 여기 아래에 항목을 더 늘리세요 */}
          {/* <button role="menuitem" type="button" className="w-full px-4 py-3 text-left text-sm hover:bg-gray-50">설정</button> */}
        </div>
      )}
    </div>
  );
}
