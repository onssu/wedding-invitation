"use client";

import React, { useEffect, useRef } from "react";

export type PetalCanvasOverlayProps = {
  total?: number;
  imageSrc?: string;
  className?: string;
  speedXMul?: number;
  speedYMul?: number;
  fullscreen?: boolean;
  /** 꽃잎 색상 */
  tintColor?: string;
  /** 색상 진하기(0~1) */
  tintAlpha?: number;
  /** 꽃잎 최소 크기(px) */
  minSize?: number;
  /** 꽃잎 최대 크기(px) */
  maxSize?: number;
};

export default function PetalCanvasOverlay({
  total = 42,
  imageSrc = "/assets/images/petal.png",
  className = "",
  speedXMul = 1,
  speedYMul = 1,
  fullscreen = false,
  tintColor,
  tintAlpha = 0.8,
  minSize = 10,
  maxSize = 22,
}: PetalCanvasOverlayProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const tintedRef = useRef<HTMLCanvasElement | null>(null);
  const mouseXRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const baseImg = new Image();
    baseImg.src = imageSrc;
    imgRef.current = baseImg;

    let width = 0;
    let height = 0;
    const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));

    function resize() {
      const w = fullscreen ? window.innerWidth : canvas.clientWidth;
      const h = fullscreen ? window.innerHeight : canvas.clientHeight;
      width = w;
      height = h;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    type Petal = {
      x: number;
      y: number;
      w: number;
      h: number;
      opacity: number;
      flip: number;
      xSpeed: number;
      ySpeed: number;
      flipSpeed: number;
      draw: () => void;
      animate: () => void;
    };

    const petalArray: Petal[] = [];

    function buildTinted(img: HTMLImageElement, color?: string, alpha = 0.8) {
      if (!color) {
        tintedRef.current = null;
        return;
      }
      const off = document.createElement("canvas");
      off.width = img.width;
      off.height = img.height;
      const octx = off.getContext("2d")!;
      octx.clearRect(0, 0, off.width, off.height);
      octx.drawImage(img, 0, 0);
      octx.globalCompositeOperation = "source-atop";
      octx.globalAlpha = alpha;
      octx.fillStyle = color;
      octx.fillRect(0, 0, off.width, off.height);
      octx.globalAlpha = 1;
      octx.globalCompositeOperation = "source-over";
      tintedRef.current = off;
    }

    function makePetal(): Petal {
      const p: Partial<Petal> = {};
      const baseSize = minSize + Math.random() * (maxSize - minSize);
      p.x = Math.random() * width;
      p.y = Math.random() * height * 2 - height;
      p.w = baseSize;
      p.h = baseSize * 0.85;
      p.opacity = baseSize / maxSize;
      p.flip = Math.random();
      p.xSpeed = 1 + Math.random() * 1.5;
      p.ySpeed = 1 + Math.random() * 1.5;
      p.flipSpeed = Math.random() * 0.03;

      p.draw = () => {
        if (!ctx || !imgRef.current) return;
        if ((p.y as number) > height || (p.x as number) > width) {
          p.x = -imgRef.current.width;
          p.y = Math.random() * height * 2 - height;
          p.xSpeed = 1 + Math.random() * 1.5;
          p.ySpeed = 1 + Math.random() * 1.5;
          p.flip = Math.random();
        }
        ctx.globalAlpha = p.opacity as number;
        const dw =
          (p.w as number) * (0.6 + Math.abs(Math.cos(p.flip as number)) / 3);
        const dh =
          (p.h as number) * (0.8 + Math.abs(Math.sin(p.flip as number)) / 5);

        const src = tintedRef.current ?? imgRef.current;
        ctx.drawImage(src!, p.x as number, p.y as number, dw, dh);
        ctx.globalAlpha = 1;
      };

      p.animate = () => {
        const mouseX = mouseXRef.current;
        p.x = (p.x as number) + (p.xSpeed as number) + mouseX * 1 * speedXMul;
        p.y = (p.y as number) + (p.ySpeed as number) + mouseX * 2 * speedYMul;
        p.flip = (p.flip as number) + (p.flipSpeed as number);
        (p.draw as () => void)();
      };

      return p as Petal;
    }

    function render() {
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < petalArray.length; i++) petalArray[i].animate();
      rafRef.current = window.requestAnimationFrame(render);
    }

    function touchHandler(e: MouseEvent | TouchEvent) {
      const clientX =
        (e as TouchEvent).touches?.[0]?.clientX ??
        (e as MouseEvent).clientX ??
        0;
      mouseXRef.current = Math.max(0, Math.min(1, clientX / window.innerWidth));
    }

    const onResize = () => resize();

    const onLoad = () => {
      buildTinted(baseImg, tintColor, tintAlpha);
      resize();
      petalArray.length = 0;
      for (let i = 0; i < total; i++) petalArray.push(makePetal());
      render();
    };

    baseImg.addEventListener("load", onLoad);
    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", touchHandler as any, {
      passive: true,
    });
    window.addEventListener("touchmove", touchHandler as any, {
      passive: true,
    });

    return () => {
      baseImg.removeEventListener("load", onLoad);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", touchHandler as any);
      window.removeEventListener("touchmove", touchHandler as any);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [
    imageSrc,
    total,
    fullscreen,
    speedXMul,
    speedYMul,
    tintColor,
    tintAlpha,
    minSize,
    maxSize,
  ]);

  return (
    <div className={`${fullscreen ? "fixed inset-0" : ""} ${className}`}>
      <canvas
        ref={canvasRef}
        className={fullscreen ? "w-screen h-screen" : "w-full h-full"}
      />
    </div>
  );
}
