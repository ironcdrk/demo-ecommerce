import './App.css'
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import CategoriesPage from "./pages/CategoriesPage";
import CategoryProductsPage from "./pages/CategoryProductsPage";
import Main from "./components/layout/MainLayout";
import { Routes, Route } from 'react-router-dom';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import MainLayout from './components/layout/MainLayout';


function App() {
 return (
      <Routes>
          {/* Ruta raíz con layout */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="categories" element={<CategoriesPage />} />
            <Route path="categories/:categoryId/products" element={<CategoryProductsPage />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
          </Route>
          <Route path="/login" element={<LoginPage />} />
      </Routes>
  );
}

export default App
