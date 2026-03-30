import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import { InfiniteCarousel } from "./pages/InfiniteCarousel";
import { LotteryTurntable } from "./pages/LotteryTurntable";
import { MajoyScoreAnalysis } from "./pages/MajoyScoreAnalysis";
import { InterviewAnimationsHub } from "./interview-animations/InterviewAnimationsHub";
import { InterviewAnimationView } from "./interview-animations/InterviewAnimationView";
import { interviewDemos } from "./interview-animations/registry";
import { AppSidebar } from "./layout/AppSidebar";

/**
 * 应用壳：页头 / 侧栏 / 主内容 / 页脚统一浅色体系与字号层级（与具体动画 demo 解耦）。
 */
const App: React.FC = () => (
  <div className="flex h-screen min-h-0 flex-col bg-slate-100 text-slate-900 antialiased">
    <header className="shrink-0 border-b border-slate-200 bg-white px-6 py-3 shadow-sm">
      <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
        <h1 className="text-lg font-semibold tracking-tight text-slate-900 sm:text-xl">
          动画 Demo 集合
        </h1>
        <p className="text-sm text-slate-500">
          React · Vite · Tailwind — 布局与演示分区导航
        </p>
      </div>
    </header>

    <div className="flex min-h-0 flex-1">
      <AppSidebar />

      <main className="flex min-h-0 min-w-0 flex-1 flex-col overflow-auto p-4 md:p-6">
        <div className="mx-auto flex min-h-0 w-full max-w-7xl flex-1 flex-col overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-sm">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/InfiniteCarousel" element={<InfiniteCarousel />} />
            <Route path="/lottery-turntable" element={<LotteryTurntable />} />
            <Route
              path="/majoy-score-analysis"
              element={<MajoyScoreAnalysis />}
            />
            <Route
              path="/interview-animations"
              element={<InterviewAnimationsHub />}
            />
            {interviewDemos.map((d) => (
              <Route
                key={d.id}
                path={`/interview-animations/${d.id}`}
                element={<InterviewAnimationView demoId={d.id} />}
              />
            ))}
            <Route
              path="/interview-animations/*"
              element={<Navigate to="/interview-animations" replace />}
            />
          </Routes>
        </div>
      </main>
    </div>

    <footer className="shrink-0 border-t border-slate-200 bg-white px-4 py-3 text-center text-xs text-slate-500">
      <p>© 2026 动画展示平台</p>
    </footer>
  </div>
);

export default App;
