import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { House, UserKey, LucideLayoutGrid } from "lucide-react";

const STORAGE_KEY = "demo_cart_v1";

function getCartCountFromStorage(): number {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return 0;
    const cart = JSON.parse(saved) as Array<{ quantity?: number }>;
    return cart.reduce((acc, item) => acc + (item.quantity ?? 0), 0);
  } catch {
    return 0;
  }
}

export default function Header() {

  const [cartCount, setCartCount] = useState<number>(() =>
    getCartCountFromStorage()
  );

  useEffect(() => {
    const handleCartChange = () => {
      setCartCount(getCartCountFromStorage());
    };

    // cuando nosotros disparamos el evento
    window.addEventListener("cart_updated", handleCartChange);
    // por si el usuario cambia de pestaña o algo similar
    window.addEventListener("storage", handleCartChange);

    return () => {
      window.removeEventListener("cart_updated", handleCartChange);
      window.removeEventListener("storage", handleCartChange);
    };
  }, []);

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <div className="site-header__logo">Mini DemoEcommerce</div>

        <nav className="site-header__nav">
          <Link to="/" className="site-header__icon-btn">
            <House size={18} strokeWidth={2} />
            <span>Home</span>
          </Link>
          <Link to="/categories" className="site-header__icon-btn">
            <LucideLayoutGrid size={18} strokeWidth={2} />
            <span>Categorías</span>
          </Link>
          {/*
          <Link to="/cart" className="site-header__icon-btn">
            Carrito ({cartCount})
          </Link>
          */}
          <Link to="/login" className="site-header__icon-btn">
            <UserKey size={18} strokeWidth={2} />
            <span>Login</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}