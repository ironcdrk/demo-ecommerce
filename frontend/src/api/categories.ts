const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8080/api";

export interface Category {
  id: number;
  name: string;
  slug: string;
  created_at: string;
  updated_at: string;
}

export async function fetchCategories(): Promise<Category[]> {
  const res = await fetch(`${API_URL}/categories`);

  if (!res.ok) {
    throw new Error(`Error al cargar categorías: ${res.status}`);
  }

  const data: unknown = await res.json();

  if (!Array.isArray(data)) {
    throw new Error("La respuesta del API no es un array");
  }

  return data as Category[];
}
