import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { useTheme } from "../context/ThemeContext";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { lang, toggleLang, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  const links = [
    { to: "/", label: t.nav.home, end: true },
    { to: "/about", label: t.nav.about },
    { to: "/teams", label: t.nav.team },
    { to: "/services", label: t.nav.services },
    { to: "/portfolio", label: t.nav.work },
    { to: "/blog", label: t.nav.blog },
    { to: "/packages", label: t.nav.packages },
    { to: "/testimonials", label: t.nav.testimonials },
    { to: "/careers", label: t.nav.careers },
  ];

  return (
    <header className="navbar">
      <div className="navbar__inner">
        <NavLink to="/" className="navbar__logo" onClick={() => setOpen(false)}>
          <span className="navbar__logo-mark" />
          Social Tech Agency
        </NavLink>

        <nav className={`navbar__links ${open ? "open" : ""}`}>
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={({ isActive }) => `navbar__link ${isActive ? "active" : ""}`}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </NavLink>
          ))}
          <NavLink
            to="/get-a-quote"
            className="btn btn-primary"
            style={{ marginTop: 4 }}
            onClick={() => setOpen(false)}
          >
            {t.nav.getQuote}
          </NavLink>
        </nav>

        <div className="navbar__cta">
          <div className="navbar__utility">
            <button className="utility-btn" onClick={toggleLang} aria-label="Switch language">
              {lang === "en" ? "العربية" : "English"}
            </button>
            <button className="utility-btn" onClick={toggleTheme} aria-label="Toggle theme">
              {theme === "dark" ? `☀ ${t.toggles.light}` : `☾ ${t.toggles.dark}`}
            </button>
          </div>
          <NavLink to="/get-a-quote" className="btn btn-primary">
            {t.nav.getQuote}
          </NavLink>
          <button className="navbar__toggle" onClick={() => setOpen((o) => !o)} aria-label="Toggle menu">
            {open ? "✕" : "☰"}
          </button>
        </div>
      </div>
    </header>
  );
}
