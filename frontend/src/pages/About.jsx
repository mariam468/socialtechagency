import { useEffect, useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import api from "../api/axios";

export default function About() {
  const { t } = useLanguage();
  const [content, setContent] = useState({});

  useEffect(() => {
    api.get("/about-content").then((response) => {
      if (response.data[0]) setContent(response.data[0]);
    }).catch(() => {});
  }, []);

  const a = { ...t.about, ...content };

  return (
    <>
      <header className="page-header container">
        <span className="eyebrow">{a.eyebrow}</span>
        <h1 className="section-heading">{a.heading}</h1>
        <p className="section-lede">{a.lede}</p>
      </header>

      <section className="section--tight container">
        <div className="grid grid-3">
          {a.cards.map((c) => (
            <div className="card" key={c.title}>
              <h3 style={{ fontSize: "1.1rem" }}>{c.title}</h3>
              <p>{c.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
