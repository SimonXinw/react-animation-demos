import { motion } from "framer-motion";
import { useState } from "react";

/**
 * 初级 · SVG 勾选路径动画
 * 考察：pathLength、SVG 与受控状态的结合。
 */
export default function B06CheckboxDraw() {
  const [on, setOn] = useState(false);

  return (
    <div className="min-h-[420px] flex items-center justify-center p-8 bg-slate-50">
      <button
        type="button"
        onClick={() => setOn((v) => !v)}
        className="flex items-center gap-4 select-none"
        aria-pressed={on}
      >
        <motion.svg
          width="56"
          height="56"
          viewBox="0 0 56 56"
          className="rounded-xl border-2 border-slate-300 bg-white shadow-sm"
          whileTap={{ scale: 0.94 }}
        >
          <motion.rect
            x="6"
            y="6"
            width="44"
            height="44"
            rx="10"
            fill={on ? "#4f46e5" : "#ffffff"}
            initial={false}
            animate={{ fill: on ? "#4f46e5" : "#ffffff" }}
            transition={{ duration: 0.2 }}
          />
          <motion.path
            d="M 16 30 L 24 38 L 40 20"
            fill="none"
            stroke="white"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: on ? 1 : 0,
              opacity: on ? 1 : 0,
            }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          />
        </motion.svg>
        <span className="text-slate-700 font-medium">同意条款（点击切换）</span>
      </button>
    </div>
  );
}
