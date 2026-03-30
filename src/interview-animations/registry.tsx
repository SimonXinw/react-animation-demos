import { lazy } from "react";
import type { InterviewAnimationMeta } from "./types";

/**
 * 所有面试动画演示的注册表。
 * 使用 React.lazy 按路由拆分，避免首屏加载全部演示代码。
 * 新增演示：在此追加一项，并在 App.tsx 的 Routes 中增加对应 path（或与现有 map 同步）。
 */
export const interviewDemos: InterviewAnimationMeta[] = [
  {
    id: "b-spring-in",
    level: "beginner",
    title: "弹性进场",
    interviewFocus: "spring 参数（stiffness/damping）与 variants 抽象。",
    Component: lazy(() => import("./beginner/B01SpringEntrance")),
  },
  {
    id: "b-stagger-list",
    level: "beginner",
    title: "交错列表显现",
    interviewFocus: "staggerChildren、列表 key 与动画编排可读性。",
    Component: lazy(() => import("./beginner/B02StaggeredList")),
  },
  {
    id: "b-hover-lift",
    level: "beginner",
    title: "悬停卡片抬起",
    interviewFocus: "whileHover、仅用 transform 做抬升以避免重排。",
    Component: lazy(() => import("./beginner/B03HoverLiftCard")),
  },
  {
    id: "b-pulse-cta",
    level: "beginner",
    title: "脉冲注意力按钮",
    interviewFocus: "repeat / repeatType 与层次分离（环与按钮）。",
    Component: lazy(() => import("./beginner/B04PulseCta")),
  },
  {
    id: "b-expand-collapse",
    level: "beginner",
    title: "展开收起",
    interviewFocus: "AnimatePresence、exit 阶段与 height:auto 策略。",
    Component: lazy(() => import("./beginner/B05ExpandCollapse")),
  },
  {
    id: "b-checkbox-draw",
    level: "beginner",
    title: "SVG 勾选绘制",
    interviewFocus: "pathLength、受控状态与 SVG 性能意识。",
    Component: lazy(() => import("./beginner/B06CheckboxDraw")),
  },
  {
    id: "b-progress-spring",
    level: "beginner",
    title: "平滑进度条",
    interviewFocus: "对宽度使用 spring 跟随目标百分比。",
    Component: lazy(() => import("./beginner/B07ProgressBar")),
  },
  {
    id: "b-skeleton-shimmer",
    level: "beginner",
    title: "骨架屏流光",
    interviewFocus: "translate 动画层、遮罩与 prefers-reduced-motion 扩展点。",
    Component: lazy(() => import("./beginner/B08SkeletonShimmer")),
  },
  {
    id: "b-tabs-layout",
    level: "beginner",
    title: "Tabs 共享高亮",
    interviewFocus: "layoutId 共享布局过渡（经典面试题）。",
    Component: lazy(() => import("./beginner/B09TabsUnderline")),
  },
  {
    id: "b-heart-like",
    level: "beginner",
    title: "点赞心形弹跳",
    interviewFocus: "关键帧 scale 序列与轻量状态机。",
    Component: lazy(() => import("./beginner/B10HeartLike")),
  },
  {
    id: "i-layout-morph",
    level: "intermediate",
    title: "共享元素形变",
    interviewFocus: "layoutId + 遮罩层详情；FLIP 感知与点击穿透处理。",
    Component: lazy(() => import("./intermediate/I01LayoutMorph")),
  },
  {
    id: "i-drag-reorder",
    level: "intermediate",
    title: "拖拽重排列表",
    interviewFocus: "Reorder.Group / Item 与受控数组更新。",
    Component: lazy(() => import("./intermediate/I02DragReorder")),
  },
  {
    id: "i-parallax-scroll",
    level: "intermediate",
    title: "视差滚动层",
    interviewFocus: "useScroll、useTransform 与滚动容器 offset。",
    Component: lazy(() => import("./intermediate/I03ParallaxScroll")),
  },
  {
    id: "i-svg-draw",
    level: "intermediate",
    title: "曲线描边与点缀",
    interviewFocus: "pathLength 与延迟子动画组合。",
    Component: lazy(() => import("./intermediate/I04SvgPathDraw")),
  },
  {
    id: "i-flip-3d",
    level: "intermediate",
    title: "3D 翻转卡",
    interviewFocus: "perserve-3d、backfaceVisibility、rotateY。",
    Component: lazy(() => import("./intermediate/I05FlipCard3D")),
  },
  {
    id: "i-modal-spring",
    level: "intermediate",
    title: "弹簧模态",
    interviewFocus: "AnimatePresence 与 spring 质感；可接 focus trap。",
    Component: lazy(() => import("./intermediate/I06ModalSpring")),
  },
  {
    id: "i-number-spring",
    level: "intermediate",
    title: "数字弹簧计数",
    interviewFocus: "useSpring 驱动数值、useTransform 取整展示。",
    Component: lazy(() => import("./intermediate/I07NumberCounter")),
  },
  {
    id: "i-theme-morph",
    level: "intermediate",
    title: "日/夜切换",
    interviewFocus: "主题状态与图标/路径动画联动。",
    Component: lazy(() => import("./intermediate/I08ThemeMorph")),
  },
  {
    id: "i-accordion",
    level: "intermediate",
    title: "手风琴高度动画",
    interviewFocus: "多段折叠、aria-expanded 与 exit 动画。",
    Component: lazy(() => import("./intermediate/I09AccordionHeights")),
  },
  {
    id: "i-magnetic",
    level: "intermediate",
    title: "磁性按钮",
    interviewFocus: "指针坐标映射、边界夹取与 spring 平滑。",
    Component: lazy(() => import("./intermediate/I10MagneticButton")),
  },
  {
    id: "a-inertia-drag",
    level: "advanced",
    title: "惯性拖拽与边界",
    interviewFocus: "dragMomentum、dragConstraints(ref) 与橡皮筋 dragElastic。",
    Component: lazy(() => import("./advanced/A01InertiaDrag")),
  },
  {
    id: "a-particles",
    level: "advanced",
    title: "Canvas 粒子场",
    interviewFocus: "rAF 循环、resize、dpr 与卸载清理。",
    Component: lazy(() => import("./advanced/A02ParticleField")),
  },
  {
    id: "a-blob-morph",
    level: "advanced",
    title: "有机形态切换",
    interviewFocus: "复杂路径用交叉淡化编排，避免不可靠插值。",
    Component: lazy(() => import("./advanced/A03SvgBlobMorph")),
  },
  {
    id: "a-scroll-timeline",
    level: "advanced",
    title: "滚动时间线",
    interviewFocus: "scrollYProgress 多段映射到视觉属性。",
    Component: lazy(() => import("./advanced/A04ScrollTimeline")),
  },
  {
    id: "a-glitch",
    level: "advanced",
    title: "故障风文字",
    interviewFocus: "多层 mix-blend、相位错开与可读性边界。",
    Component: lazy(() => import("./advanced/A05GlitchText")),
  },
  {
    id: "a-cursor-trail",
    level: "advanced",
    title: "弹簧光标拖尾",
    interviewFocus: "链式 useSpring、pointer 坐标系转换。",
    Component: lazy(() => import("./advanced/A06CursorTrail")),
  },
  {
    id: "a-spectrum",
    level: "advanced",
    title: "频谱律动柱",
    interviewFocus: "错 phase 的无限循环与可接音频分析数据。",
    Component: lazy(() => import("./advanced/A07SpectrumBars")),
  },
  {
    id: "a-marquee",
    level: "advanced",
    title: "无限跑马灯",
    interviewFocus: "duplicate 无缝、hover 改变 duration。",
    Component: lazy(() => import("./advanced/A08MarqueePause")),
  },
  {
    id: "a-tilt-glare",
    level: "advanced",
    title: "透视倾斜 + 高光",
    interviewFocus: "useMotionTemplate 拼 radial-gradient；3D 卡片。",
    Component: lazy(() => import("./advanced/A09TiltCard")),
  },
  {
    id: "a-page-flow",
    level: "advanced",
    title: "编排式页面切换",
    interviewFocus: "AnimatePresence mode=\"wait\" 与路由 key 思路。",
    Component: lazy(() => import("./advanced/A10PageTransition")),
  },
];

/** 按 id 查找演示；供路由页解析。 */
export function getDemoById(id: string) {
  const meta = interviewDemos.find((d) => d.id === id);
  if (!meta) return null;
  return { meta, Component: meta.Component };
}
