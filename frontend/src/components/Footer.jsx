import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__col">
            <h4 style={{ marginBottom: 14 }}>Social Tech Agency</h4>
            <p style={{ maxWidth: 260, fontSize: "0.9rem" }}>{t.footer.description}</p>
          </div>
          <div className="footer__col">
            <h4>{t.footer.company}</h4>
            <Link to="/about">{t.nav.about}</Link>
            <Link to="/teams">{t.nav.team}</Link>
            <Link to="/careers">{t.nav.careers}</Link>
            <Link to="/blog">{t.nav.blog}</Link>
          </div>
          <div className="footer__col">
            <h4>{t.footer.work}</h4>
            <Link to="/services">{t.nav.services}</Link>
            <Link to="/portfolio">{t.nav.work}</Link>
            <Link to="/packages">{t.nav.packages}</Link>
            <Link to="/testimonials">{t.nav.testimonials}</Link>
          </div>
          <div className="footer__col">
            <h4>{t.footer.getInTouch}</h4>
            <Link to="/get-a-quote">{t.footer.requestQuote}</Link>
            <a href="socialtechagency.lb@gmail.com">socialtechagency.lb@gmail.com</a>
          </div>
        </div>
        <div className="footer__bottom">
          <span>© {new Date().getFullYear()} Social Tech Agency. {t.footer.rights}</span>
          <Link to="/admin/login">{t.footer.adminLogin}</Link>
        </div>
      </div>
    </footer>
  );
}
