import { useEffect, useState } from "react";
import { fetchCategories, type Category } from "../api/categories";

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p style={{ fontSize: "1.1rem" }}>Cargando categorías...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50">
        <div>
          <h1 style={{ fontSize: "1.3rem", marginBottom: "0.5rem" }}>
            Ocurrió un error
          </h1>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Contenido */}
      <main style={{ padding: "2rem" }}>
        <h2 style={{ fontSize: "1.3rem", marginBottom: "1rem" }}>
          Categorías
        </h2>

        {categories.length === 0 ? (
          <p>No hay categorías disponibles.</p>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
              gap: "1rem",
            }}
          >
            {categories.map((cat) => (
              <article
                key={cat.id}
                style={{
                  backgroundColor: "white",
                  padding: "1rem",
                  borderRadius: "0.5rem",
                  boxShadow:
                    "0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.05)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <h3 style={{ fontSize: "1.1rem", marginBottom: "0.25rem" }}>
                    {cat.name}
                  </h3>
                  <p
                    style={{
                      fontSize: "0.85rem",
                      color: "#6b7280",
                      marginBottom: "0.75rem",
                    }}
                  >
                    slug: <code>{cat.slug}</code>
                  </p>
                </div>
                <button
                  style={{
                    marginTop: "0.5rem",
                    padding: "0.5rem 0.75rem",
                    borderRadius: "0.375rem",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "0.9rem",
                    fontWeight: 500,
                    backgroundColor: "#3b82f6",
                    color: "white",
                  }}
                  onClick={() => {
                    // aquí luego puedes navegar a /categories/:id o filtrar productos
                    console.log("Ver productos de", cat.slug);
                  }}
                >
                  Ver productos
                </button>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
