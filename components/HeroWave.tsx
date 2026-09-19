"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { createNoise3D } from "simplex-noise";

const WAVE_COLORS = ["#06b6d4", "#14b8a6", "#0891b2", "#0e7490", "#22d3ee"];
const WAVE_WIDTH = 50;
const BLUR_PX = 10;
const WAVE_OPACITY = 0.55;
const SPEED = 0.001;
const WAVE_COUNT = 5;

type HeroWaveProps = {
  children: ReactNode;
};

export function HeroWave({ children }: HeroWaveProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const noiseRef = useRef(createNoise3D());
  const frameRef = useRef<number>(0);
  const ntRef = useRef(0);
  const lastFrameRef = useRef(0);
  const runningRef = useRef(false);
  const [isSafari, setIsSafari] = useState(false);

  const drawFrame = useCallback((
    ctx: CanvasRenderingContext2D,
    w: number,
    h: number,
    advance = true,
  ) => {
    const noise = noiseRef.current;
    const prevFilter = ctx.filter;
    ctx.filter = "none";
    ctx.globalAlpha = 1;
    ctx.clearRect(0, 0, w, h);
    ctx.filter = prevFilter;
    ctx.globalAlpha = WAVE_OPACITY;

    if (advance) ntRef.current += SPEED;
    for (let i = 0; i < WAVE_COUNT; i += 1) {
      ctx.beginPath();
      ctx.lineWidth = WAVE_WIDTH;
      ctx.strokeStyle = WAVE_COLORS[i % WAVE_COLORS.length];
      for (let x = 0; x < w; x += 5) {
        const y = noise(x / 800, 0.3 * i, ntRef.current) * 100;
        ctx.lineTo(x, y + h * 0.5);
      }
      ctx.stroke();
      ctx.closePath();
    }
    ctx.globalAlpha = 1;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;
    if (!canvas || !wrapper) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const safari =
      navigator.userAgent.includes("Safari") &&
      !navigator.userAgent.includes("Chrome");
    setIsSafari(safari);

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const sizeCanvas = () => {
      const width = Math.max(1, Math.floor(wrapper.clientWidth || window.innerWidth));
      const height = Math.max(1, Math.floor(wrapper.clientHeight || window.innerHeight));
      canvas.width = width;
      canvas.height = height;
      ctx.filter = safari ? "none" : `blur(${BLUR_PX}px)`;
    };

    const loop = (now: number) => {
      if (!runningRef.current) return;
      if (now - lastFrameRef.current < 1000 / 60) {
        frameRef.current = requestAnimationFrame(loop);
        return;
      }
      lastFrameRef.current = now;
      drawFrame(ctx, canvas.width, canvas.height);
      frameRef.current = requestAnimationFrame(loop);
    };

    const start = () => {
      if (runningRef.current || reduceMotion) return;
      runningRef.current = true;
      lastFrameRef.current = 0;
      frameRef.current = requestAnimationFrame(loop);
    };

    const stop = () => {
      runningRef.current = false;
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };

    sizeCanvas();
    ntRef.current = 0;
    drawFrame(ctx, canvas.width, canvas.height, !reduceMotion);

    if (!reduceMotion) start();

    const observer = new ResizeObserver(() => {
      sizeCanvas();
      drawFrame(ctx, canvas.width, canvas.height);
    });
    observer.observe(wrapper);

    const onVisibility = () => {
      if (document.hidden) {
        stop();
      } else if (!reduceMotion) {
        start();
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      stop();
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [drawFrame]);

  return (
    <div
      ref={wrapperRef}
      className="relative h-screen min-h-screen flex flex-col items-center justify-center"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0 pointer-events-none h-full w-full bg-transparent"
        aria-hidden
        style={
          isSafari
            ? { filter: `blur(${BLUR_PX}px)`, backgroundColor: "transparent" }
            : { backgroundColor: "transparent" }
        }
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
