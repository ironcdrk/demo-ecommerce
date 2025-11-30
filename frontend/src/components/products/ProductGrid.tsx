interface Product {
  id: number;
  name: string;
  price: number;
}

export default function ProductGrid() {
  const demoProducts: Product[] = [
    { id: 1, name: "Tablet Red EliteBook", price: 18 },
    { id: 2, name: "Smartwatch 2.0 LTE Wifi", price: 25 },
    { id: 3, name: "White NX Mini FI SMART", price: 200 },
    { id: 4, name: "Shoes", price: 20 },
  ];

  return (
    <section className="product-grid">
      <div className="product-grid__list">
        {demoProducts.map((p) => (
          <article key={p.id} className="product-card">
            <div className="product-card__image-placeholder">
              Imagen
            </div>
            <div className="product-card__body">
              <h3 className="product-card__title">{p.name}</h3>
              <p className="product-card__price">$ {p.price}</p>
              <button className="product-card__button">Agregar al carrito</button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
