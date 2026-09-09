import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";
import { useLanguage } from "../context/LanguageContext";

export default function Packages() {
  const { t } = useLanguage();
  const p = t.packages;
  const [packages, setPackages] = useState(null);

  useEffect(() => {
    api.get("/packages").then((response) => {
      if (response.data.length) setPackages(response.data);
    }).catch(() => {});
  }, []);

  return (
    <>
      <header className="page-header container">
        <span className="eyebrow">{p.eyebrow}</span>
        <h1 className="section-heading">{p.heading}</h1>
        <p className="section-lede">{p.lede}</p>
      </header>

      <section className="section--tight container">
        <div className="grid grid-3">
          {(packages || p.list).map((pkg) => (
            <div className={`package-card ${pkg.featured ? "package-card--featured" : ""}`} key={pkg.name}>
              {pkg.featured && <span className="package-card__badge">{p.badge}</span>}
              <h3 style={{ fontSize: "1.1rem" }}>{pkg.name}</h3>
              <div className="package-card__price">
                {pkg.price} <span>{pkg.period}</span>
              </div>
              <ul className="package-card__list">
                {pkg.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
              <Link to="/get-a-quote" className={`btn btn-block ${pkg.featured ? "btn-primary" : "btn-outline"}`}>
                {p.button}
              </Link>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
