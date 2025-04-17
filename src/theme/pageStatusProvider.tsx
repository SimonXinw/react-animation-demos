"use client";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import React, { createContext, useEffect, useRef, useState } from "react";
import { darkTheme } from "./themeColors";

interface StatusType {
  preloaded: boolean;
  isMobile: boolean | undefined;
  isTouch: boolean | undefined;
  isCartActive: boolean;
  setCartActive: (arg0: boolean) => void;
  isBodyScrollLocked: boolean;
  setIsBodyScrollLocked: (arg0: boolean) => void;
  isCartEmpty: boolean;
  setCartEmpty: (arg0: boolean) => void;
  isNavSecond: boolean;
  setNavSecondActive: (arg0: boolean) => void;
  productNavActive: boolean;
  setProductNavActive: (arg0: boolean) => void;
}

export const PageStatusContext = createContext<StatusType>({
  preloaded: false,
  isMobile: undefined,
  isTouch: undefined,
  isCartActive: false,
  setCartActive: () => null,
  isBodyScrollLocked: false,
  setIsBodyScrollLocked: () => null,
  isCartEmpty: true,
  setCartEmpty: () => null,
  isNavSecond: false,
  setNavSecondActive: () => null,

  productNavActive: false,
  setProductNavActive: () => null,
});

export const PageStatusProvider = (props: React.PropsWithChildren) => {
  /*
    Calculate Viewport Width
    Needed to respect visible scrollbar width
  */
  const resizeRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const target = resizeRef.current;
    if (!target) {
      return;
    }
    function update() {
      document.documentElement.style.setProperty(
        "--fullWidth",
        target?.clientWidth + "px"
      );
    }
    const resizeObserver = new ResizeObserver(() => update());
    resizeObserver.observe(target);
    update();
    return () => resizeObserver.unobserve(target);
  }, []);
  const [preloaderState, setPreloaderState] = useState<
    "in" | "shown" | "out" | "gone"
  >("in");
  const [mainStyle, setMainStyle] = useState<React.CSSProperties>({
    overflowX: "hidden",
    maxWidth: "100vw",
  });

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
    setPreloaderState("out");
    setTimeout(() => {
      setPreloaderState("gone");
      setMainStyle({ overflowX: "visible", maxWidth: "none" }); // 重置样式
    }, 1800);
  }, []);

  /* Check Mobile Ratio & Touch (consistent with CSS utils) */
  const [isMobile, setIsMobile] = useState<boolean | undefined>(undefined);
  const [isTouch, setIsTouch] = useState<boolean | undefined>(undefined);
  useEffect(() => {
    if (!window) {
      return;
    }
    const checkMobile = () => {
      setIsMobile(window.matchMedia("(max-aspect-ratio: 1000 / 1001)").matches);
      setIsTouch(window.matchMedia("(pointer: coarse)").matches);
    };
    window.addEventListener("resize", checkMobile);
    checkMobile();
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const [isBodyScrollLocked, setIsBodyScrollLocked] = useState<boolean>(false);
  const [isCartActive, setCartActive] = useState<boolean>(false);
  const [isCartEmpty, setCartEmpty] = useState<boolean>(false);
  const [isNavSecond, setNavSecondActive] = useState<boolean>(false);
  const [productNavActive, setProductNavActive] = useState(false);

  return (
    <main style={{ position: "relative", ...mainStyle }}>
      <div
        ref={resizeRef}
        style={{ position: "fixed", left: "0", right: "0", maxWidth: "100vw" }}
      />
      <ProgressBar
        height="2px"
        color="#ffd670"
        options={{ showSpinner: false }}
        shallowRouting
      />
      <PageStatusContext.Provider
        value={{
          preloaded: preloaderState === "gone",
          isMobile: isMobile,
          isTouch: isTouch,
          isCartActive: isCartActive,
          setCartActive: (arg0: boolean) => setCartActive(arg0),
          isBodyScrollLocked: isBodyScrollLocked,
          setIsBodyScrollLocked: (arg0: boolean) => setIsBodyScrollLocked(arg0),
          isCartEmpty: isCartEmpty,
          setCartEmpty: (arg0: boolean) => setCartEmpty(arg0),
          isNavSecond: isNavSecond,
          setNavSecondActive: (arg0: boolean) => setNavSecondActive(arg0),
          productNavActive,
          setProductNavActive: (arg0: boolean) => setProductNavActive(arg0),
        }}
      >
        {preloaderState !== "gone" && (
          <div
            style={{
              position: "fixed",
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
              backgroundColor: darkTheme.background,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 1000,
              pointerEvents: "none",
              transition: `opacity 1.2s ease 0.6s`,
              opacity: preloaderState === "out" ? 0 : 1,
            }}
          />
        )}
        {props.children}
      </PageStatusContext.Provider>
    </main>
  );
};
