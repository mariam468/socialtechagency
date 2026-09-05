# Social Tech Agency — Full Stack Website (MERN)

A complete website for "Social Tech Agency": React + Vite frontend, Node/Express + MongoDB backend,
public site + a "Get a Quote" form + an admin dashboard.

## Structure

```
social-tech-agency/
  frontend/   React (Vite), React Router, Axios — public site + admin dashboard UI
  backend/    Express + MongoDB (Mongoose) — REST API, JWT auth
```

## Language & theme
- **Language toggle** (EN / AR) sits in the navbar. All public-facing pages (nav, footer, home,
  about, team, services, portfolio, blog, packages, testimonials, careers, get-a-quote) are fully
  translated — text lives in `frontend/src/i18n/translations.js`. Switching sets `dir="rtl"` on
  `<html>` for Arabic; note this is a **basic RTL switch** (text direction + document flow), not a
  full mirrored-layout redesign — grid/flex ordering stays as-is.
- **Dark / light mode toggle** sits next to the language toggle. Preference is saved to
  `localStorage` (`sta_theme`). Colors for both modes are defined in
  `frontend/src/styles/index.css` under `:root` (dark, default) and `[data-theme="light"]`.
- The site defaults to **English** and **dark mode** on first visit.
- The admin dashboard stays in English for now.

## Color theme
Near-black background, charcoal/steel grays, and a mauve-purple ("موف") accent.
All tokens are defined at the top of `frontend/src/styles/index.css` (`--ink`, `--charcoal`,
`--steel`, `--mauve`, etc.) — change them there to retheme the whole site.

## Navbar
Home · About · Team · Services · Portfolio (Work) · Blog · Packages · Testimonials ·
Careers / Join Us · Get a Quote (highlighted button).

## Get a Quote page
- Form fields: Name, Email, Phone, **نوع الخدمة التي تحتاجونها** (service type — dropdown),
  **الميزانية التقريبية** (approximate budget — dropdown), **تفاصيل المشروع** (project details),
  Timeline, and a "book a free call" checkbox.
- Submits to `POST /api/quotes` and is stored in MongoDB.
- A Calendly iframe sits next to the form for booking a free call directly.
  **Replace the placeholder URL** in `frontend/src/pages/GetQuote.jsx` with your real Calendly link:
  `https://calendly.com/your-agency/free-consultation`.

## Admin dashboard
- `/admin/login` — JWT-based login.
- `/admin/dashboard` — quote request stats.
- `/admin/quotes` — list, view details, update status, delete.
- Public content (testimonials, portfolio, blog posts, job openings) is managed through the same
  REST API (`/api/testimonials`, `/api/portfolio`, `/api/blog`, `/api/careers`) — admin-only
  create/update/delete endpoints are already wired up; you can build out matching admin screens
  the same way `QuotesList.jsx` is built, or manage them with a tool like Postman/Insomnia for now.

## Setup

### 1. Backend
```bash
cd backend
cp .env.example .env      # then edit MONGO_URI and JWT_SECRET
npm install
npm run seed:admin        # creates your first admin user (uses ADMIN_EMAIL / ADMIN_PASSWORD from .env)
npm run dev                # starts on http://localhost:5000
```

### 2. Frontend
```bash
cd frontend
npm install
npm run dev                # starts on http://localhost:5173, proxies /api to :5000
```

Then open http://localhost:5173, and http://localhost:5173/admin/login for the dashboard
(log in with the admin credentials you seeded).

## Notes
- Lock down or remove `POST /api/auth/register` once your first admin account exists — it's open
  in this scaffold for convenience.
- Swap the placeholder team/portfolio/blog data for real content via the API once you're managing
  it from MongoDB.
