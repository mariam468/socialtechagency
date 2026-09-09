import { useEffect, useState } from "react";
import api from "../api/axios";
import { useLanguage } from "../context/LanguageContext";

export default function Team() {
  const { t } = useLanguage();
  const [members, setMembers] = useState(null);

  useEffect(() => {
    api.get("/team").then((response) => {
      if (response.data.length) setMembers(response.data);
    }).catch(() => {});
  }, []);

  return (
    <>
      <header className="page-header container">
        <span className="eyebrow">{t.team.eyebrow}</span>
        <h1 className="section-heading">{t.team.heading}</h1>
      </header>

      <section className="section--tight container">
        <div className="grid grid-3">
          {(members || t.team.members).map((m) => (
            <div className="team-card card" key={m.name}>
              {m.imageUrl ? (
                <img className="team-card__avatar" src={m.imageUrl} alt={m.name} />
              ) : (
                <div className="team-card__avatar" aria-hidden="true" />
              )}
              <h3 style={{ fontSize: "1.05rem" }}>{m.name}</h3>
              <div className="team-card__role">{m.role}</div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
