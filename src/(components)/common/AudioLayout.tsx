"use client";

import { useEffect, useRef } from "react";

export default function AudioLayout() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      // 무음으로 시작하고 재생 시도
      audio.volume = 0.3;
      audio.play().catch(() => {
        console.log("자동재생이 차단되어 클릭 시 재생됩니다.");
      });
    }
  }, []);

  return (
    <audio
      ref={audioRef}
      src="/assets/audio/romantic-piano.mp3"
      autoPlay
      loop
      //   muted
      playsInline
    />
  );
}
