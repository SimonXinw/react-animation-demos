import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

/**
 * 高级 · 滚动驱动时间线
 * 考察：useScroll 的 offset 语义、useTransform 多段映射、与容器滚动嵌套。
 */
export default function A04ScrollTimeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const hue = useTransform(scrollYProgress, [0, 1], [260, 40]);
  const barScaleX = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.08, 1, 1, 0.08]);
  const labelColor = useTransform(hue, (h) => `hsl(${h} 90% 72%)`);

  return (
    <div
      ref={ref}
      className="h-[560px] overflow-y-auto bg-black rounded-none"
    >
      <div className="sticky top-0 h-48 flex flex-col items-center justify-center gap-3 border-b border-white/10">
        <motion.div
          className="h-2 w-64 rounded-full bg-white/10 overflow-hidden origin-left"
          style={{ scaleX: barScaleX }}
        />
        <motion.p
          className="text-sm font-medium"
          style={{ color: labelColor }}
        >
          向下滚动驱动色相与进度条
        </motion.p>
      </div>
      <div className="h-[900px] px-6 py-8 text-white/50 text-sm space-y-4">
        {Array.from({ length: 12 }, (_, i) => (
          <p key={i}>
            段落 {i + 1}：滚动进度映射到动画时间是常见高级题，可追问是否做过 scrub
            video / Lottie。
          </p>
        ))}
      </div>
    </div>
  );
}
