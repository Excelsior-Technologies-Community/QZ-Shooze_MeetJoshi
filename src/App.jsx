import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Shops from "./pages/Shops";
import Blog from "./pages/Blog";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/shops" element={<Shops />} />
      <Route path="/blog" element={<Blog />} />
    </Routes>
  );
}

export default App;
