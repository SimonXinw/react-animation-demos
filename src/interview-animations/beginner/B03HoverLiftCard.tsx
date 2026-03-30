import { motion } from "framer-motion";

/**
 * 初级 · 悬停卡片抬起
 * 考察：whileHover、阴影与 transform 合成层、避免布局抖动。
 */
export default function B03HoverLiftCard() {
  return (
    <div className="min-h-[420px] flex items-center justify-center p-8 bg-stone-100">
      <motion.article
        className="w-72 rounded-2xl bg-white p-6 shadow-md border border-stone-200/80 cursor-default"
        whileHover={{
          y: -10,
          scale: 1.02,
          boxShadow: "0 24px 50px -12px rgb(0 0 0 / 0.22)",
        }}
        transition={{ type: "spring", stiffness: 400, damping: 22 }}
      >
        <div className="h-28 rounded-xl bg-gradient-to-br from-amber-200 to-orange-300 mb-4" />
        <h3 className="font-semibold text-stone-800">Hover Lift</h3>
        <p className="text-sm text-stone-600 mt-2 leading-relaxed">
          使用 transform 做位移与缩放，配合 spring 过渡，比纯 CSS 更易与 React
          状态组合。
        </p>
      </motion.article>
    </div>
  );
}
