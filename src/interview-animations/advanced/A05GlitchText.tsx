import { motion } from "framer-motion";

/**
 * 高级 · 故障风文字（分层错位 + blend）
 * 考察：纯 CSS keyframes 与 motion 混合、可读性与 reduced-motion。
 */
export default function A05GlitchText() {
  return (
    <div className="min-h-[520px] flex items-center justify-center p-8 bg-neutral-950 overflow-hidden">
      <div className="relative text-center">
        <motion.h2
          className="text-5xl sm:text-6xl font-black tracking-tight text-white relative z-10"
          animate={{ x: [0, -2, 3, 0], skewX: [0, -2, 1, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        >
          SIGNAL
        </motion.h2>
        <motion.h2
          className="absolute inset-0 text-5xl sm:text-6xl font-black tracking-tight text-cyan-400 mix-blend-screen opacity-70 pointer-events-none"
          aria-hidden
          animate={{ x: [0, 6, -4, 0], y: [0, 1, -1, 0] }}
          transition={{ duration: 2.1, repeat: Infinity, ease: "easeInOut" }}
        >
          SIGNAL
        </motion.h2>
        <motion.h2
          className="absolute inset-0 text-5xl sm:text-6xl font-black tracking-tight text-fuchsia-500 mix-blend-screen opacity-60 pointer-events-none"
          aria-hidden
          animate={{ x: [0, -5, 4, 0] }}
          transition={{ duration: 1.7, repeat: Infinity, ease: "easeInOut" }}
        >
          SIGNAL
        </motion.h2>
        <p className="mt-8 text-xs text-neutral-500 max-w-sm mx-auto">
          面试可追问：如何把 clip-path 或伪随机步进接入同一套编排。
        </p>
      </div>
    </div>
  );
}
