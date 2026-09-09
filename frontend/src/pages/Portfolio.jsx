import { useEffect, useState } from "react";
import api from "../api/axios";
import { useLanguage } from "../context/LanguageContext";

export default function Portfolio() {
  const { t } = useLanguage();
  const p = t.portfolio;
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/portfolio")
      .then((res) => setItems(res.data))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <header className="page-header container">
        <span className="eyebrow">{p.eyebrow}</span>
        <h1 className="section-heading">{p.heading}</h1>
      </header>

      <section className="section--tight container">
        {loading && <p>{p.loading}</p>}
        {!loading && items.length === 0 && <p>{p.empty}</p>}
        <div className="grid grid-3">
          {items.map((item) => (
            <a
              className="work-card"
              key={item._id}
              href={item.projectUrl || "#"}
              target={item.projectUrl ? "_blank" : undefined}
              rel="noreferrer"
            >
              {item.coverImageUrl ? (
                <img className="work-card__cover" src={item.coverImageUrl} alt={item.title} />
              ) : (
                <div className="work-card__cover" />
              )}
              <div className="work-card__tag">{item.category?.replace("-", " ")}</div>
              <h3 style={{ fontSize: "1.05rem" }}>{item.title}</h3>
              <p style={{ fontSize: "0.9rem" }}>{item.summary}</p>
            </a>
          ))}
        </div>
      </section>
    </>
  );
}
