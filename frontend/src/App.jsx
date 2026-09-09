import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminLayout from "./components/AdminLayout";

import Home from "./pages/Home";
import About from "./pages/About";
import Team from "./pages/Team";
import Services from "./pages/Services";
import Portfolio from "./pages/Portfolio";
import Blog from "./pages/Blog";
import BlogPostDetail from "./pages/BlogPostDetail";
import Packages from "./pages/Packages";
import Testimonials from "./pages/Testimonials";
import Careers from "./pages/Careers";
import GetQuote from "./pages/GetQuote";

import AdminLogin from "./components/AdminLogin.jsx";
import Dashboard from "./pages/admin/Dashboard";
import QuotesList from "./pages/admin/QuotesList";
import BlogAdmin from "./pages/admin/BlogAdmin";
import ContentAdmin from "./pages/admin/ContentAdmin";

function PublicLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <Routes>
      {/* Public / user-facing site */}
      <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
      <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
      <Route path="/teams" element={<PublicLayout><Team /></PublicLayout>} />
      <Route path="/services" element={<PublicLayout><Services /></PublicLayout>} />
      <Route path="/portfolio" element={<PublicLayout><Portfolio /></PublicLayout>} />
      <Route path="/work" element={<PublicLayout><Portfolio /></PublicLayout>} />
      <Route path="/blog" element={<PublicLayout><Blog /></PublicLayout>} />
      <Route path="/blog/:slug" element={<PublicLayout><BlogPostDetail /></PublicLayout>} />
      <Route path="/packages" element={<PublicLayout><Packages /></PublicLayout>} />
      <Route path="/testimonials" element={<PublicLayout><Testimonials /></PublicLayout>} />
      <Route path="/careers" element={<PublicLayout><Careers /></PublicLayout>} />
      <Route path="/get-a-quote" element={<PublicLayout><GetQuote /></PublicLayout>} />

      {/* Admin */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="quotes" element={<QuotesList />} />
        <Route path="blog" element={<BlogAdmin />} />
        <Route path="team" element={<ContentAdmin type="team" />} />
        <Route path="services" element={<ContentAdmin type="services" />} />
        <Route path="packages" element={<ContentAdmin type="packages" />} />
        <Route path="testimonials" element={<ContentAdmin type="testimonials" />} />
        <Route path="careers" element={<ContentAdmin type="careers" />} />
        <Route path="portfolio" element={<ContentAdmin type="portfolio" />} />
        <Route path="work" element={<ContentAdmin type="portfolio" />} />
        <Route path="home" element={<ContentAdmin type="home" />} />
        <Route path="about" element={<ContentAdmin type="about" />} />
      </Route>
    </Routes>
  );
}
