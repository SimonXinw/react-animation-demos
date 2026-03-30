import { motion } from "framer-motion";
import { useState } from "react";

/**
 * 初级 · 点赞心形弹跳
 * 考察：关键帧 scale 序列、tap 反馈、简单状态机。
 */
export default function B10HeartLike() {
  const [liked, setLiked] = useState(false);

  return (
    <div className="min-h-[420px] flex flex-col items-center justify-center gap-4 p-8 bg-rose-950/40">
      <motion.button
        type="button"
        aria-pressed={liked}
        onClick={() => setLiked((v) => !v)}
        className="rounded-full p-4 bg-white/10 border border-white/15 backdrop-blur"
        whileTap={{ scale: 0.9 }}
      >
        <motion.svg
          width="72"
          height="72"
          viewBox="0 0 24 24"
          fill="none"
          animate={
            liked
              ? {
                  scale: [1, 1.25, 0.95, 1],
                }
              : { scale: 1 }
          }
          transition={{ duration: 0.45 }}
        >
          <motion.path
            d="M12 21s-6.716-4.35-9.33-8.15C.39 9.63 2.04 6 5.5 6c2.04 0 3.29 1.21 3.79 2.07a.5.5 0 0 0 .42.23.5.5 0 0 0 .42-.23C10.71 7.21 11.96 6 14 6c3.46 0 5.11 3.63 2.83 6.85C14.29 16.65 12 21 12 21Z"
            animate={{
              fill: liked ? "#fb7185" : "transparent",
              stroke: liked ? "#fb7185" : "#fda4af",
              strokeWidth: 1.6,
            }}
            transition={{ duration: 0.25 }}
          />
        </motion.svg>
      </motion.button>
      <p className="text-rose-100/80 text-sm">点击切换喜欢状态</p>
    </div>
  );
}
