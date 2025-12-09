import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CartItem,
  getCartFromStorage,
  getCartTotal,
  clearCart,
} from "../utils/car.ts";

interface CheckoutForm {
  customer_name: string,
  country: string,
  city: string,
  card_number: string,
  card_month: string,
  card_year: string,
}

export default function CheckoutPage() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [form, setForm] = useState<CheckoutForm>({
    customer_name: "",
    country: "",
    city: "",
    card_number: "",
    card_month: "",
    card_year: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const cart = getCartFromStorage();
    setItems(cart);
    setTotal(getCartTotal());
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validación básica antes de llamar al API
    if (!items.length) {
        setError("Tu carrito está vacío.");
        return;
    }

    if (
        !form.customer_name ||
        !form.country ||
        !form.city ||
        !form.card_number ||
        !form.card_month ||
        !form.card_year
    ) {
        setError("Por favor completa todos los campos del formulario.");
        return;
    }

    // Opcional: validaciones extra para evitar 422 innecesarios
    if (form.card_month.length > 2 || form.card_year.length > 4) {
        setError("Revisa el formato de mes y año de la tarjeta.");
        return;
    }

    const payload = {
        customer_name: form.customer_name,
        country: form.country,
        city: form.city,
        card_number: form.card_number,
        card_month: form.card_month,
        card_year: form.card_year,
        items: items.map((item) => ({
        product_id: item.id,
        quantity: item.quantity,
        })),
    };

    setLoading(true);

    try {
        const res = await fetch("http://localhost:8080/api/orders", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        });

        if (!res.ok) {
            
        const data = await res.json().catch(() => null);
        console.log("Error API orders:", data);
        throw new Error("No se pudo completar el pedido.");
        }

        clearCart();
        setShowModal(true);
    } catch (err: any) {
        console.error(err);
        setError(err.message || "Ocurrió un error al procesar el pedido.");
    } finally {
        setLoading(false);
    }
  };
  return (
    <main className="checkout">
        <div className="checkout__container">
        <h1 className="checkout__title">Finalizar compra</h1>

        {items.length === 0 ? (
            <p>Tu carrito está vacío.</p>
        ) : (
            <div className="checkout__content">
            <section className="checkout__summary">
                <h2>Resumen del pedido</h2>
                <ul className="checkout__items">
                {items.map((item) => (
                    <li key={item.id} className="checkout__item">
                    <div>
                        <p className="checkout__item-name">{item.name}</p>
                        <p className="checkout__item-qty">
                        Cantidad: {item.quantity}
                        </p>
                    </div>
                    <p className="checkout__item-subtotal">
                        ${(item.price * item.quantity).toFixed(2)}
                    </p>
                    </li>
                ))}
                </ul>
                <div className="checkout__total">
                <span>Total:</span>
                <strong>${total.toFixed(2)}</strong>
                </div>
            </section>

            <section className="checkout__form-wrapper">
                <h2>Datos del comprador</h2>

                <form className="checkout__form" onSubmit={handleSubmit}>

                <label className="checkout__field">
                    <span>Nombre completo</span>
                    <input
                    type="text"
                    name="customer_name"
                    id="customer_name"
                    value={form.customer_name}
                    onChange={handleChange}
                    required
                    />
                </label>

                <label className="checkout__field">
                    <span>País</span>
                    <input
                    type="text"
                    name="country"
                    id="country"
                    value={form.country}
                    onChange={handleChange}
                    required
                    />
                </label>

                <label className="checkout__field">
                    <span>Ciudad</span>
                    <input
                    type="text"
                    name="city"
                    id="city"
                    value={form.city}
                    onChange={handleChange}
                    required
                    />
                </label>

                <label className="checkout__field">
                    <span>Número de tarjeta</span>
                    <input
                    type="text"
                    name="card_number"
                    id="card_number"
                    value={form.card_number}
                    onChange={handleChange}
                    required
                    />
                </label>

                <label className="checkout__field">
                    <span>Mes (MM)</span>
                    <input
                    type="text"
                    name="card_month"
                    id="card_month"
                    value={form.card_month}
                    onChange={handleChange}
                    required
                    />
                </label>

                <label className="checkout__field">
                    <span>Año (YYYY)</span>
                    <input
                    type="text"
                    name="card_year"
                    id="card_year"
                    value={form.card_year}
                    onChange={handleChange}
                    required
                    />
                </label>

                {error && <p className="checkout__error">{error}</p>}

                <button
                    type="submit"
                    className="checkout__submit"
                    disabled={loading}
                >
                    {loading ? "Procesando..." : "Purchase"}
                </button>
                </form>
            </section>
            </div>
        )}
        </div>

        {showModal && (
        <div className="modal-overlay">
            <div className="modal-content">
            <h2>¡Gracias por tu compra!</h2>
            <p>Tu pedido se ha procesado correctamente.</p>

            <button
                className="modal-button"
                onClick={() => navigate("/")}
            >
                OK
            </button>
            </div>
        </div>
        )}
    </main>
    );
}