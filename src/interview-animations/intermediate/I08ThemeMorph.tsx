import { motion } from "framer-motion";
import { useState } from "react";

/**
 * 中级 · 日/夜切换形变
 * 考察：路径或图标的 morph、主题 token 与动画联动。
 */
export default function I08ThemeMorph() {
  const [dark, setDark] = useState(false);

  return (
    <div
      className={`min-h-[480px] flex items-center justify-center p-8 transition-colors duration-500 ${
        dark ? "bg-slate-950" : "bg-sky-100"
      }`}
    >
      <motion.button
        type="button"
        onClick={() => setDark((v) => !v)}
        className={`relative h-16 w-16 rounded-full shadow-xl flex items-center justify-center border-2 ${
          dark
            ? "bg-slate-800 border-slate-600"
            : "bg-white border-sky-200"
        }`}
        whileTap={{ scale: 0.94 }}
        aria-label="切换主题"
      >
        <motion.svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          initial={false}
          animate={{ rotate: dark ? 360 : 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <motion.path
            d={
              dark
                ? "M12 3a6 6 0 1 0 9 9 9 9 0 0 1-9-9Z"
                : "M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z"
            }
            fill={dark ? "#fbbf24" : "#f59e0b"}
            stroke={dark ? "#fbbf24" : "#d97706"}
            strokeWidth="1.2"
            transition={{ duration: 0.45 }}
          />
        </motion.svg>
      </motion.button>
    </div>
  );
}
