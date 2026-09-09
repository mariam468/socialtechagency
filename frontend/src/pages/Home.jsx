import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import api from "../api/axios";

export default function Home() {
  const { t } = useLanguage();
  const [content, setContent] = useState({});

  useEffect(() => {
    api.get("/home-content").then((response) => {
      if (response.data[0]) setContent(response.data[0]);
    }).catch(() => {});
  }, []);

  const h = { ...t.home, ...content };

  return (
    <>
      <section className="hero">
        <div className="container hero__grid">
          <div>
            <span className="eyebrow">{h.eyebrow}</span>
            <h1>{h.heading}</h1>
            <p className="section-lede">{h.lede}</p>
            <div className="hero__actions">
              <Link to="/get-a-quote" className="btn btn-primary">{h.ctaQuote}</Link>
              <Link to="/portfolio" className="btn btn-outline">{h.ctaWork}</Link>
            </div>
            <div className="hero__stats">
              {h.stats.map((s) => (
                <div key={s.label}>
                  <div className="hero__stat-num">{s.num}</div>
                  <div className="hero__stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="hero__graphic" aria-hidden="true" />
        </div>
      </section>

      <section className="section section--tight">
        <div className="container">
          <span className="eyebrow">{h.servicesEyebrow}</span>
          <h2 className="section-heading">{h.servicesHeading}</h2>
          <div className="grid grid-4" style={{ marginTop: 40 }}>
            {h.services.map((s) => (
              <div className="service-card" key={s.title}>
                <div className="service-card__icon" />
                <h3 style={{ fontSize: "1.05rem" }}>{s.title}</h3>
                <p style={{ fontSize: "0.9rem" }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--tight">
        <div
          className="container card"
          style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 24 }}
        >
          <div>
            <h2 style={{ fontSize: "1.6rem", marginBottom: 8 }}>{h.bannerHeading}</h2>
            <p style={{ margin: 0 }}>{h.bannerText}</p>
          </div>
          <Link to="/get-a-quote" className="btn btn-primary">{h.bannerButton}</Link>
        </div>
      </section>
    </>
  );
}
