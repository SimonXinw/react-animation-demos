"use client";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useBrowserInfoState } from "../../usehooks/useDevices";
import { OnlyMobile } from "../../theme/utils";

export interface CarouselImageType {
  src: string;
  alt: string;
  width?: number | string;
  height?: number;
}

export const InfiniteCarousel = ({
  images,
}: {
  images?: CarouselImageType[];
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const userInteracting = useRef(false);
  const [listWidth, setListWidth] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const { isMobile } = useBrowserInfoState();

  const gap = isMobile ? 24 : 72;
  const size = isMobile ? 60 : 80;
  const imageCount = 11;

  const defaultImages: CarouselImageType[] = Array.from(
    { length: imageCount },
    (_, i) => ({
      src: `https://cdn.shopify.com/s/files/1/0668/4970/2037/files/vision_master_award_icon_${
        i + 1
      }.png?v=1744798582`,
      height: size,
      width: "auto",
      alt: `Vision Master Award Icon ${i + 1}`,
    })
  );

  const data = images || defaultImages;

  // 当组件进入视口时才播放动画
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setTimeout(() => {
          setIsInView(!!entry?.isIntersecting);
        }, 1500);
      },
      { threshold: 0.1 }
    );

    if (scrollRef.current) {
      observer.observe(scrollRef.current);
    }

    return () => {
      if (scrollRef.current) observer.unobserve(scrollRef.current);
    };
  }, []);

  // 自动无限滚动
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let animationFrame: number;
    let lastTime = performance.now();
    const speed = 60; // px/s

    const tick = (now: number) => {
      const delta = now - lastTime;
      lastTime = now;

      if (!userInteracting.current && isInView && listWidth > 0) {
        container.scrollLeft += (speed * delta) / 1000;

        if (container.scrollLeft >= listWidth) {
          container.scrollLeft -= listWidth;
        }
      }

      animationFrame = requestAnimationFrame(tick);
    };

    animationFrame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animationFrame);
  }, [listWidth, isInView]);

  // 初始化列表宽度
  useEffect(() => {
    const updateWidth = () => {
      const container = scrollRef.current;
      if (container) {
        const firstHalf = container.querySelector(
          ".scroller-half"
        ) as HTMLDivElement;
        if (firstHalf) setListWidth(firstHalf.scrollWidth);
      }
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  // 拖动支持（鼠标 + 移动端）
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const onDown = (x: number) => {
      isDragging.current = true;
      startX.current = x - container.offsetLeft;
      scrollLeft.current = container.scrollLeft;
      userInteracting.current = true;
    };

    const onMove = (x: number) => {
      if (!isDragging.current) return;
      const walk = x - container.offsetLeft - startX.current;
      container.scrollLeft = scrollLeft.current - walk;
    };

    const onUp = () => {
      if (isDragging.current) {
        isDragging.current = false;
        setTimeout(() => {
          userInteracting.current = false;
        }, 3000);
      }
    };

    const mouseDown = (e: MouseEvent) => onDown(e.pageX);
    const mouseMove = (e: MouseEvent) => onMove(e.pageX);
    const mouseUp = () => onUp();

    const touchStart = (e: TouchEvent) =>
      onDown(e?.touches[0]?.pageX as number);
    const touchMove = (e: TouchEvent) => onMove(e?.touches[0]?.pageX as number);
    const touchEnd = () => onUp();

    container.addEventListener("mousedown", mouseDown);
    window.addEventListener("mousemove", mouseMove);
    window.addEventListener("mouseup", mouseUp);

    container.addEventListener("touchstart", touchStart);
    container.addEventListener("touchmove", touchMove);
    container.addEventListener("touchend", touchEnd);

    return () => {
      container.removeEventListener("mousedown", mouseDown);
      window.removeEventListener("mousemove", mouseMove);
      window.removeEventListener("mouseup", mouseUp);
      container.removeEventListener("touchstart", touchStart);
      container.removeEventListener("touchmove", touchMove);
      container.removeEventListener("touchend", touchEnd);
    };
  }, []);

  return (
    <ScrollWrapper ref={scrollRef} $gap={gap}>
      <div className="scroller-half" style={{ display: "flex", gap }}>
        {data.map((image, i) => (
          <img
            key={`original-${i}`}
            height={size}
            width="auto"
            {...image}
            style={{ flexShrink: 0, pointerEvents: "none", height: size }}
          />
        ))}
      </div>
      <div style={{ display: "flex", gap }}>
        {data.map((image, i) => (
          <img
            key={`clone-${i}`}
            height={size}
            width="auto"
            {...image}
            style={{ flexShrink: 0, pointerEvents: "none", height: size }}
          />
        ))}
      </div>
    </ScrollWrapper>
  );
};

const ScrollWrapper = styled.div<{ $gap: number }>`
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  scroll-behavior: auto;
  gap: ${({ $gap }) => $gap}px;
  -webkit-overflow-scrolling: touch;
  padding-top: 40px;
  padding-left: calc(50% - 720px);
  ${OnlyMobile} {
    padding-left: 16px;
  }
  cursor: grab;
  user-select: none;

  img {
    width: auto;
  }

  &::-webkit-scrollbar {
    display: none;
  }
`;
