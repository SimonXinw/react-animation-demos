import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

/**
 * 中级 · 视差滚动层
 * 考察：useScroll / useTransform、scroll offset 与性能（仅 transform）。
 */
export default function I03ParallaxScroll() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const yBack = useTransform(scrollYProgress, [0, 1], ["0%", "-18%"]);
  const yMid = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 8]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0.4, 1, 1, 0.5]);

  return (
    <div ref={ref} className="h-[520px] overflow-y-auto bg-slate-900 rounded-none">
      <div className="h-[720px] relative">
        <motion.div
          style={{ y: yBack, opacity }}
          className="absolute inset-x-0 top-24 h-64 mx-auto max-w-lg rounded-3xl bg-gradient-to-br from-indigo-600/40 to-fuchsia-600/40 blur-3xl"
        />
        <motion.div
          style={{ y: yMid, rotate }}
          className="absolute left-1/2 -translate-x-1/2 top-32 w-72 h-44 rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl shadow-2xl"
        />
        <div className="absolute left-1/2 -translate-x-1/2 top-52 w-72 text-center text-white">
          <p className="text-sm text-white/70">在此区域内滚动页面</p>
          <p className="text-xs text-white/50 mt-8">
            多层 translate 与轻微 rotate 形成景深。
          </p>
        </div>
      </div>
    </div>
  );
}
