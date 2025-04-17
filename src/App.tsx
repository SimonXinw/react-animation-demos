import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import { InfiniteCarousel } from "./pages/InfiniteCarousel";

const App: React.FC = () => (
  <div className="flex flex-col h-screen bg-gray-100">
    {/* Header */}
    <header className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-4 text-center shadow-lg flex-none">
      <h1 className="text-3xl font-bold">动画 Demo 集合</h1>
    </header>

    {/* Main area: sidebar + content */}
    <div className="flex flex-1 overflow-hidden">
      {/* Sidebar Navigation */}
      <nav className="w-64 bg-white shadow-md flex flex-col space-y-4 p-6 overflow-auto">
        <Link
          to="/"
          className="text-blue-600 hover:text-blue-800 text-lg font-medium"
        >
          Home
        </Link>
        <Link
          to="/about"
          className="text-blue-600 hover:text-blue-800 text-lg font-medium"
        >
          About
        </Link>
        <Link
          to="/InfiniteCarousel"
          className="text-blue-600 hover:text-blue-800 text-lg font-medium"
        >
          InfiniteCarousel
        </Link>
      </nav>

      {/* Content Area */}
      <main className="flex-1 w-full p-4 overflow-auto">
        <section className="w-full h-full max-w-7xl bg-white overflow-hidden rounded-lg shadow-lg mx-auto over">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/InfiniteCarousel" element={<InfiniteCarousel />} />
          </Routes>
        </section>
      </main>
    </div>

    {/* Footer */}
    <footer className="bg-gray-800 text-white text-center p-1 flex-none">
      <p>© 2025 动画展示平台</p>
    </footer>
  </div>
);

export default App;
