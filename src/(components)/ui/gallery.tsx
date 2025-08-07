"use client";

import Image from "next/image";
import { useState } from "react";

interface GalleryProps {
  galleryItems: string[];
}

export default function Gallery({ galleryItems }: GalleryProps) {
  const [expanded, setExpanded] = useState(false);

  const visibleItems = expanded ? galleryItems : galleryItems.slice(0, 9);

  return (
    <div className="flex flex-wrap gap-4 justify-center">
      {visibleItems.map((item, index) => (
        <Image
          key={index}
          src={item}
          alt={`Gallery image ${index + 1}`}
          quality={80}
          width={120}
          height={120}
          className="inline-block"
        />
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
    </div>
  );
}
