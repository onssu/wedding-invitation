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
    <div className="flex flex-wrap gap-4 justify-center">
      {visibleItems.map((item, i) => (
        <li key={i} className="list-none">
          <button
            onClick={() => {
              setStart(i);
              setOpen(true);
            }}
            className="block overflow-hidden rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
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
          className="block w-full mt-4 text-sm text-blue-500 underline"
          onClick={() => setExpanded((prev) => !prev)}
        >
          {expanded ? "접기" : `더보기`}
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
