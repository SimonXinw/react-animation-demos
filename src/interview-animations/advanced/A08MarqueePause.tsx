import { motion } from "framer-motion";
import { useState } from "react";

/**
 * 高级 · 无限跑马灯（hover 减速）
 * 考察：keyframes x% 循环、duration 状态切换、duplicate 内容无缝拼接。
 */
const items = [
  "React 19",
  "Framer Motion",
  "Canvas",
  "SVG",
  "Gesture",
  "Spring",
  "Accessibility",
];

export default function A08MarqueePause() {
  const [slow, setSlow] = useState(false);

  return (
    <div className="min-h-[520px] flex flex-col items-center justify-center gap-6 p-8 bg-slate-950">
      <div
        className="w-full max-w-3xl overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] py-5"
        onMouseEnter={() => setSlow(true)}
        onMouseLeave={() => setSlow(false)}
      >
        <motion.div
          className="flex gap-10 whitespace-nowrap w-max px-4"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: slow ? 40 : 18,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {[0, 1].map((dup) => (
            <div key={dup} className="flex gap-10">
              {items.map((t) => (
                <span
                  key={`${dup}-${t}`}
                  className="text-white/90 text-lg font-semibold tracking-wide"
                >
                  {t}
                </span>
              ))}
            </div>
          ))}
        </motion.div>
      </div>
      <p className="text-white/40 text-xs text-center max-w-md">
        悬停轨道时拉长周期实现减速；追问：如何做到「无缝」与「动态增删项」。
      </p>
    </div>
  );
}
