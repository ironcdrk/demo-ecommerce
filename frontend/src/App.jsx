import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import HomePage from "./pages/HomePage";
import CategoriesPage from "./pages/CategoriesPage";
import CategoryProductsPage from "./pages/CategoryProductsPage";
import { Routes, Route } from 'react-router-dom';


function App() {
  return (
    <Routes>
      {/* / -> HomePage */}
      <Route path="/" element={<HomePage />} />

      {/* /category/:slug -> CategoriesPage */}
      <Route path="/category/:slug" element={<CategoriesPage />} />
      
      {/* /categories/:categoryId/products -> CategoryProductsPage */}
      <Route path="/categories/:categoryId/products" element={<CategoryProductsPage />} />
    </Routes>
  )
}

export default App
