import { motion } from "framer-motion";

/**
 * 初级 · 弹性进场
 * 考察：spring 物理感、initial/animate/transition 与可复用 variants。
 */
export default function B01SpringEntrance() {
  return (
    <div className="min-h-[420px] flex items-center justify-center p-8 bg-gradient-to-br from-violet-100 to-fuchsia-50">
      <motion.div
        className="w-48 h-48 rounded-2xl bg-gradient-to-tr from-violet-500 to-fuchsia-500 shadow-xl flex items-center justify-center text-white font-semibold text-center px-4"
        initial={{ scale: 0, rotate: -12, opacity: 0 }}
        animate={{ scale: 1, rotate: 0, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 18,
          mass: 0.8,
        }}
      >
        Spring 进场
      </motion.div>
    </div>
  );
}
