import { motion } from "framer-motion";
import { useState } from "react";

/**
 * 中级 · SVG 描边动画
 * 考察：pathLength、自定义 path、重播控制。
 */
export default function I04SvgPathDraw() {
  const [key, setKey] = useState(0);

  return (
    <div className="min-h-[480px] flex flex-col items-center justify-center gap-6 p-8 bg-amber-50">
      <motion.svg
        key={key}
        width="320"
        height="200"
        viewBox="0 0 320 200"
        className="drop-shadow-lg"
      >
        <motion.path
          d="M 40 160 Q 80 40 160 100 T 280 60"
          fill="none"
          stroke="#b45309"
          strokeWidth="4"
          strokeLinecap="round"
          initial={{ pathLength: 0, pathOffset: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.6, ease: "easeInOut" }}
        />
        <motion.circle
          cx="160"
          cy="100"
          r="36"
          fill="#fef3c7"
          stroke="#d97706"
          strokeWidth="3"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1.2, type: "spring", stiffness: 200, damping: 14 }}
        />
      </motion.svg>
      <button
        type="button"
        onClick={() => setKey((k) => k + 1)}
        className="px-4 py-2 rounded-lg bg-amber-700 text-white text-sm font-medium"
      >
        重播描边
      </button>
    </div>
  );
}
