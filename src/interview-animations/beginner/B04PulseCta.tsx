import { motion } from "framer-motion";

/**
 * 初级 · 脉冲注意力按钮
 * 考察：repeat / repeatType、scale 与 opacity 的克制使用。
 */
export default function B04PulseCta() {
  return (
    <div className="min-h-[420px] flex flex-col items-center justify-center gap-8 p-8 bg-zinc-950">
      <div className="relative flex items-center justify-center">
        <motion.span
          className="absolute pointer-events-none rounded-full border-2 border-indigo-400/50 w-44 h-16"
          aria-hidden
          animate={{ scale: [1, 1.35], opacity: [0.45, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
        />
        <motion.button
          type="button"
          className="relative z-10 px-8 py-3 rounded-full font-medium text-white bg-indigo-500 shadow-lg shadow-indigo-500/40"
          animate={{ scale: [1, 1.06, 1] }}
          transition={{
            duration: 1.6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          立即体验
        </motion.button>
      </div>
      <p className="text-zinc-400 text-sm max-w-xs text-center">
        外环用独立元素做扩散，避免与按钮文字同层抢焦点。
      </p>
    </div>
  );
}
