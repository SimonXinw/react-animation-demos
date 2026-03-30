import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

/**
 * 中级 · 多段手风琴（高度动画）
 * 考察：同时只展开一项的状态机、exit 高度动画与可访问性。
 */
const sections = [
  {
    id: "a",
    title: "渲染策略",
    body: "何时用 CSS transition，何时用 JS 弹簧；如何避免布局抖动。",
  },
  {
    id: "b",
    title: "手势",
    body: "拖拽与滚动的 touch-action；与浏览器默认行为的边界。",
  },
  {
    id: "c",
    title: "可访问性",
    body: "prefers-reduced-motion、焦点管理、aria-expanded。",
  },
];

export default function I09AccordionHeights() {
  const [openId, setOpenId] = useState<string | null>("a");

  return (
    <div className="min-h-[480px] flex items-center justify-center p-8 bg-stone-100">
      <div className="w-full max-w-md rounded-2xl border border-stone-200 bg-white shadow-sm divide-y divide-stone-100">
        {sections.map((s) => {
          const isOpen = openId === s.id;
          return (
            <div key={s.id} className="px-4">
              <button
                type="button"
                className="w-full flex items-center justify-between py-4 text-left font-medium text-stone-800"
                aria-expanded={isOpen}
                onClick={() => setOpenId(isOpen ? null : s.id)}
              >
                {s.title}
                <motion.span
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  className="text-stone-400 text-lg leading-none"
                >
                  ▾
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.32, ease: [0.4, 0, 0.2, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="pb-4 text-sm text-stone-600 leading-relaxed">
                      {s.body}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
