import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import HeroSlider from "../components/hero/HeroSlider";
import CategoryBlocks from "../components/categories/CategoryBlocks";
import NewArrivals from "../components/products/NewArrivals";
import ProductGrid from "../components/products/ProductGrid";

export default function HomePage() {
  return (
    <div className="app-root">
      <Header />

      <main>
        <HeroSlider />
        <CategoryBlocks />
        <NewArrivals />
        <ProductGrid />
      </main>

      <Footer />
    </div>
  );
}