import { apiFetch } from "@/shared/api/apiClient";

export interface CreateOrderPayload {
  customer_name: string;
  country: string;
  city: string;
  card_number: string;
  card_month: string;
  card_year: string;
  items: {
    product_id: number;
    quantity: number;
  }[];
}

export interface CreateOrderResponse {
  success: boolean;
  message?: string;
}

export function createOrder(
  payload: CreateOrderPayload,
  //token: string
): Promise<CreateOrderResponse> {
  return apiFetch<CreateOrderResponse>("/orders", {
    method: "POST",
    /*headers: {
      Authorization: `Bearer ${token}`,
    },*/
    body: JSON.stringify(payload),
  });
}