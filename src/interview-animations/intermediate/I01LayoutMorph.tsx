import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

/**
 * 中级 · 共享元素 layoutId 形变
 * 考察：layoutId、mode、列表与详情切换时的 FLIP 感知。
 */
export default function I01LayoutMorph() {
  const [detail, setDetail] = useState<number | null>(null);

  const items = [
    { id: 1, title: "星云", color: "from-fuchsia-500 to-purple-600" },
    { id: 2, title: "极光", color: "from-cyan-400 to-blue-600" },
    { id: 3, title: "日冕", color: "from-amber-400 to-rose-500" },
  ];

  const current = items.find((x) => x.id === detail);

  return (
    <div className="min-h-[480px] relative p-6 bg-slate-950 overflow-hidden">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
        {items.map((item) => (
          <motion.button
            key={item.id}
            type="button"
            layout
            onClick={() => setDetail(item.id)}
            className="relative rounded-2xl overflow-hidden text-left h-40 border border-white/10 bg-white/5"
          >
            <motion.div
              layoutId={`hero-${item.id}`}
              className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-90`}
            />
            <span className="relative z-10 p-4 block text-white font-semibold">
              {item.title}
            </span>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {current && (
          <motion.div
            className="fixed inset-0 z-20 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setDetail(null)}
          >
            <motion.div
              layoutId={`hero-${current.id}`}
              onClick={(e) => e.stopPropagation()}
              className={`w-full max-w-lg rounded-3xl bg-gradient-to-br ${current.color} p-8 text-white shadow-2xl`}
            >
              <h3 className="text-2xl font-bold">{current.title}</h3>
              <p className="mt-4 text-white/90 text-sm leading-relaxed">
                点击遮罩关闭。同一 layoutId 连接缩略图与详情，考察候选人对共享布局过渡与
                AnimatePresence 的理解。
              </p>
              <button
                type="button"
                className="mt-6 px-4 py-2 rounded-lg bg-white/20 hover:bg-white/30 text-sm"
                onClick={() => setDetail(null)}
              >
                关闭
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
