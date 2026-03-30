import type { ComponentType } from "react";

/** 面试题难度：初级 / 中级 / 高级 */
export type InterviewAnimationLevel = "beginner" | "intermediate" | "advanced";

/** 单个动画演示的元数据（用于导航与考察点说明） */
export interface InterviewAnimationMeta {
  /** URL 片段，例如 b-spring-in */
  id: string;
  level: InterviewAnimationLevel;
  /** 中文标题 */
  title: string;
  /** 一句话说明适合考察的 React / 动画能力 */
  interviewFocus: string;
  /** 懒加载的演示组件 */
  Component: ComponentType;
}
