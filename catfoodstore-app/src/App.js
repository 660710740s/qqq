import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';

// Pages
import HomePage from './pages/HomePage';
import NotFound from './components/NotFound';
import BookListPage from './pages/BookListPage';
import BookDetailPage from './pages/BookDetailPage';
import CategoryPage from './pages/CategoryPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import GuidePage from "./pages/GuidePage";
import ProductPage from "./pages/ProductPage";
import BreedsPage from "./pages/BreedsPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CartPage from "./pages/CartPage";
import ReceiptPage from "./pages/ReceiptPage";
import LoginPage from "./pages/LoginPage";

// ⭐ Admin Page
import AdminProductsPage from "./pages/AdminProductsPage";

function App() {
  return (
    <div className="App">

      {/* TEST TAILWIND */}
      <div className="bg-blue-500 h-10 text-white flex items-center justify-center">
        TEST TAILWIND
      </div>

      <Navbar />

      <main className="main-content min-h-screen px-4 py-6">
        <Routes>
          <Route path="/breeds" element={<BreedsPage />} />

          {/* หน้าแรก */}
          <Route path="/" element={<HomePage />} />

          {/* Dynamic Category */}
          <Route path="/category/:categoryName" element={<CategoryPage />} />

          {/* Books */}
          <Route path="/books" element={<BookListPage />} />
          <Route path="/books/:bookId" element={<BookDetailPage />} />

          {/* Pages */}
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />

          <Route path="/guide" element={<GuidePage />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<ReceiptPage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* ⭐ Admin Route */}
          <Route path="/admin/products" element={<AdminProductsPage />} />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

    </div>
  );
}

export default App;
