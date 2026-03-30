import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

/**
 * 初级 · 展开 / 收起
 * 考察：AnimatePresence、height: auto 动画模式、退出动画。
 */
export default function B05ExpandCollapse() {
  const [open, setOpen] = useState(true);

  return (
    <div className="min-h-[420px] flex flex-col items-center justify-center p-8 bg-emerald-50">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="mb-4 px-4 py-2 rounded-lg bg-emerald-600 text-white text-sm font-medium shadow"
      >
        {open ? "收起详情" : "展开详情"}
      </button>

      <div className="w-full max-w-md rounded-2xl border border-emerald-200 bg-white overflow-hidden shadow-sm">
        <div className="p-4 font-semibold text-emerald-900">订单摘要</div>
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
              className="border-t border-emerald-100"
            >
              <div className="p-4 text-sm text-emerald-800/90 space-y-2">
                <p>考察候选人是否理解退出阶段需要 AnimatePresence。</p>
                <p>生产环境可结合 max-height 或测量元素高度以兼容弱浏览器。</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
