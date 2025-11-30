// src/components/categories/CategoryBlocks.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchCategories, type Category } from "../../api/categories";

export default function CategoryBlocks() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchCategories();
        setCategories(data);
      } catch (err: any) {
        console.error(err);
        setError(err.message ?? "Error al cargar categorías");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  if (loading) {
    return (
      <section className="category-blocks">
        <p>Cargando categorías...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="category-blocks">
        <p style={{ color: "red" }}>{error}</p>
      </section>
    );
  }

  if (categories.length === 0) {
    return (
      <section className="category-blocks">
        <p>No hay categorías disponibles.</p>
      </section>
    );
  }

  return (
    <section className="category-blocks">
      <div className="category-blocks__grid">
        {categories.map((cat) => (
          <article key={cat.id} className="category-blocks__item">
            <div className="category-blocks__overlay">
              <h2 className="category-blocks__title">{cat.name}</h2>
              <button
                className="category-blocks__button"
                onClick={() => {
                  navigate(`/categories/${cat.id}/products`);
                  console.log("Ver categoría", cat.slug);
                }}
              >
                Ver más
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

