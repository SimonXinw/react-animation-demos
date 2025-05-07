import React, { useState, useRef, useEffect } from "react";
import { motion, PanInfo } from "framer-motion";
import confetti from "canvas-confetti";

const prizes: string[] = Array.from({ length: 12 }, (_, i) => `奖品${i + 1}`);
const colors: string[] = [
  "#FF8A80",
  "#FFD180",
  "#FFFF8D",
  "#CCFF90",
  "#A7FFEB",
  "#80D8FF",
  "#82B1FF",
  "#B388FF",
  "#F8BBD0",
  "#D1C4E9",
  "#C5E1A5",
  "#FFAB91",
];

export function LotteryTurntable() {
  const [showWheel, setShowWheel] = useState<boolean>(false);
  const [rotation, setRotation] = useState<number>(0);
  const [spinning, setSpinning] = useState<boolean>(false);
  const [btnPosition, setBtnPosition] = useState<{ x: number; y: number }>({
    x: 20,
    y: 300,
  });
  const [winner, setWinner] = useState<string | null>(null);

  const [preDecide, setPreDecide] = useState<boolean>(true);

  const btnRef = useRef<HTMLDivElement | null>(null);

  const radius = 150;
  const center = radius + 10;
  const anglePerPrize = 360 / prizes.length;

  // 先计算奖品再滚动
  const handlePreDecideSpin = () => {
    if (spinning) return;
    setSpinning(true);
    setWinner(null);

    // 随机目标索引
    const targetIndex = Math.floor(Math.random() * prizes.length);
    const realPrize = prizes[targetIndex];

    // 目标奖项中间角度
    const prizeMiddleDegree = targetIndex * anglePerPrize + anglePerPrize / 2;
    const extraRounds = 5;
    // +90 是因为指针在12点的位置，转盘指向0度默认在3点，所以加偏移
    const finalRotation = extraRounds * 360 + (360 - prizeMiddleDegree + 90);

    setRotation((prev) => prev + finalRotation);

    setTimeout(() => {
      setWinner(realPrize);
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      setSpinning(false);
    }, 4000);
  };

  // 先滚动，（后算奖品）
  const handleRandomSpin = () => {
    if (spinning) return;
    setSpinning(true);
    setWinner(null);

    const extraSpins = 5;
    const randomOffset = Math.random() * 360;
    const targetRotation = extraSpins * 360 + randomOffset;

    setRotation((prev) => prev + targetRotation);

    setTimeout(() => {
      const finalAngle = (rotation + targetRotation + 105 + 360) % 360;
      const index = Math.floor(
        ((360 - finalAngle + anglePerPrize / 2) % 360) / anglePerPrize
      );
      const realPrize = prizes[index];

      setWinner(realPrize);
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      setSpinning(false);
    }, 4000);
  };

  // 根据开关选择逻辑
  const handleSpin = () => {
    preDecide ? handlePreDecideSpin() : handleRandomSpin();
  };

  // 拖动按钮结束
  const handleDragEnd = (_: any, info: PanInfo) => {
    setBtnPosition((pos) => ({ x: pos.x, y: info.point.y }));
  };

  useEffect(() => {
    const snapY = Math.max(
      20,
      Math.min(window.innerHeight - 80, btnPosition.y)
    );
    setBtnPosition((pos) => ({ ...pos, y: snapY }));
    // eslint-disable-next-line
  }, [btnPosition.x]); // 仅 x改动时校正y

  return (
    <>
      {/* 玩法开关 */}
      <div className="fixed top-2 left-2 z-50 bg-white/90 rounded p-1 shadow">
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={preDecide}
            onChange={() => setPreDecide((v) => !v)}
          />
          先抽奖项后动画滚动
        </label>
      </div>

      {/* 抽奖按钮 */}
      <motion.div
        className="fixed w-16 h-16 rounded-full bg-red-500 text-white flex items-center justify-center z-50 cursor-pointer"
        style={{ left: btnPosition.x, top: btnPosition.y }}
        drag
        dragMomentum={false}
        dragElastic={0}
        ref={btnRef}
        onDragEnd={handleDragEnd}
        onClick={() => setShowWheel(true)}
      >
        抽奖
      </motion.div>

      {/* 抽奖转盘 */}
      {showWheel && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="relative">
            {/* 指针 */}
            <div className="absolute top-[8px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[10px] border-r-[10px] border-t-[30px] border-l-transparent border-r-transparent border-t-red-600 z-10" />
            {/* 转盘SVG */}
            <motion.svg
              animate={{ rotate: rotation }}
              transition={{ duration: 4, ease: "easeInOut" }}
              width={center * 2}
              height={center * 2}
            >
              <g transform={`translate(${center},${center})`}>
                {prizes.map((text, i) => {
                  const startAngle = i * anglePerPrize;
                  const endAngle = (i + 1) * anglePerPrize;
                  const x1 = radius * Math.cos((startAngle * Math.PI) / 180);
                  const y1 = radius * Math.sin((startAngle * Math.PI) / 180);
                  const x2 = radius * Math.cos((endAngle * Math.PI) / 180);
                  const y2 = radius * Math.sin((endAngle * Math.PI) / 180);

                  const largeArc = anglePerPrize > 180 ? 1 : 0;
                  const pathData = `M0,0 L${x1},${y1} A${radius},${radius} 0 ${largeArc},1 ${x2},${y2} Z`;

                  const angle = (startAngle + endAngle) / 2;
                  const textX =
                    0.7 * radius * Math.cos((angle * Math.PI) / 180);
                  const textY =
                    0.7 * radius * Math.sin((angle * Math.PI) / 180);

                  return (
                    <g key={i}>
                      <path
                        d={pathData}
                        fill={colors[i % colors.length]}
                        stroke="#fff"
                        strokeWidth={2}
                      />
                      <text
                        x={textX}
                        y={textY}
                        transform={`rotate(${angle + 90}, ${textX}, ${textY})`}
                        textAnchor="middle"
                        alignmentBaseline="middle"
                        style={{ fontSize: 14, whiteSpace: "pre" }}
                      >
                        {text.split("").join("\n")}
                      </text>
                    </g>
                  );
                })}
              </g>
            </motion.svg>
            {/* 中心按钮 */}
            <div
              className="absolute inset-0 flex items-center justify-center"
              onClick={handleSpin}
            >
              <div className="w-20 h-20 rounded-full bg-white border-4 border-red-600 flex items-center justify-center text-lg font-bold cursor-pointer">
                {spinning ? "结束" : "开始"}
              </div>
            </div>
          </div>

          {/* 关闭按钮 */}
          <button
            className="absolute top-4 right-4 text-white text-xl"
            onClick={() => setShowWheel(false)}
          >
            ×
          </button>

          {/* 中奖弹窗 */}
          {winner && (
            <div className="absolute bottom-10 bg-white px-4 py-2 rounded text-red-600 font-bold shadow-xl">
              恭喜你抽中：{winner}
            </div>
          )}
        </div>
      )}
    </>
  );
}
