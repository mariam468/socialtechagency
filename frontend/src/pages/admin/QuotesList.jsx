import { useEffect, useState } from "react";
import api from "../../api/axios";

const statuses = ["new", "contacted", "in-progress", "won", "lost"];

export default function QuotesList() {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  const load = () => {
    setLoading(true);
    api
      .get("/quotes")
      .then((res) => setQuotes(res.data))
      .catch(() => setQuotes([]))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const updateStatus = async (id, status) => {
    await api.patch(`/quotes/${id}`, { status });
    load();
  };

  const remove = async (id) => {
    if (!confirm("Delete this quote request?")) return;
    await api.delete(`/quotes/${id}`);
    setSelected(null);
    load();
  };

  return (
    <>
      <h1 style={{ fontSize: "1.5rem", marginBottom: 24 }}>Quote Requests</h1>

      {loading ? (
        <p>Loading…</p>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: selected ? "1.4fr 1fr" : "1fr", gap: 24 }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Service</th>
                <th>Timeline</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {quotes.map((q) => (
                <tr key={q._id} style={{ cursor: "pointer" }} onClick={() => setSelected(q)}>
                  <td>{q.name}</td>
                  <td>{q.serviceType?.replace("-", " ")}</td>
                  <td>{q.timeline?.replace("-", " ")}</td>
                  <td>
                    <span className={`status-pill ${q.status === "new" ? "status-pill--new" : ""}`}>
                      {q.status}
                    </span>
                  </td>
                  <td>
                    <button className="btn btn-outline" onClick={(e) => { e.stopPropagation(); remove(q._id); }}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {quotes.length === 0 && (
                <tr>
                  <td colSpan="5">No quote requests yet.</td>
                </tr>
              )}
            </tbody>
          </table>

          {selected && (
            <div className="card">
              <h3 style={{ marginBottom: 8 }}>{selected.name}</h3>
              <p style={{ fontSize: "0.85rem" }}>{selected.email} {selected.phone && `· ${selected.phone}`}</p>

              <div className="field" style={{ marginBottom: 14 }}>
                <label>Service</label>
                <p style={{ margin: 0 }}>{selected.serviceType?.replace("-", " ")}</p>
              </div>
              <div className="field" style={{ marginBottom: 14 }}>
                <label>Budget</label>
                <p style={{ margin: 0 }}>{selected.budgetRange?.replace("-", " ")}</p>
              </div>
              <div className="field" style={{ marginBottom: 14 }}>
                <label>Timeline</label>
                <p style={{ margin: 0 }}>{selected.timeline?.replace("-", " ")}</p>
              </div>
              <div className="field" style={{ marginBottom: 14 }}>
                <label>Project details</label>
                <p style={{ margin: 0 }}>{selected.projectDetails}</p>
              </div>
              <div className="field" style={{ marginBottom: 20 }}>
                <label>Wants free call</label>
                <p style={{ margin: 0 }}>{selected.wantsFreeCall ? "Yes" : "No"}</p>
              </div>

              <div className="field">
                <label htmlFor="status">Update status</label>
                <select
                  id="status"
                  value={selected.status}
                  onChange={(e) => {
                    updateStatus(selected._id, e.target.value);
                    setSelected((s) => ({ ...s, status: e.target.value }));
                  }}
                >
                  {statuses.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
