import HeroSlider from "../components/hero/HeroSlider";
import CategoryBlocks from "../components/categories/CategoryBlocks";
import NewArrivals from "../components/products/NewArrivals";
import ProductGrid from "../components/products/ProductGrid";

export default function HomePage() {
  return (
    <>
      <HeroSlider />
      <CategoryBlocks />
      <NewArrivals />
      <ProductGrid />
    </>
  );
}