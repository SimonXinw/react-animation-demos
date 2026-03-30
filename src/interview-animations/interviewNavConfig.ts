import type { InterviewAnimationLevel } from "./types";

/** 侧边栏与目录页共用的难度分组标题（与 registry 中各 10 条对应）。 */
export const INTERVIEW_LEVEL_NAV: {
  level: InterviewAnimationLevel;
  label: string;
}[] = [
  { level: "beginner", label: "初级（10）" },
  { level: "intermediate", label: "中级（10）" },
  { level: "advanced", label: "高级（10）" },
];
