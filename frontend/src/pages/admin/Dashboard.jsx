import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function Dashboard() {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/quotes")
      .then((res) => setQuotes(res.data))
      .catch(() => setQuotes([]))
      .finally(() => setLoading(false));
  }, []);

  const counts = {
    total: quotes.length,
    new: quotes.filter((q) => q.status === "new").length,
    inProgress: quotes.filter((q) => q.status === "in-progress").length,
    won: quotes.filter((q) => q.status === "won").length,
  };

  return (
    <>
      <h1 style={{ fontSize: "1.5rem", marginBottom: 24 }}>Dashboard</h1>

      <div className="stat-strip">
        <div className="stat-box">
          <div className="stat-box__num">{counts.total}</div>
          <div className="stat-box__label">Total requests</div>
        </div>
        <div className="stat-box">
          <div className="stat-box__num">{counts.new}</div>
          <div className="stat-box__label">New</div>
        </div>
        <div className="stat-box">
          <div className="stat-box__num">{counts.inProgress}</div>
          <div className="stat-box__label">In progress</div>
        </div>
        <div className="stat-box">
          <div className="stat-box__num">{counts.won}</div>
          <div className="stat-box__label">Won</div>
        </div>
      </div>

      <h2 style={{ fontSize: "1.1rem", marginBottom: 16 }}>Recent quote requests</h2>
      {loading ? (
        <p>Loading…</p>
      ) : (
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Service</th>
              <th>Budget</th>
              <th>Status</th>
              <th>Received</th>
            </tr>
          </thead>
          <tbody>
            {quotes.slice(0, 8).map((q) => (
              <tr key={q._id}>
                <td>{q.name}</td>
                <td>{q.serviceType?.replace("-", " ")}</td>
                <td>{q.budgetRange?.replace("-", " ")}</td>
                <td>
                  <span className={`status-pill ${q.status === "new" ? "status-pill--new" : ""}`}>
                    {q.status}
                  </span>
                </td>
                <td>{new Date(q.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}
