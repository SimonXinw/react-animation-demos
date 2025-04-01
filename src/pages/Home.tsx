import React, { useEffect } from "react";
import { useSpring, animated } from "@react-spring/web";
import { createUseGesture, dragAction, pinchAction } from "@use-gesture/react";

import styles from "./styles.module.css";

const useGesture = createUseGesture([dragAction, pinchAction]);

export default function App() {
  useEffect(() => {
    const handler = (e: Event) => e.preventDefault();
    document.addEventListener("gesturestart", handler);
    document.addEventListener("gesturechange", handler);
    document.addEventListener("gestureend", handler);
    return () => {
      document.removeEventListener("gesturestart", handler);
      document.removeEventListener("gesturechange", handler);
      document.removeEventListener("gestureend", handler);
    };
  }, []);

  const [style, api] = useSpring(() => ({
    x: 0,
    y: 0,
    scale: 1,
    rotateZ: 0,
    immediate: true,
  }));
  const ref = React.useRef<HTMLDivElement>(null);

  const styleWrap = {
    position: "relative",
    width: "fit-content",
    height: "fit-content",
    backgroundSize: "cover",
    borderRadius: "5px",
    boxShadow: "0px 10px 30px -5px rgba(0, 0, 0, 0.3)",
    willChange: "transform",
    border: "10px solid white",
    cursor: "grab",
    touchAction: "none",
    userSelect: "none",
    WebkitUserSelect: "none",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "500",
    fontSize: "22px",
    padding: "20px",
    textAlign: "center",
    color: "#ffffffaa",
  };

  useGesture(
    {
      // onHover: ({ active, event }) => console.log('hover', event, active),
      // onMove: ({ event }) => console.log('move', event),
      onDrag: ({ pinching, cancel, offset: [x, y], ...rest }) => {
        if (pinching) return cancel();
        api.start({ x, y, immediate: true });
      },
      onPinch: ({
        origin: [ox, oy],
        first,
        movement: [ms],
        offset: [s, a],
        memo,
      }) => {
        if (first) {
          const { width, height, x, y } = ref.current!.getBoundingClientRect();
          const tx = ox - (x + width / 2);
          const ty = oy - (y + height / 2);
          memo = [style.x.get(), style.y.get(), tx, ty];
        }

        const x = memo[0] - (ms - 1) * memo[2];
        const y = memo[1] - (ms - 1) * memo[3];
        api.start({ scale: s, rotateZ: a, x, y });
        return memo;
      },
    },
    {
      target: ref,
      drag: { from: () => [style.x.get(), style.y.get()] },
      pinch: { scaleBounds: { min: 0.5, max: 2 }, rubberband: true },
    }
  );

  return (
    <div className={`flex fill center `} style={{ backgroundColor: "pink" }}>
      <animated.div className={styleWrap} ref={ref} style={style}>
        <img
          src="https://cdn.shopify.com/s/files/1/0668/4970/2037/files/pro2-stand-rise.jpg?v=1742218261&w=1920&q=90"
          alt="Draggable"
          style={{
            width: "200px", // 设置宽高
            height: "200px",
            userSelect: "none", // 禁止选中文本
          }}
        />
      </animated.div>
    </div>
  );
}
