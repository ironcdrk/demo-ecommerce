import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface Product {
  id: number;
  name: string;
  price: string;
  description?: string;
  image_url?: string;
}

export default function CategoryProductsPage() {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const { categoryId } = useParams<{ categoryId: string }>();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!categoryId) return;

    const controller = new AbortController();

    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `http://localhost:8080/api/categories/${categoryId}/products`,
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error("Error al cargar los productos");
        }

        const data = await response.json();
        
        setProducts(
            data.map((p: any) => ({
                ...p,
                price: Number(p.price)
            }))
        );
      } catch (err: any) {
        if (err.name === "AbortError") return;
        setError(err.message || "Error desconocido");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();

    return () => {
      controller.abort();
    };
  }, [categoryId]);

  if (!categoryId) {
    return <p>Falta el id de la categoría en la URL.</p>;
  }

  if (loading) {
    return <p>Cargando productos...</p>;
  }

  if (error) {
    return <p>Ocurrió un error: {error}</p>;
  }

  if (!products.length) {
    return <p>No hay productos para esta categoría.</p>;
  }

  return (
    <div className="category-products-page">
    <h1>Productos de la categoría {categoryId}</h1>

    <section className="product-grid">
        <div className="product-grid__list">
        {products.map((product) => (
            <article key={product.id} className="product-card">
            {product.image_url ? (
                <img
                src={`${API_BASE_URL}${product.image_url}`}
                alt={product.name}
                className="product-card__image"
                />
            ) : (
                <div className="product-card__image-placeholder">
                Sin imagen
                </div>
            )}

            <div className="product-card__body">
                <h2 className="product-card__title">{product.name}</h2>

                {product.description && (
                <p className="product-card__description">
                    {product.description}
                </p>
                )}

                <p className="product-card__price">
                ${Number(product.price).toFixed(2)}
                </p>

                <button className="product-card__button">
                Ver producto
                </button>
            </div>
            </article>
        ))}
        </div>
    </section>
    </div>
  );
};

