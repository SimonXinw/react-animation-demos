import { NavLink } from "react-router-dom";
import { interviewDemos } from "../interview-animations/registry";
import { INTERVIEW_LEVEL_NAV } from "../interview-animations/interviewNavConfig";

/** 主导航：统一字号与点击区域，避免 text-lg / text-xs 混用造成层次混乱。 */
const PRIMARY_LINKS: { to: string; label: string }[] = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/InfiniteCarousel", label: "Infinite Carousel" },
  { to: "/lottery-turntable", label: "Lottery Turntable" },
  { to: "/majoy-score-analysis", label: "Majoy Score Analysis" },
];

const navItem =
  "block rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-150 outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2";

function navClassName(active: boolean) {
  return active
    ? `${navItem} bg-slate-200 text-slate-900`
    : `${navItem} text-slate-600 hover:bg-slate-50 hover:text-slate-900`;
}

/**
 * 应用壳左侧导航：分组标题 + 一致行高，面试子链与主导航同为 sm 字号以便阅读。
 */
export function AppSidebar() {
  return (
    <aside
      className="flex w-72 shrink-0 flex-col border-r border-slate-200 bg-white"
      aria-label="主导航"
    >
      <div className="border-b border-slate-100 px-4 py-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          页面
        </p>
        <p className="mt-1 text-sm font-semibold text-slate-800">演示导航</p>
      </div>

      <nav className="flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto overflow-x-hidden px-3 py-3">
        {PRIMARY_LINKS.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/"}
            className={({ isActive }) => navClassName(isActive)}
          >
            {label}
          </NavLink>
        ))}

        <div className="my-3 border-t border-slate-200 pt-3">
          <p className="px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
            面试动画（30）
          </p>
          <NavLink
            to="/interview-animations"
            end
            className={({ isActive }) =>
              `${navClassName(isActive)} mt-2 text-slate-700`
            }
          >
            总目录
          </NavLink>

          {INTERVIEW_LEVEL_NAV.map(({ level, label }) => (
            <div key={level} className="mt-4 space-y-1">
              <p className="px-3 text-xs font-semibold text-slate-500">{label}</p>
              <ul className="space-y-0.5 border-l border-slate-200 pl-2 ml-3">
                {interviewDemos
                  .filter((d) => d.level === level)
                  .map((d) => (
                    <li key={d.id}>
                      <NavLink
                        to={`/interview-animations/${d.id}`}
                        title={`${d.id} — ${d.interviewFocus}`}
                        className={({ isActive }) =>
                          isActive
                            ? "block rounded-md py-1.5 pl-2 pr-2 text-sm font-medium text-slate-900 bg-slate-100"
                            : "block rounded-md py-1.5 pl-2 pr-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                        }
                      >
                        {d.title}
                      </NavLink>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
      </nav>
    </aside>
  );
}
