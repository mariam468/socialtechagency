import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const links = [
  { to: "/admin/dashboard", label: "Dashboard" },
  { to: "/admin/quotes", label: "Quote Requests" },
  { to: "/admin/blog", label: "Blog" },
  { to: "/admin/team", label: "Team" },
  { to: "/admin/services", label: "Services" },
  { to: "/admin/packages", label: "Packages" },
  { to: "/admin/testimonials", label: "Testimonials" },
  { to: "/admin/careers", label: "Careers" },
  { to: "/admin/portfolio", label: "Portfolio" },
  { to: "/admin/work", label: "Work" },
  { to: "/admin/home", label: "Home Page" },
  { to: "/admin/about", label: "About Page" },
];

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-sidebar__logo">Social Tech Agency</div>
        {links.map((l) => (
          <NavLink key={l.to} to={l.to} className={({ isActive }) => (isActive ? "active" : "")}>
            {l.label}
          </NavLink>
        ))}
        <NavLink to="/">← Back to website</NavLink>
      </aside>
      <main className="admin-main">
        <div className="admin-topbar">
          <div>Signed in as {user?.name || user?.email}</div>
          <button className="btn btn-outline" onClick={handleLogout}>
            Log out
          </button>
        </div>
        <Outlet />
      </main>
    </div>
  );
}
