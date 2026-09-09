import { useEffect, useState } from "react";
import api from "../api/axios";
import { useLanguage } from "../context/LanguageContext";

export default function Careers() {
  const { t } = useLanguage();
  const c = t.careers;
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/careers")
      .then((res) => setJobs(res.data))
      .catch(() => setJobs([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <header className="page-header container">
        <span className="eyebrow">{c.eyebrow}</span>
        <h1 className="section-heading">{c.heading}</h1>
        <p className="section-lede">{c.lede}</p>
      </header>

      <section className="section--tight container">
        {loading && <p>{c.loading}</p>}
        {!loading && jobs.length === 0 && <p>{c.empty}</p>}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {jobs.map((j) => (
            <div className="job-card" key={j._id}>
              <div>
                <h3 style={{ fontSize: "1.05rem", marginBottom: 4 }}>{j.title}</h3>
                <div className="job-card__meta">
                  <span>{j.department}</span>
                  <span>{j.location}</span>
                  <span>{j.employmentType?.replace("-", " ")}</span>
                </div>
              </div>
              <a className="btn btn-outline" href="mailto:careers@socialtechagency.com">
                {c.apply}
              </a>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
