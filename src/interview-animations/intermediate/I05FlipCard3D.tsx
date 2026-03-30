import { motion } from "framer-motion";
import { useState } from "react";

/**
 * 中级 · 3D 翻转卡片
 * 考察：rotateY、perspective、backfaceVisibility、可点击翻转状态。
 */
export default function I05FlipCard3D() {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="min-h-[480px] flex items-center justify-center p-8 bg-neutral-950">
      <div
        className="relative w-72 h-44 [perspective:1200px]"
        style={{ perspective: 1200 }}
      >
        <motion.div
          className="relative w-full h-full cursor-pointer"
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 22 }}
          style={{ transformStyle: "preserve-3d" }}
          onClick={() => setFlipped((v) => !v)}
        >
          <div
            className="absolute inset-0 rounded-2xl border border-white/10 bg-gradient-to-br from-sky-500 to-indigo-600 text-white flex flex-col justify-center items-center shadow-xl"
            style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
          >
            <span className="font-semibold">正面 · 产品</span>
            <span className="text-xs text-white/80 mt-2">点击翻转</span>
          </div>
          <div
            className="absolute inset-0 rounded-2xl border border-white/10 bg-gradient-to-br from-violet-600 to-fuchsia-600 text-white flex flex-col justify-center items-center shadow-xl"
            style={{
              transform: "rotateY(180deg)",
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
            }}
          >
            <span className="font-semibold">背面 · 规格</span>
            <span className="text-xs text-white/80 mt-2">GPU 友好</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
