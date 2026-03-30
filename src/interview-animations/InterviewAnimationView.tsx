import { Suspense, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { getDemoById, interviewDemos } from "./registry";

export type InterviewAnimationViewProps = {
  /** 显式传入时优先于 URL 参数（与 App 中逐条 Route 一一对应）。 */
  demoId?: string;
};

/**
 * 单个动画全屏演示区：根据 props.demoId 或路由参数解析注册表并渲染对应组件。
 * 外层 Suspense 配合 registry 中的 lazy，避免首屏一次性打包 30 个演示。
 */
export function InterviewAnimationView({ demoId: demoIdProp }: InterviewAnimationViewProps) {
  const { demoId: demoIdParam } = useParams<{ demoId: string }>();
  const demoId = demoIdProp ?? demoIdParam ?? "";

  const entry = useMemo(() => getDemoById(demoId), [demoId]);

  if (!entry) {
    return (
      <div className="p-8 text-center text-gray-600 space-y-4">
        <p>未找到该演示。</p>
        <Link
          to="/interview-animations"
          className="text-blue-600 underline inline-block"
        >
          返回目录
        </Link>
      </div>
    );
  }

  const { meta, Component } = entry;

  return (
    <div className="flex h-full min-h-0 flex-col">
      <header className="shrink-0 border-b border-slate-200 bg-slate-50/90 px-5 py-4">
        <div className="flex flex-wrap items-start gap-4 justify-between">
          <div className="space-y-1.5 min-w-0 pr-2">
            <h2 className="text-base font-semibold text-slate-900 leading-snug md:text-lg">
              {meta.title}
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              {meta.interviewFocus}
            </p>
          </div>
          <Link
            to="/interview-animations"
            className="shrink-0 pt-0.5 text-sm font-medium text-slate-600 underline-offset-4 hover:text-slate-900 hover:underline"
          >
            ← 返回面试动画目录（共 {interviewDemos.length} 个）
          </Link>
        </div>
      </header>

      <div className="flex-1 min-h-0 overflow-auto bg-slate-100/80 p-4 sm:p-5">
        <Suspense
          fallback={
            <div className="flex items-center justify-center h-64 text-slate-500">
              加载演示中…
            </div>
          }
        >
          <Component />
        </Suspense>
      </div>
    </div>
  );
}
