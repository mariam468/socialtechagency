import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";
import { useLanguage } from "../context/LanguageContext";

export default function Services() {
  const { t } = useLanguage();
  const s = t.services;
  const [services, setServices] = useState(null);

  useEffect(() => {
    api.get("/services").then((response) => {
      if (response.data.length) setServices(response.data);
    }).catch(() => {});
  }, []);

  return (
    <>
      <header className="page-header container">
        <span className="eyebrow">{s.eyebrow}</span>
        <h1 className="section-heading">{s.heading}</h1>
      </header>

      <section className="section--tight container">
        <div className="grid grid-3">
          {(services || s.list).map((item) => (
            <div className="service-card" key={item.title}>
              <div className="service-card__icon" />
              <h3 style={{ fontSize: "1.05rem" }}>{item.title}</h3>
              <p style={{ fontSize: "0.9rem" }}>{item.description || item.desc}</p>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 40 }}>
          <Link to="/get-a-quote" className="btn btn-primary">{s.ctaButton}</Link>
        </div>
      </section>
    </>
  );
}
