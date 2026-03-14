import { env } from "@/shared/config/env";
const API_URL = env.apiUrl;

export interface Product {
  id: number;
  name: string;
  price: string;
  slug: string;
  description?: string;
  image_url?: string;
  created_at: string;
  updated_at: string;
}

export async function fetchProducts(): Promise<Product[]> {
  const res = await fetch(`${API_URL}/products`);

  if (!res.ok) {
    throw new Error(`Error al cargar categorías: ${res.status}`);
  }

  const data: unknown = await res.json();

  if (!Array.isArray(data)) {
    throw new Error("La respuesta del API no es un array");
  }

  return data as Product[];
}
