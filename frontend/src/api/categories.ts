import { apiFetch } from "@/shared/api/apiClient";
import type { Category } from "@/models/Category";



export async function fetchCategories(): Promise<Category[]> {
  return apiFetch<Category[]>("/categories");

  /*const res = await fetch(`${API_URL}/categories`);

  if (!res.ok) {
    throw new Error(`Error al cargar categorías: ${res.status}`);
  }

  const data: unknown = await res.json();

  if (!Array.isArray(data)) {
    throw new Error("La respuesta del API no es un array");
  }

  return data as Category[];*/
}
