import { motion } from "framer-motion";

/**
 * 初级 · 骨架屏流光
 * 考察：线性渐变 background + translate 动画、性能（GPU）。
 */
export default function B08SkeletonShimmer() {
  return (
    <div className="min-h-[420px] flex items-center justify-center p-8 bg-white">
      <div className="w-full max-w-sm space-y-4">
        <div className="flex gap-3">
          <div className="relative h-14 w-14 rounded-full overflow-hidden bg-slate-200">
            <motion.div
              className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/70 to-transparent"
              animate={{ x: ["-100%", "200%"] }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </div>
          <div className="flex-1 space-y-2">
            <div className="relative h-4 rounded-md overflow-hidden bg-slate-200">
              <motion.div
                className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/70 to-transparent"
                animate={{ x: ["-100%", "200%"] }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  ease: "linear",
                  delay: 0.1,
                }}
              />
            </div>
            <div className="relative h-4 w-2/3 rounded-md overflow-hidden bg-slate-200">
              <motion.div
                className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/70 to-transparent"
                animate={{ x: ["-100%", "200%"] }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  ease: "linear",
                  delay: 0.2,
                }}
              />
            </div>
          </div>
        </div>
        <p className="text-xs text-slate-500">
          面试可追问：为何用 translate 而不是 left；prefers-reduced-motion
          如何处理。
        </p>
      </div>
    </div>
  );
}
