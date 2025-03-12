import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";

const App: React.FC = () => (
  <div className="flex flex-col h-screen">
    <nav className="p-4">
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
    </nav>
    <main className="flex-1 overflow-auto">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </main>
  </div>
);

export default App;
