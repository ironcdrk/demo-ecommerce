import { useEffect, useState } from "react";
import { fetchProducts } from "../../api/products";
import { env } from "@/shared/config/env";
import { useAuth } from "../../hooks/useAuth";
import { Product } from "../../models/Product";

const BASE_URL = env.baseUrl;

const STORAGE_KEY = "demo_cart_v1";

export default function ProductGrid() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);  
  const { isAuthenticated } = useAuth();

  useEffect(() => {
      const load = async () => {
        try {
          setLoading(true);
          setError(null);
          const data = await fetchProducts();
          /*console.log("Productos cargados", data);
          const mapped = data.map((p: Product) => ({
            ...p,
            price: Number(p.price).toFixed(2),
          }));*/
          setProducts(data);
        } catch (err: any) {
          console.error(err);
          setError(err.message ?? "Error al cargar productos");
        } finally {
          setLoading(false);
        }
      };
  
      load();
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
                  src={`${BASE_URL}/${p.image_url}`}
                  alt={p.name}
                  className="product-card__image"
                />
              ) : (
                `Imagen de ${p.name}`
              )}
            </div>

            <div className="product-card__body">
              <h3 className="product-card__title">{p.name}</h3>
              <p className="product-card__price">$ {p.price}</p>
              
          {isAuthenticated() && (
              <button className="product-card__button" onClick={() => addToCart(p)}>
                Agregar al carrito
              </button>
            )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
