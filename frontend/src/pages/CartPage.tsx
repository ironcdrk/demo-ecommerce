import { useEffect, useState } from "react";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image_url?: string;
}

const STORAGE_KEY = "demo_cart_v1";

export default function CartPage() {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Cargar carrito desde localStorage
  useEffect(() => {
    setLoading(true);
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setItems(JSON.parse(saved));
      }
    } catch (err) {
      console.error("Error leyendo carrito:", err);
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateQuantity = (productId: number, quantity: number) => {
    const updated = items.map((item) =>
      item.id === productId
        ? { ...item, quantity: Math.max(1, quantity) }
        : item
    );

    setItems(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const removeFromCart = (productId: number) => {
    const updated = items.filter((item) => item.id !== productId);
    setItems(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const subtotal = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  if (loading) return <p>Cargando carrito...</p>;

  return (
    <section className="cart-page">
      <h1 className="cart-page__title">Shopping Cart</h1>

      <div className="cart-page__inner">
        {/* TABLA DE PRODUCTOS */}
        <div className="cart-table">
          <div className="cart-table__header">
            <span>Product</span>
            <span>Price</span>
            <span>Quantity</span>
            <span>Subtotal</span>
          </div>

          {items.length === 0 && (
            <div className="cart-table__empty">Tu carrito está vacío.</div>
          )}

          {items.map((item) => (
            <div key={item.id} className="cart-table__row">
              {/* PRODUCTO */}
              <div className="cart-table__product">
                <button
                  className="cart-table__remove-btn"
                  onClick={() => removeFromCart(item.id)}
                >
                  ✕
                </button>

                {item.image_url ? (
                  <img
                    src={`${API_BASE_URL}${item.image_url}`}
                    alt={item.name}
                    className="cart-table__image"
                  />
                ) : (
                  <div className="cart-table__image">No img</div>
                )}

                <span className="cart-table__name">{item.name}</span>
              </div>

              <span>${item.price.toFixed(2)}</span>

              {/* CANTIDAD */}
              <input
                type="number"
                min={1}
                className="cart-table__qty-input"
                value={item.quantity}
                onChange={(e) =>
                  updateQuantity(item.id, Number(e.target.value))
                }
              />

              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>

        {/* RESUMEN */}
        <aside className="cart-summary">
          <div>
            <div className="cart-summary__section-title">Promotion Code</div>
            <div className="cart-summary__coupon-row">
              <input
                className="cart-summary__coupon-input"
                placeholder="Coupon code"
              />
              <button className="cart-summary__apply-btn">APPLY</button>
            </div>
          </div>

          <div className="cart-summary__totals">
            <div className="cart-summary__totals-row">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="cart-summary__totals-row cart-summary__totals-row--total">
              <span>Total</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
          </div>

          <button className="cart-summary__checkout-btn">
            PROCEED TO CHECKOUT
          </button>
        </aside>
      </div>
    </section>
  );
};