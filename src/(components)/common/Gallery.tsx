"use client";

import Image from "next/image";
import { useState } from "react";
import GalleryOverlay from "./GalleryOverlay";

interface GalleryProps {
  galleryItems: string[];
}

export default function Gallery({ galleryItems }: GalleryProps) {
  const [expanded, setExpanded] = useState(false);

  const [open, setOpen] = useState(false);
  const [start, setStart] = useState(0);

  const visibleItems = expanded ? galleryItems : galleryItems.slice(0, 9);

  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {visibleItems.map((item, i) => (
        <li key={i} className="list-none">
          <button
            onClick={() => {
              setStart(i);
              setOpen(true);
            }}
            className="block overflow-hidden rounded-[4px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label={`이미지 ${i + 1} 크게 보기`}
          >
            <div className="relative w-full">
              <Image
                key={i}
                src={item}
                alt={`썸네일 ${i + 1}`}
                quality={80}
                width={120}
                height={120}
                className="inline-block object-cover"
              />
            </div>
          </button>
        </li>
      ))}
      {galleryItems.length > 9 && (
        <button
          type="button"
          className="
            inline-flex items-center gap-1
            px-4 py-1 mt-4
            rounded-full border border-[#d8cfc9]
            text-sm text-[#8a6f63]
            bg-white
          "
          onClick={() => setExpanded((prev) => !prev)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`transition-transform duration-200 ${
              expanded ? "rotate-180" : ""
            }`}
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>

          {expanded ? "사진 접기" : "사진 더 보기"}
        </button>
      )}
      <GalleryOverlay
        open={open}
        onClose={() => setOpen(false)}
        images={visibleItems}
        startIndex={start}
        loop
        altPrefix="웨딩 갤러리"
      />
    </div>
  );
}
