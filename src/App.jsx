import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Shops from "./pages/Shops";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/shops" element={<Shops />} />
    </Routes>
  );
}

export default App;