import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * 中级 · 数字滚动计数
 * 考察：useSpring 驱动数值、useTransform 格式化为整数展示。
 */
function AnimatedInteger({ value }: { value: number }) {
  const mv = useMotionValue(value);
  const spring = useSpring(mv, { stiffness: 120, damping: 20, mass: 0.4 });
  const rounded = useTransform(spring, (v) => Math.round(v));

  useEffect(() => {
    mv.set(value);
  }, [mv, value]);

  return <motion.span>{rounded}</motion.span>;
}

export default function I07NumberCounter() {
  const [n, setN] = useState(1284);

  return (
    <div className="min-h-[480px] flex flex-col items-center justify-center gap-8 p-8 bg-black text-white">
      <div className="text-6xl font-black tabular-nums tracking-tight">
        <AnimatedInteger value={n} />
        <span className="text-white/40 text-3xl ml-2">ms</span>
      </div>
      <div className="flex gap-2 flex-wrap justify-center">
        {[42, 256, 1284, 9999].map((v) => (
          <button
            key={v}
            type="button"
            onClick={() => setN(v)}
            className="px-3 py-1.5 rounded-md bg-white/10 hover:bg-white/20 text-sm"
          >
            设为 {v}
          </button>
        ))}
      </div>
    </div>
  );
}
