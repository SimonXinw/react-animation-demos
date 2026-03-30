import { motion } from "framer-motion";
import { useRef } from "react";

/**
 * 高级 · 惯性拖拽与边界约束
 * 考察：drag、dragMomentum、dragConstraints、dragElastic；与手势库的选型对比（口述即可）。
 */
export default function A01InertiaDrag() {
  const boundsRef = useRef<HTMLDivElement>(null);

  return (
    <div className="min-h-[520px] flex items-center justify-center p-8 bg-slate-900">
      <div
        ref={boundsRef}
        className="relative w-full max-w-lg h-80 rounded-3xl border border-white/10 bg-gradient-to-br from-slate-800 to-slate-900 overflow-hidden"
      >
        <motion.div
          drag
          dragMomentum
          dragConstraints={boundsRef}
          dragElastic={0.12}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-36 h-36 rounded-2xl bg-gradient-to-tr from-orange-400 to-pink-500 shadow-2xl flex items-center justify-center text-white font-bold text-sm text-center px-2 cursor-grab active:cursor-grabbing touch-none"
          whileTap={{ scale: 1.03 }}
        >
          拖我
        </motion.div>
        <p className="absolute bottom-4 left-0 right-0 text-center text-xs text-white/50 px-4">
          Framer Motion 的 dragMomentum 在松手后保留速度；dragConstraints
          限制在父级可视区域内。
        </p>
      </div>
    </div>
  );
}
