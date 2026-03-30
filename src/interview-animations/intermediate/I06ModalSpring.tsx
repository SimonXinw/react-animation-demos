import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

/**
 * 中级 · 弹簧模态 + 背景模糊
 * 考察：AnimatePresence、spring 弹入、焦点与滚动锁定（可口头扩展）。
 */
export default function I06ModalSpring() {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-[480px] flex items-center justify-center p-8 bg-gradient-to-b from-slate-100 to-slate-200">
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="px-5 py-2.5 rounded-xl bg-slate-900 text-white text-sm font-medium shadow-lg"
      >
        打开模态
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-30 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute inset-0 bg-slate-900/50 backdrop-blur-md"
              onClick={() => setOpen(false)}
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              initial={{ scale: 0.85, opacity: 0, y: 24 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 16 }}
              transition={{ type: "spring", stiffness: 420, damping: 28 }}
              className="relative z-10 w-full max-w-md rounded-2xl bg-white shadow-2xl border border-slate-200 p-6"
            >
              <h3 className="text-lg font-semibold text-slate-800">确认操作</h3>
              <p className="text-sm text-slate-600 mt-2">
                弹簧阻尼决定「质感」。可追问：如何与 Radix Dialog 或 focus trap
                集成。
              </p>
              <div className="mt-6 flex justify-end gap-2">
                <button
                  type="button"
                  className="px-3 py-1.5 rounded-lg text-sm text-slate-600 hover:bg-slate-100"
                  onClick={() => setOpen(false)}
                >
                  取消
                </button>
                <button
                  type="button"
                  className="px-3 py-1.5 rounded-lg text-sm bg-indigo-600 text-white"
                  onClick={() => setOpen(false)}
                >
                  确认
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
