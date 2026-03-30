import { motion } from "framer-motion";

/**
 * 初级 · 交错列表显现
 * 考察：staggerChildren、delayChildren、与列表 key 稳定性。
 */
export default function B02StaggeredList() {
  const items = ["布局与测量", "手势与拖拽", "共享元素", "编排与可访问性"];

  return (
    <div className="min-h-[420px] flex items-center justify-center p-8 bg-slate-900">
      <motion.ul
        className="space-y-3 w-full max-w-sm"
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: {
            transition: { staggerChildren: 0.08, delayChildren: 0.15 },
          },
        }}
      >
        {items.map((text, i) => (
          <motion.li
            key={text}
            className="rounded-xl bg-white/10 backdrop-blur border border-white/15 px-4 py-3 text-white/95"
            variants={{
              hidden: { opacity: 0, x: -24 },
              show: { opacity: 1, x: 0 },
            }}
            transition={{ type: "spring", stiffness: 380, damping: 28 }}
          >
            <span className="text-cyan-300/90 text-sm mr-2">{i + 1}.</span>
            {text}
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
}
