import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { useRef } from "react";

/**
 * 高级 · 透视倾斜卡片 + 动态高光
 * 考察：rotateX/Y 与指针归一化、useMotionTemplate 拼 radial-gradient。
 */
export default function A09TiltCard() {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 280, damping: 28 });
  const smy = useSpring(my, { stiffness: 280, damping: 28 });

  const rotateXV = useMotionValue(0);
  const rotateYV = useMotionValue(0);
  const rotateX = useSpring(rotateXV, { stiffness: 220, damping: 24 });
  const rotateY = useSpring(rotateYV, { stiffness: 220, damping: 24 });

  const glare = useMotionTemplate`radial-gradient(520px circle at ${smx}px ${smy}px, rgba(255,255,255,0.45), transparent 55%)`;

  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    mx.set(e.clientX - r.left);
    my.set(e.clientY - r.top);
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    rotateXV.set(-py * 26);
    rotateYV.set(px * 26);
  };

  const onLeave = () => {
    rotateXV.set(0);
    rotateYV.set(0);
  };

  return (
    <div className="min-h-[520px] flex items-center justify-center p-8 bg-neutral-950 [perspective:1400px]">
      <motion.div
        ref={ref}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative w-80 h-48 rounded-2xl border border-white/10 overflow-hidden shadow-2xl cursor-default"
      >
        <div
          className="absolute inset-0 bg-gradient-to-br from-violet-600 via-fuchsia-600 to-orange-400"
          style={{ transform: "translateZ(0)" }}
        />
        <motion.div
          className="absolute inset-0 mix-blend-overlay pointer-events-none"
          style={{ backgroundImage: glare }}
        />
        <div
          className="absolute inset-0 flex flex-col justify-end p-5 text-white"
          style={{ transform: "translateZ(40px)" }}
        >
          <div className="text-lg font-bold">Tilt + Glare</div>
          <div className="text-xs text-white/75 mt-1">
            高光跟随指针；rotate 在松手时用 spring 回中。
          </div>
        </div>
      </motion.div>
    </div>
  );
}
