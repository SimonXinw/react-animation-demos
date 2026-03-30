import { Link } from "react-router-dom";
import { INTERVIEW_LEVEL_NAV } from "./interviewNavConfig";
import { interviewDemos } from "./registry";

/**
 * 面试用动画总目录：按难度分组列出全部 demo，不修改原有业务页面。
 */
export function InterviewAnimationsHub() {
  const grouped = INTERVIEW_LEVEL_NAV.map(({ level, label }) => ({
    level,
    label,
    items: interviewDemos.filter((d) => d.level === level),
  }));

  return (
    <div className="min-h-0 flex-1 overflow-auto p-6 md:p-8 max-w-5xl mx-auto w-full">
      <h1 className="text-xl font-semibold tracking-tight text-slate-900 md:text-2xl mb-1">
        React 动画面试演示集
      </h1>
      <p className="text-slate-600 text-sm leading-relaxed mb-6 max-w-2xl">
        共 {interviewDemos.length} 个独立示例（初级 / 中级 / 高级各 10
        个）。每个页面侧重不同技术点，可按岗位挑选现场编码或讲解。
      </p>

      <div className="space-y-8">
        {grouped.map(({ level, label, items }) => (
          <section key={level}>
            <h2 className="text-lg font-semibold text-slate-700 mb-3 flex items-center gap-2">
              <span
                className={
                  level === "beginner"
                    ? "text-emerald-600"
                    : level === "intermediate"
                      ? "text-amber-600"
                      : "text-rose-600"
                }
              >
                {label.replace(/（\d+）$/, "")}
              </span>
              <span className="text-slate-400 font-normal text-sm">
                （{items.length}）
              </span>
            </h2>
            <ul className="grid gap-2 sm:grid-cols-2">
              {items.map((d) => (
                <li key={d.id}>
                  <Link
                    to={`/interview-animations/${d.id}`}
                    className="block rounded-lg border border-slate-200 bg-slate-50/50 p-4 shadow-sm transition hover:border-slate-300 hover:bg-white hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2"
                  >
                    <div className="text-sm font-medium text-slate-800">{d.title}</div>
                    <div className="text-sm text-slate-500 mt-1.5 leading-snug">
                      {d.interviewFocus}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
