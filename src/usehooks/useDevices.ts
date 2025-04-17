import { useEffect, useRef, useState } from "react";

export interface BrowserInfoType {
  isSamsung: boolean;
  isSafari: boolean;
  isChrome: boolean;
  isMobile: boolean;
  isDesktop: boolean;
  screenWidth: number;
  screenHeight: number;
}

// 使用 useState 的版本
export function useBrowserInfoState(): BrowserInfoType {
  const [browserInfo, setBrowserInfo] = useState<BrowserInfoType>({
    isSamsung: false,
    isSafari: false,
    isChrome: false,
    isMobile: false,
    isDesktop: true,
    screenWidth: 0,
    screenHeight: 0,
  });

  useEffect(() => {
    const userAgent = navigator?.userAgent || "";

    // 获取屏幕宽度和高度
    const screenWidth = window?.innerWidth || screen.width;
    const screenHeight = window?.innerHeight || screen.height;

    // 浏览器检测
    const isSamsung = /SamsungBrowser/i.test(userAgent);
    const isSafari =
      !isSamsung && /^((?!chrome|android).)*safari/i.test(userAgent);
    const isChrome =
      !isSamsung && !isSafari && /chrome|chromium|crios/i.test(userAgent);

    // 设备类型检测：userAgent 匹配 + 屏幕宽度小于等于 768px
    const isMobile =
      /iPhone|iPad|iPod|Android|Windows Phone/i.test(userAgent) ||
      screenWidth <= 768;
    const isDesktop = !isMobile; // 互斥

    // 更新状态
    setBrowserInfo({
      isSamsung,
      isSafari,
      isChrome,
      isMobile,
      isDesktop,
      screenWidth,
      screenHeight,
    });
  }, []);

  return browserInfo;
}

// 使用 useRef 的版本
export function useBrowserInfoRef(): BrowserInfoType {
  const browserInfoRef = useRef<BrowserInfoType>({
    isSamsung: false,
    isSafari: false,
    isChrome: false,
    isMobile: false,
    isDesktop: true,
    screenWidth: 0,
    screenHeight: 0,
  });

  useEffect(() => {
    const userAgent = navigator?.userAgent || "";

    // 获取屏幕宽度和高度
    const screenWidth = window?.innerWidth || screen.width;
    const screenHeight = window?.innerHeight || screen.height;

    // 浏览器检测
    const isSamsung = /SamsungBrowser/i.test(userAgent);
    const isSafari =
      !isSamsung && /^((?!chrome|android).)*safari/i.test(userAgent);
    const isChrome =
      !isSamsung && !isSafari && /chrome|chromium|crios/i.test(userAgent);

    // 设备类型检测：userAgent 匹配 + 屏幕宽度小于等于 768px
    const isMobile =
      /iPhone|iPad|iPod|Android|Windows Phone/i.test(userAgent) ||
      screenWidth <= 768;
    const isDesktop = !isMobile; // 互斥

    // 更新 ref 的值
    browserInfoRef.current = {
      isSamsung,
      isSafari,
      isChrome,
      isMobile,
      isDesktop,
      screenWidth,
      screenHeight,
    };
  }, []);

  return browserInfoRef.current;
}
