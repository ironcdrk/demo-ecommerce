export interface ProductApiResponse {
  id: number;
  name: string;
  price: string;
  slug: string;
  description?: string;
  image_url?: string;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  slug: string;
  description?: string;
  image_url?: string;
  created_at: string;
  updated_at: string;
}