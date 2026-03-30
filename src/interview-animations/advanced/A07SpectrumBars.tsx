import { motion } from "framer-motion";
import { useMemo } from "react";

/**
 * 高级 · 频谱式律动柱
 * 考察：随机相位与 stagger、无限 repeat；与音频分析节点的对接思路。
 */
export default function A07SpectrumBars() {
  const bars = useMemo(
    () =>
      Array.from({ length: 28 }, (_, i) => ({
        id: i,
        delay: (i % 7) * 0.06,
        duration: 0.85 + (i % 5) * 0.07,
      })),
    []
  );

  return (
    <div className="min-h-[520px] flex items-end justify-center gap-1.5 px-4 py-16 bg-black">
      {bars.map((b) => (
        <motion.div
          key={b.id}
          className="w-2 sm:w-2.5 rounded-t-md bg-gradient-to-t from-fuchsia-600 via-violet-500 to-cyan-300 origin-bottom"
          animate={{ scaleY: [0.25, 1, 0.35, 0.9, 0.25] }}
          transition={{
            duration: b.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: b.delay,
          }}
          style={{ height: 160 }}
        />
      ))}
    </div>
  );
}
