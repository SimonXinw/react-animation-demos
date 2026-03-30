import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

/**
 * 高级 · 有机形态切换（双路径交叉淡化）
 * 考察：复杂 path 不宜硬插值时，用 opacity + scale 编排仍能保持高级感。
 */
const blobA =
  "M62,88 C20,72 18,32 52,18 C86,4 118,28 122,58 C126,88 104,104 62,88Z";
const blobB =
  "M64,92 C28,96 8,56 34,26 C60,-4 108,8 124,44 C140,80 100,88 64,92Z";

export default function A03SvgBlobMorph() {
  const [flip, setFlip] = useState(false);

  return (
    <div className="min-h-[520px] flex flex-col items-center justify-center gap-8 p-8 bg-indigo-950">
      <div className="relative w-[220px] h-[220px]">
        <svg width="220" height="220" viewBox="0 0 160 160" className="absolute inset-0">
          <defs>
            <linearGradient id="blobGradA" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#a78bfa" />
              <stop offset="100%" stopColor="#22d3ee" />
            </linearGradient>
          </defs>
          <AnimatePresence mode="sync">
            <motion.path
              key={flip ? "b" : "a"}
              fill="url(#blobGradA)"
              d={flip ? blobB : blobA}
              initial={{ opacity: 0, scale: 0.92, rotate: -4 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 1.06, rotate: 3 }}
              transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
            />
          </AnimatePresence>
        </svg>
      </div>
      <button
        type="button"
        onClick={() => setFlip((v) => !v)}
        className="px-5 py-2 rounded-full bg-white/10 border border-white/20 text-white text-sm hover:bg-white/15"
      >
        切换有机形态
      </button>
    </div>
  );
}
