import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Shops from "./pages/Shops";
import Blog from "./pages/Blog";
import ProductDetail from "./pages/ProductDetail";
import WishlistPage from "./pages/WishlistPage";
import CartDrawer from "./components/CartDrawer";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shops" element={<Shops />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/product/:handle" element={<ProductDetail />} />
        <Route path="/products/:handle" element={<ProductDetail />} />
        <Route path="/collections/all/products/:handle" element={<ProductDetail />} />
        <Route path="/collections/frontpage/products/:handle" element={<ProductDetail />} />
      </Routes>
      <CartDrawer />
    </>
  );
}

export default App;
