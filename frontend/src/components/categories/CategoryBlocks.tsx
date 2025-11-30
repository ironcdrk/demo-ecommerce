export default function CategoryBlocks() {
  const demoCategories: string[] = ["Accessories", "Audio Speakers", "Clothing"];

  return (
    <section className="category-blocks">
      <div className="category-blocks__grid">
        {demoCategories.map((name) => (
          <article key={name} className="category-blocks__item">
            <div className="category-blocks__overlay">
              <h2 className="category-blocks__title">{name}</h2>
              <button className="category-blocks__button">Ver más</button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
