import { useState } from "react";
import api from "../api/axios";
import { useLanguage } from "../context/LanguageContext";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  serviceType: "",
  budgetRange: "",
  projectDetails: "",
  timeline: "",
  wantsFreeCall: false,
};

export default function GetQuote() {
  const { t } = useLanguage();
  const q = t.getQuote;
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState({ type: null, message: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus({ type: null, message: "" });
    try {
      const { data } = await api.post("/quotes", form);
      setStatus({ type: "success", message: data.message || "Your request has been received!" });
      setForm(initialForm);
    } catch (err) {
      setStatus({ type: "error", message: err.response?.data?.message || q.errorFallback });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <header className="page-header container">
        <span className="eyebrow">{q.eyebrow}</span>
        <h1 className="section-heading">{q.heading}</h1>
        <p className="section-lede">{q.lede}</p>
      </header>

      <section className="section--tight container">
        <div className="quote-layout">
          {/* ---- Request a Quote form ---- */}
          <form className="card" onSubmit={handleSubmit}>
            <h2 style={{ fontSize: "1.3rem", marginBottom: 20 }}>{q.formTitle}</h2>

            {status.type && (
              <div className={`form-alert form-alert--${status.type}`}>{status.message}</div>
            )}

            <div className="form-grid">
              <div className="field">
                <label htmlFor="name">{q.name}</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  placeholder={q.namePlaceholder}
                  required
                />
              </div>

              <div className="field">
                <label htmlFor="email">{q.email}</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder={q.emailPlaceholder}
                  required
                />
              </div>

              <div className="field form-grid--full">
                <label htmlFor="phone">
                  {q.phone} <span className="hint">{q.optional}</span>
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder={q.phonePlaceholder}
                />
              </div>

              <div className="field">
                <label htmlFor="serviceType">{q.serviceType}</label>
                <select id="serviceType" name="serviceType" value={form.serviceType} onChange={handleChange} required>
                  <option value="">{q.serviceTypeSelect}</option>
                  {q.serviceOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>

              <div className="field">
                <label htmlFor="budgetRange">{q.budget}</label>
                <select id="budgetRange" name="budgetRange" value={form.budgetRange} onChange={handleChange} required>
                  <option value="">{q.budgetSelect}</option>
                  {q.budgetOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>

              <div className="field form-grid--full">
                <label htmlFor="projectDetails">{q.projectDetails}</label>
                <textarea
                  id="projectDetails"
                  name="projectDetails"
                  value={form.projectDetails}
                  onChange={handleChange}
                  placeholder={q.projectDetailsPlaceholder}
                  required
                />
              </div>

              <div className="field form-grid--full">
                <label htmlFor="timeline">{q.timeline}</label>
                <select id="timeline" name="timeline" value={form.timeline} onChange={handleChange} required>
                  <option value="">{q.timelineSelect}</option>
                  {q.timelineOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>

              <div className="field form-grid--full">
                <label className="checkbox-field">
                  <input
                    type="checkbox"
                    name="wantsFreeCall"
                    checked={form.wantsFreeCall}
                    onChange={handleChange}
                  />
                  {q.freeCallLabel}
                </label>
              </div>
            </div>

            <button type="submit" className="btn btn-primary btn-block" style={{ marginTop: 24 }} disabled={submitting}>
              {submitting ? q.sending : q.submit}
            </button>
          </form>

        </div>
      </section>
    </>
  );
}
