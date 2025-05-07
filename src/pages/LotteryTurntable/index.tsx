import React, { useRef, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import "./SpinWheel.css";

const prizes = [
  "一等奖",
  "二等奖",
  "三等奖",
  "谢谢参与",
  "再接再厉",
  "幸运奖",
  "神秘奖",
  "四等奖",
  "五等奖",
  "六等奖",
  "特别奖",
  "再试一次",
];

export const LotteryTurntable = () => {
  const [visible, setVisible] = useState(false);
  const [dragPos, setDragPos] = useState({
    x: 20,
    y: window.innerHeight - 100,
  });
  const [dragging, setDragging] = useState(false);
  const [angle, setAngle] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const dragRef: any = useRef(null);

  const handleMouseDown = (e: any) => {
    setDragging(true);
    dragRef.current.startX = e.clientX;
    dragRef.current.startY = e.clientY;
    dragRef.current.startPos = { ...dragPos };
  };

  const handleMouseMove = (e: any) => {
    if (!dragging) return;
    const dx = e.clientX - dragRef.current.startX;
    const dy = e.clientY - dragRef.current.startY;
    setDragPos({
      x: dragRef.current.startPos.x + dx,
      y: dragRef.current.startPos.y + dy,
    });
  };

  const handleMouseUp = () => {
    if (!dragging) return;
    setDragging(false);
    const snapX =
      dragPos.x < window.innerWidth / 2 ? 20 : window.innerWidth - 80;
    setDragPos({ x: snapX, y: dragPos.y });
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  });

  const startSpin = () => {
    if (spinning) return;

    const winner = Math.floor(Math.random() * prizes.length);
    const anglePerSegment = 360 / prizes.length;
    const rotateTo =
      360 * 5 + (360 - winner * anglePerSegment - anglePerSegment / 2);

    setSpinning(true);
    setAngle(rotateTo);

    setTimeout(() => {
      setSpinning(false);
      alert(`恭喜你抽中了：${prizes[winner]}`);
    }, 5000); // 动画时长一致
  };

  return (
    <>
      <div
        className="spin-button"
        style={{ left: dragPos.x, top: dragPos.y }}
        onMouseDown={handleMouseDown}
        onClick={() => setVisible(true)}
        ref={dragRef}
      >
        抽奖
      </div>

      {visible &&
        createPortal(
          <div className="modal-overlay" onClick={() => setVisible(false)}>
            <div className="wheel-wrapper" onClick={(e) => e.stopPropagation()}>
              <div
                className="wheel"
                style={{
                  transform: `rotate(${angle}deg)`,
                  transition: spinning
                    ? "transform 5s cubic-bezier(0.33, 1, 0.68, 1)"
                    : "none",
                }}
              >
                {prizes.map((text, i) => (
                  <div
                    key={i}
                    className="segment"
                    style={{
                      transform: `rotate(${i * 30}deg)`,
                      backgroundColor: `hsl(${i * 30}, 70%, 80%)`,
                    }}
                  >
                    <span>{text}</span>
                  </div>
                ))}
              </div>
              <div className="pointer" />
              <div className="center-circle" onClick={startSpin}>
                开始结束
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
};

export default LotteryTurntable;
