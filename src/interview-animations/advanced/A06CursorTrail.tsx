import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";

/**
 * 高级 · 光标拖尾（多弹簧跟随）
 * 考察：多个 MotionValue 链式延迟、pointer 事件在容器内捕获。
 */
export default function A06CursorTrail() {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const x1 = useSpring(mx, { stiffness: 280, damping: 26 });
  const y1 = useSpring(my, { stiffness: 280, damping: 26 });
  const x2 = useSpring(x1, { stiffness: 220, damping: 24 });
  const y2 = useSpring(y1, { stiffness: 220, damping: 24 });
  const x3 = useSpring(x2, { stiffness: 180, damping: 22 });
  const y3 = useSpring(y2, { stiffness: 180, damping: 22 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      mx.set(e.clientX - r.left);
      my.set(e.clientY - r.top);
    };

    el.addEventListener("pointermove", onMove);
    return () => el.removeEventListener("pointermove", onMove);
  }, [mx, my]);

  return (
    <div
      ref={ref}
      className="relative min-h-[520px] w-full bg-gradient-to-br from-zinc-900 via-black to-violet-950 cursor-none overflow-hidden"
    >
      <p className="absolute top-6 left-0 right-0 text-center text-white/40 text-sm pointer-events-none">
        在区域内移动指针
      </p>
      {[
        { x: x3, y: y3, s: 10, o: 0.35 },
        { x: x2, y: y2, s: 14, o: 0.5 },
        { x: x1, y: y1, s: 18, o: 0.75 },
      ].map((dot, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-cyan-300 blur-[1px] pointer-events-none"
          style={{
            width: dot.s,
            height: dot.s,
            marginLeft: -dot.s / 2,
            marginTop: -dot.s / 2,
            x: dot.x,
            y: dot.y,
            opacity: dot.o,
          }}
        />
      ))}
    </div>
  );
}
