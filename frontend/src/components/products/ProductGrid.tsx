import { useEffect, useState } from "react";

interface Product {
  id: number;
  name: string;
  price: number;
  description?: string;
  image_url?: string;
}

const STORAGE_KEY = "demo_cart_v1";

export default function ProductGrid() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch("http://localhost:8080/api/products", {
          signal: controller.signal,
        });

        if (!response.ok) throw new Error("Error al cargar los productos");

        const data = await response.json();

        const mapped = data.map((p: any) => ({
          ...p,
          price: Number(p.price),
        }));

        setProducts(mapped);
      } catch (err: any) {
        if (err.name === "AbortError") return;
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
    return () => controller.abort();
  }, []);

  // Mostrar solo los primeros 4
  const limitedProducts = products.slice(0, 4);

  const addToCart = (product: Product) => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      let cart = saved ? JSON.parse(saved) : [];

      // Buscar si ya existe
      const existing = cart.find((item: any) => item.id === product.id);

      if (existing) {
        existing.quantity += 1;
      } else {
        cart.push({
          ...product,
          quantity: 1,
        });
      }

      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));

      window.dispatchEvent(new Event("cart_updated"));
      
      alert("Producto agregado al carrito ✔️");
    } catch (err) {
      console.error("Error agregando al carrito", err);
    }
  };

  return (
    <section className="product-grid">
      {loading && <p>Cargando productos...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className="product-grid__list">
        {limitedProducts.map((p) => (
          <article key={p.id} className="product-card">
            <div className="product-card__image-placeholder">
              {p.image_url ? (
                <img
                  src={`http://localhost:8080${p.image_url}`}
                  alt={p.name}
                  className="product-card__image"
                />
              ) : (
                "Imagen"
              )}
            </div>

            <div className="product-card__body">
              <h3 className="product-card__title">{p.name}</h3>
              <p className="product-card__price">$ {p.price.toFixed(2)}</p>

              <button className="product-card__button" onClick={() => addToCart(p)}>
                Agregar al carrito
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
