import { Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";

import Home from "./pages/Home";
import Shops from "./pages/Shops";
import Blog from "./pages/Blog";
import ProductDetail from "./pages/ProductDetail";
import WishlistPage from "./pages/WishlistPage";
import CartDrawer from "./components/CartDrawer";

function NotFound() {
  return (
    <div style={{ textAlign: 'center', padding: '80px 20px' }}>
      <h1 style={{ fontSize: '48px', fontWeight: 700, marginBottom: '12px' }}>404</h1>
      <p style={{ fontSize: '16px', color: '#666', marginBottom: '24px' }}>Page not found</p>
      <a href="/" style={{ color: '#ae3f4f', textDecoration: 'underline' }}>Go back home</a>
    </div>
  );
}

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shops" element={<Shops />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/product/:handle" element={<ProductDetail />} />
        <Route path="/products/:handle" element={<ProductDetail />} />
        <Route path="/collections/all/products/:handle" element={<ProductDetail />} />
        <Route path="/collections/frontpage/products/:handle" element={<ProductDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <CartDrawer />
    </>
  );
}

export default App;
