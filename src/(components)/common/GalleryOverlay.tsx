"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { gsap } from "gsap";

type Props = {
  open: boolean;
  onClose: () => void;
  images: string[];
  startIndex?: number;
  loop?: boolean;
  altPrefix?: string;
};

export default function GalleryOverlay({
  open,
  onClose,
  images,
  startIndex = 0,
  loop = true,
  altPrefix = "갤러리 이미지",
}: Props) {
  const [mounted, setMounted] = useState(false);
  const [index, setIndex] = useState(startIndex);
  const [dir, setDir] = useState<1 | -1>(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const imgStageRef = useRef<HTMLDivElement>(null);

  // Portal 마운트 준비
  useEffect(() => setMounted(true), []);

  // open 시 초기화
  useEffect(() => {
    if (open) setIndex(Math.min(Math.max(startIndex, 0), images.length - 1));
  }, [open, startIndex, images.length]);

  // 스크롤 잠금
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // 키보드 핸들
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open]);

  // GSAP 전환
  useEffect(() => {
    if (!open || !imgStageRef.current) return;
    const el = imgStageRef.current;
    const fromX = dir === 1 ? 60 : -60;
    gsap.fromTo(
      el,
      { opacity: 0, x: fromX, scale: 0.98 },
      { opacity: 1, x: 0, scale: 1, duration: 0.5, ease: "power2.out" }
    );
  }, [index, dir, open]);

  const prev = () => {
    setDir(-1);
    setIndex((i) => (i > 0 ? i - 1 : loop ? images.length - 1 : i));
  };

  const next = () => {
    setDir(1);
    setIndex((i) => (i < images.length - 1 ? i + 1 : loop ? 0 : i));
  };

  const onBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === containerRef.current) onClose();
  };

  // 스와이프
  const startX = useRef<number | null>(null);
  const onTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (startX.current == null) return;
    const dx = e.changedTouches[0].clientX - startX.current;
    if (Math.abs(dx) > 40) (dx > 0 ? prev : next)();
    startX.current = null;
  };

  if (!open || !mounted) return null;

  const src = images[index];
  const hasPrev = loop || index > 0;
  const hasNext = loop || index < images.length - 1;

  const overlayElement = (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[1200] bg-black/90 backdrop-blur-[1px] flex flex-col"
      onClick={onBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-label="이미지 뷰어"
    >
      {/* 상단바 */}
      <div className="flex items-center justify-between px-4 py-3 text-white/90">
        <div className="text-sm">
          {index + 1} / {images.length}
        </div>
        <button
          onClick={onClose}
          className="h-9 w-9 rounded-full bg-white/10 hover:bg-white/20 grid place-items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
          aria-label="닫기"
        >
          ✕
        </button>
      </div>

      {/* 이미지 영역 */}
      <div
        className="relative flex-1 px-3 select-none"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div
          ref={imgStageRef}
          className="relative w-full h-full grid place-items-center"
        >
          <div className="relative w-full h-full">
            <Image
              key={src}
              src={src}
              alt={`${altPrefix} ${index + 1}`}
              fill
              sizes="100vw"
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* 컨트롤 */}
        {hasPrev && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            className="absolute left-4 bottom-4 h-10 w-10 rounded-full bg-white/15 hover:bg-white/25 text-white grid place-items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
            aria-label="이전 이미지"
          >
            ‹
          </button>
        )}
        {hasNext && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            className="absolute left-16 bottom-4 h-10 w-10 rounded-full bg-white/15 hover:bg-white/25 text-white grid place-items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
            aria-label="다음 이미지"
          >
            ›
          </button>
        )}
      </div>
    </div>
  );

  return createPortal(overlayElement, document.body);
}
