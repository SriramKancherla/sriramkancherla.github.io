import { useEffect, useRef } from "react";

type Blob = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  hue: number;
};

const BLOB_COUNT = 7;
const CINEMATIC_HUES = [185, 190, 195, 188, 28, 32, 25];

export const FluidBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerRef = useRef({ x: 0.5, y: 0.5, active: false });
  const scrollRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let w = 0;
    let h = 0;

    const blobs: Blob[] = Array.from({ length: BLOB_COUNT }, (_, i) => ({
      x: 0.1 + Math.random() * 0.8,
      y: 0.1 + Math.random() * 0.8,
      vx: (Math.random() - 0.5) * 0.00045,
      vy: (Math.random() - 0.5) * 0.00045,
      radius: 140 + Math.random() * 200,
      hue: CINEMATIC_HUES[i % CINEMATIC_HUES.length],
    }));

    const onMove = (e: PointerEvent) => {
      pointerRef.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
        active: true,
      };
    };

    const onLeave = () => {
      pointerRef.current.active = false;
    };

    const onScroll = () => {
      scrollRef.current = window.scrollY;
    };

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerleave", onLeave);
    window.addEventListener("scroll", onScroll, { passive: true });

    const drawBlob = (cx: number, cy: number, radius: number, hue: number, alpha: number) => {
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
      grad.addColorStop(0, `hsla(${hue}, 72%, 58%, ${alpha})`);
      grad.addColorStop(0.45, `hsla(${hue + 6}, 65%, 48%, ${alpha * 0.55})`);
      grad.addColorStop(1, `hsla(${hue + 10}, 55%, 38%, 0)`);
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fill();
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";
      ctx.filter = "blur(52px)";

      const scrollShift = scrollRef.current * 0.00015;

      blobs.forEach((b, i) => {
        if (pointerRef.current.active) {
          const px = pointerRef.current.x * w;
          const py = pointerRef.current.y * h;
          const bx = b.x * w;
          const by = b.y * h;
          const dx = px - bx;
          const dy = py - by;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 420) {
            b.vx += (dx / dist) * 0.00012;
            b.vy += (dy / dist) * 0.00012;
          }
        }

        b.x += b.vx + Math.sin(Date.now() * 0.0004 + i) * 0.00008;
        b.y += b.vy + scrollShift;

        if (b.x < 0.02 || b.x > 0.98) b.vx *= -1;
        if (b.y < 0.02 || b.y > 0.98) b.vy *= -1;

        b.vx *= 0.988;
        b.vy *= 0.988;

        drawBlob(b.x * w, b.y * h, b.radius, b.hue, 0.22);
      });

      if (pointerRef.current.active) {
        drawBlob(
          pointerRef.current.x * w,
          pointerRef.current.y * h,
          160,
          28,
          0.14,
        );
      }

      ctx.filter = "none";
      ctx.globalCompositeOperation = "source-over";
      raf = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fluid-canvas absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  );
};
