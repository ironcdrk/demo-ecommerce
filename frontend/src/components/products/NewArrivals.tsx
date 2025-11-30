export default function NewArrivals() {
  const demoTabs: string[] = ["Accessories", "Audio Speakers", "Camera", "Head Phones"];

  return (
    <section className="new-arrivals">
      <div className="new-arrivals__header">
        <h2>New Arrivals</h2>
        <p>Nuevos productos para ti</p>
      </div>

      <div className="new-arrivals__tabs">
        {demoTabs.map((tab) => (
          <button key={tab} className="new-arrivals__tab">
            {tab}
          </button>
        ))}
      </div>
    </section>
  );
}
