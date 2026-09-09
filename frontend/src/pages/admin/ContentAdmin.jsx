import { useEffect, useState } from "react";
import api from "../../api/axios";

const configs = {
  team: {
    title: "Team",
    endpoint: "/team",
    fields: ["name", "role", "imageUrl"],
    initial: { name: "", role: "", imageUrl: "", published: true },
  },
  services: {
    title: "Services",
    endpoint: "/services",
    fields: ["title", "description", "icon"],
    initial: { title: "", description: "", icon: "", published: true },
  },
  packages: {
    title: "Packages",
    endpoint: "/packages",
    fields: ["name", "price", "period", "features"],
    initial: { name: "", price: "", period: "", features: "", published: true },
  },
  testimonials: {
    title: "Testimonials",
    endpoint: "/testimonials",
    fields: ["clientName", "company", "quote", "rating", "avatarUrl"],
    initial: { clientName: "", company: "", quote: "", rating: 5, avatarUrl: "", published: true },
  },
  careers: {
    title: "Careers",
    endpoint: "/careers",
    fields: ["title", "department", "location", "employmentType", "description"],
    initial: { title: "", department: "", location: "Remote", employmentType: "full-time", description: "", isOpen: true },
  },
  portfolio: {
    title: "Portfolio",
    endpoint: "/portfolio",
    fields: ["title", "client", "category", "summary", "coverImageUrl", "projectUrl"],
    initial: { title: "", client: "", category: "web-development", summary: "", coverImageUrl: "", projectUrl: "", published: true },
  },
  home: {
    title: "Home Page",
    endpoint: "/home-content",
    fields: ["eyebrow", "heading", "lede", "ctaQuote", "ctaWork", "servicesEyebrow", "servicesHeading", "bannerHeading", "bannerText", "bannerButton"],
    initial: { eyebrow: "", heading: "", lede: "", ctaQuote: "", ctaWork: "", servicesEyebrow: "", servicesHeading: "", bannerHeading: "", bannerText: "", bannerButton: "", published: true },
  },
  about: {
    title: "About Page",
    endpoint: "/about-content",
    fields: ["eyebrow", "heading", "lede"],
    initial: { eyebrow: "", heading: "", lede: "", published: true },
  },
};

const labels = {
  clientName: "Client name", imageUrl: "Image URL", coverImageUrl: "Cover image URL",
  projectUrl: "Project URL", employmentType: "Employment type", avatarUrl: "Avatar URL",
};

const selectOptions = {
  category: ["web-development", "mobile-app", "branding", "social-media", "marketing"],
  employmentType: ["full-time", "part-time", "internship", "freelance"],
};

const imageFields = new Set(["imageUrl", "avatarUrl", "coverImageUrl"]);

export default function ContentAdmin({ type }) {
  const config = configs[type];
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(config.initial);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const loadItems = () => {
    setLoading(true);
    api.get(`${config.endpoint}/admin`)
      .then((response) => setItems(response.data))
      .catch((error) => setMessage(error.response?.data?.message || error.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    setForm({ ...config.initial });
    setMessage("");
    loadItems();
  }, [type]);

  const handleChange = (event) => {
    const { name, value, type: inputType, checked } = event.target;
    setForm((current) => ({ ...current, [name]: inputType === "checkbox" ? checked : value }));
  };

  const handleImageUpload = async (event, field) => {
    const file = event.target.files[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setMessage("Please select an image file.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setMessage("Image must be smaller than 5 MB.");
      return;
    }
    const data = new FormData();
    data.append("image", file);
    setMessage("Uploading image...");
    try {
      const response = await api.post("/uploads/image", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setForm((current) => ({ ...current, [field]: response.data.url }));
      setMessage("Image uploaded.");
    } catch (error) {
      setMessage(error.response?.data?.message || error.message);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setMessage("");
    const payload = { ...form };
    if (type === "packages") payload.features = form.features.split(",").map((item) => item.trim()).filter(Boolean);
    try {
      await api.post(`${config.endpoint}/admin`, payload);
      setForm(config.initial);
      setMessage("Saved successfully.");
      loadItems();
    } catch (error) {
      setMessage(error.response?.data?.message || error.message);
    } finally {
      setSaving(false);
    }
  };

  const toggleItem = async (item) => {
    try {
      const statusField = type === "careers" ? "isOpen" : "published";
      await api.patch(`${config.endpoint}/admin/${item._id}`, { [statusField]: !item[statusField] });
      loadItems();
    } catch (error) {
      setMessage(error.response?.data?.message || error.message);
    }
  };

  const removeItem = async (id) => {
    if (!window.confirm("Delete this item?")) return;
    try {
      await api.delete(`${config.endpoint}/admin/${id}`);
      loadItems();
    } catch (error) {
      setMessage(error.response?.data?.message || error.message);
    }
  };

  const titleFor = (item) => item.title || item.name || item.clientName || "Untitled";
  const statusFor = (item) => type === "careers" ? item.isOpen : item.published;

  return (
    <section>
      <h1 style={{ fontSize: "1.5rem", marginBottom: 24 }}>{config.title}</h1>
      {message && <p role="status">{message}</p>}
      <form onSubmit={handleSubmit} className="admin-form">
        {config.fields.map((field) => (
          <label key={field}>
            {labels[field] || field.replace(/[A-Z]/g, (letter) => ` ${letter}`).replace(/^./, (letter) => letter.toUpperCase())}
            {selectOptions[field] ? (
              <select name={field} value={form[field]} onChange={handleChange} required>
                {selectOptions[field].map((option) => <option key={option} value={option}>{option.replace(/-/g, " ")}</option>)}
              </select>
            ) : imageFields.has(field) ? (
              <>
                <input type="file" accept="image/*" onChange={(event) => handleImageUpload(event, field)} />
                <input name={field} value={form[field]} onChange={handleChange} placeholder="Or paste an image URL" />
                {form[field] && <img src={form[field]} alt="Preview" style={{ width: 96, height: 64, objectFit: "cover", marginTop: 8 }} />}
              </>
            ) : field === "description" || field === "summary" || field === "quote" || field === "lede" || field === "bannerText" ? (
              <textarea name={field} value={form[field]} onChange={handleChange} required />
            ) : (
              <input name={field} type={field === "rating" ? "number" : "text"} min={field === "rating" ? 1 : undefined} max={field === "rating" ? 5 : undefined} value={form[field]} onChange={handleChange} required={field !== "icon" && field !== "imageUrl" && field !== "avatarUrl" && field !== "coverImageUrl" && field !== "projectUrl"} />
            )}
          </label>
        ))}
        <label className="admin-checkbox"><input type="checkbox" name={type === "careers" ? "isOpen" : "published"} checked={type === "careers" ? form.isOpen : form.published} onChange={handleChange} /> Active</label>
        <button type="submit" disabled={saving}>{saving ? "Saving..." : `Add ${config.title}`}</button>
      </form>
      <h2 style={{ fontSize: "1.1rem", margin: "32px 0 16px" }}>Existing items</h2>
      {loading ? <p>Loading...</p> : items.length === 0 ? <p>No items yet.</p> : (
        <table className="data-table"><thead><tr><th>Title</th><th>Status</th><th>Actions</th></tr></thead><tbody>
          {items.map((item) => <tr key={item._id}><td>{titleFor(item)}</td><td>{statusFor(item) ? "Published" : "Hidden"}</td><td><button type="button" onClick={() => toggleItem(item)}>{statusFor(item) ? "Hide" : "Publish"}</button>{" "}<button type="button" onClick={() => removeItem(item._id)}>Delete</button></td></tr>)}
        </tbody></table>
      )}
    </section>
  );
}
