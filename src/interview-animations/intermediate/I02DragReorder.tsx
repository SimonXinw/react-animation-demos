import { Reorder } from "framer-motion";
import { useState } from "react";

/**
 * 中级 · 拖拽重排列表
 * 考察：Reorder.Group / Item、拖动时布局与动量、受控数组更新。
 */
export default function I02DragReorder() {
  const [items, setItems] = useState(["React", "Motion", "Gesture", "Canvas"]);

  return (
    <div className="min-h-[480px] flex items-center justify-center p-8 bg-zinc-100">
      <Reorder.Group
        axis="y"
        values={items}
        onReorder={setItems}
        className="w-full max-w-sm space-y-2"
      >
        {items.map((item) => (
          <Reorder.Item
            key={item}
            value={item}
            className="cursor-grab active:cursor-grabbing rounded-xl border border-zinc-200 bg-white px-4 py-3 shadow-sm list-none"
            whileDrag={{ scale: 1.02, boxShadow: "0 12px 40px rgb(0 0 0 / 0.12)" }}
          >
            <span className="font-medium text-zinc-800">{item}</span>
            <span className="block text-xs text-zinc-500 mt-1">
              按住拖动改变顺序
            </span>
          </Reorder.Item>
        ))}
      </Reorder.Group>
    </div>
  );
}
