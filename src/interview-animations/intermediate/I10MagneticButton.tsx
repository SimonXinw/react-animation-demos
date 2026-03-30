import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef } from "react";

/**
 * 中级 · 磁性按钮（指针相对位移）
 * 考察：pointer 坐标 → 局部偏移、spring 平滑、边界限制。
 */
export default function I10MagneticButton() {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 280, damping: 22, mass: 0.35 });
  const sy = useSpring(y, { stiffness: 280, damping: 22, mass: 0.35 });

  const handleMove = (clientX: number, clientY: number) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    const dx = (clientX - cx) * 0.22;
    const dy = (clientY - cy) * 0.22;
    const max = 14;
    x.set(Math.max(-max, Math.min(max, dx)));
    y.set(Math.max(-max, Math.min(max, dy)));
  };

  return (
    <div className="min-h-[480px] flex items-center justify-center p-8 bg-zinc-950">
      <div
        ref={ref}
        className="relative inline-flex"
        onMouseMove={(e) => handleMove(e.clientX, e.clientY)}
        onMouseLeave={() => {
          x.set(0);
          y.set(0);
        }}
      >
        <motion.button
          type="button"
          style={{ x: sx, y: sy }}
          className="relative px-10 py-4 rounded-full font-semibold text-white bg-gradient-to-r from-emerald-400 to-cyan-500 shadow-lg shadow-emerald-500/25"
        >
          Magnetic
        </motion.button>
      </div>
    </div>
  );
}
