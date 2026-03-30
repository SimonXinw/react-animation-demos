import { motion } from "framer-motion";
import { useState } from "react";

/**
 * 初级 · 下划线跟随 Tabs
 * 考察：layoutId 共享布局动画（Framer Motion 经典题）。
 */
export default function B09TabsUnderline() {
  const tabs = ["概览", "指标", "告警", "设置"];
  const [active, setActive] = useState(0);

  return (
    <div className="min-h-[420px] flex items-center justify-center p-8 bg-slate-950">
      <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-2">
        <div className="relative flex gap-1">
          {tabs.map((label, i) => (
            <button
              key={label}
              type="button"
              onClick={() => setActive(i)}
              className={`relative z-10 px-5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                active === i ? "text-white" : "text-slate-400 hover:text-slate-200"
              }`}
            >
              {active === i && (
                <motion.span
                  layoutId="tab-pill"
                  className="absolute inset-0 rounded-xl bg-indigo-500/90 shadow-lg shadow-indigo-500/20"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  style={{ zIndex: -1 }}
                />
              )}
              <span className="relative">{label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
