import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";

const App: React.FC = () => (
  <div className="flex flex-col h-screen bg-gray-100">
    {/* Header with Title */}
    <header className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-4 text-center shadow-lg flex-none">
      <h1 className="text-3xl font-bold text-center">动画 Demo 集合</h1>
    </header>

    {/* Navigation Bar */}
    <nav className="flex justify-center space-x-8 bg-white shadow-md py-3 flex-none">
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
    </nav>

    {/* Animation Display Area */}
    <main className="flex-1 w-full flex items-center justify-center p-6">
      <section className="w-full h-full max-w-5xl bg-white p-6 rounded-lg shadow-lg overflow-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          {/* Add other routes for your demo animations here */}
          {/* Example: */}
          {/* <Route path="/demo1" element={<Demo1 />} /> */}
          {/* <Route path="/demo2" element={<Demo2 />} /> */}
          {/* <Route path="/demo3" element={<Demo3 />} /> */}
        </Routes>
      </section>
    </main>

    {/* Footer */}
    <footer className="bg-gray-800 text-white text-center p-4 flex-none">
      <p>© 2025 动画展示平台</p>
    </footer>
  </div>
);

export default App;
