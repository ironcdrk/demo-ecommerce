import { apiFetch } from "@/shared/api/apiClient";
import type {
  Product,
  ProductApiResponse,
} from "@/models/Product";


export async function fetchProducts(): Promise<Product[]> {
  return apiFetch<Product[]>("/products");
  /*const res = await fetch(`${API_URL}/products`);

  if (!res.ok) {
    throw new Error(`Error al cargar categorías: ${res.status}`);
  }

  const data: unknown = await res.json();

  if (!Array.isArray(data)) {
    throw new Error("La respuesta del API no es un array");
  }

  return data as Product[];*/
}

export async function fetchProductsByCategory(
  categoryId: string,
  signal?: AbortSignal
): Promise<Product[]> {
  const data = await apiFetch<ProductApiResponse[]>(
    `/categories/${categoryId}/products`,
    { signal }
  );

  return data.map((product) => ({
    ...product,
    price: Number(product.price),
  }));
}
