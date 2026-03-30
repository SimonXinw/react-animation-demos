import { motion } from "framer-motion";
import { useState } from "react";

/**
 * 初级 · 平滑进度条
 * 考察：对 width 使用 spring 过渡，而非线性插值；与受控状态联动。
 */
export default function B07ProgressBar() {
  const [target, setTarget] = useState(35);

  return (
    <div className="min-h-[420px] flex flex-col items-center justify-center gap-8 p-8 bg-neutral-900">
      <div className="w-full max-w-md">
        <div className="flex justify-between text-neutral-400 text-sm mb-2">
          <span>上传进度</span>
          <span>{target}%</span>
        </div>
        <div className="h-3 rounded-full bg-neutral-800 overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500"
            animate={{ width: `${target}%` }}
            transition={{ type: "spring", stiffness: 120, damping: 22, mass: 0.6 }}
          />
        </div>
      </div>
      <div className="flex gap-2 flex-wrap justify-center">
        {[0, 25, 55, 88, 100].map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => setTarget(n)}
            className="px-3 py-1.5 rounded-md bg-neutral-800 text-neutral-200 text-sm hover:bg-neutral-700"
          >
            {n}%
          </button>
        ))}
      </div>
    </div>
  );
}
