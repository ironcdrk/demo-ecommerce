import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import HomePage from "./pages/HomePage";
import CategoriesPage from "./pages/CategoriesPage";
import CategoryProductsPage from "./pages/CategoryProductsPage";
import Main from "./components/layout/MainLayout";
import { Routes, Route } from 'react-router-dom';


function App() {
 return (
      <Routes>
        {/* Ruta raíz con layout */}
        <Route path="/" element={<Main />}>
          {/* index = "/" */}
          <Route index element={<HomePage />} />

          {/* otras páginas, mismo layout */}
          <Route path="categories" element={<CategoriesPage />} />
          <Route path="categories/:categoryId/products" element={<CategoryProductsPage />} />
        </Route>
      </Routes>
  );
}

export default App
