import { useEffect, useState } from "react";
import api from "../api/axios";
import { useLanguage } from "../context/LanguageContext";

export default function Testimonials() {
  const { t } = useLanguage();
  const s = t.testimonials;
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/testimonials")
      .then((res) => setItems(res.data))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <header className="page-header container">
        <span className="eyebrow">{s.eyebrow}</span>
        <h1 className="section-heading">{s.heading}</h1>
      </header>

      <section className="section--tight container">
        {loading && <p>{s.loading}</p>}
        {!loading && items.length === 0 && <p>{s.empty}</p>}
        <div className="grid grid-3">
          {items.map((tItem) => (
            <div className="testimonial-card card" key={tItem._id}>
              <p className="testimonial-card__quote">"{tItem.quote}"</p>
              <div className="testimonial-card__person">
                {tItem.avatarUrl ? (
                  <img className="testimonial-card__avatar" src={tItem.avatarUrl} alt={tItem.clientName} />
                ) : (
                  <div className="testimonial-card__avatar" />
                )}
                <div>
                  <div style={{ fontWeight: 600, fontSize: "0.9rem" }}>{tItem.clientName}</div>
                  <div style={{ fontSize: "0.8rem", color: "var(--fog)" }}>{tItem.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
