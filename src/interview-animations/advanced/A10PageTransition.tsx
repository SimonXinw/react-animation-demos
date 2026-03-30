import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

/**
 * 高级 · 编排式页面切换（mode="wait"）
 * 考察：AnimatePresence 与路由结合的思路、自定义变体与错开子元素。
 */
const pages = [
  {
    id: "dash",
    title: "仪表盘",
    accent: "from-sky-500 to-indigo-600",
  },
  {
    id: "insight",
    title: "洞察",
    accent: "from-emerald-500 to-teal-600",
  },
  {
    id: "lab",
    title: "实验",
    accent: "from-fuchsia-500 to-orange-500",
  },
] as const;

export default function A10PageTransition() {
  const [idx, setIdx] = useState(0);
  const page = pages[idx];

  return (
    <div className="min-h-[520px] flex flex-col items-center justify-center gap-6 p-8 bg-zinc-100">
      <div className="flex gap-2">
        {pages.map((p, i) => (
          <button
            key={p.id}
            type="button"
            onClick={() => setIdx(i)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium border ${
              i === idx
                ? "bg-zinc-900 text-white border-zinc-900"
                : "bg-white text-zinc-700 border-zinc-200 hover:border-zinc-300"
            }`}
          >
            {p.title}
          </button>
        ))}
      </div>

      <div className="relative w-full max-w-md h-72 rounded-2xl overflow-hidden border border-zinc-200 bg-white shadow-lg">
        <AnimatePresence mode="wait">
          <motion.div
            key={page.id}
            className={`absolute inset-0 bg-gradient-to-br ${page.accent} p-6 text-white flex flex-col justify-center`}
            initial={{ opacity: 0, x: 40, filter: "blur(8px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, x: -36, filter: "blur(6px)" }}
            transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
          >
            <motion.h3
              className="text-2xl font-bold"
              initial={{ y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.08, type: "spring", stiffness: 300, damping: 26 }}
            >
              {page.title}
            </motion.h3>
            <motion.p
              className="mt-3 text-sm text-white/90 max-w-xs leading-relaxed"
              initial={{ y: 12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.14, type: "spring", stiffness: 280, damping: 28 }}
            >
              与 React Router 结合时，用 location.pathname 作为 key，保持退出动画完整播放。
            </motion.p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
