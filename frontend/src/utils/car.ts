// src/utils/cart.ts
export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image_url?: string;
}

const CART_KEY = "demo_cart_v1";

export function getCartFromStorage(): CartItem[] {
  try {
    const raw = localStorage.getItem(CART_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as CartItem[];
  } catch {
    return [];
  }
}

export function saveCartToStorage(items: CartItem[]) {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
  // disparamos el evento para que el header se actualice
  window.dispatchEvent(new Event("cart_updated"));
}

export function clearCart() {
  saveCartToStorage([]);
}

export function getCartCountFromStorage(): number {
  return getCartFromStorage().reduce((acc, item) => acc + item.quantity, 0);
}

export function getCartTotal(): number {
  return getCartFromStorage().reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
}
