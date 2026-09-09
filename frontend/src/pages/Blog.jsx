// import { useEffect, useState } from "react";
// import api from "../api/axios";
// import { useLanguage } from "../context/LanguageContext";

// export default function Blog() {
//   const { t } = useLanguage();
//   const b = t.blog;
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     api
//       .get("/blog")
//       .then((res) => setPosts(res.data))
//       .catch(() => setPosts([]))
//       .finally(() => setLoading(false));
//   }, []);

//   return (
//     <>
//       <header className="page-header container">
//         <span className="eyebrow">{b.eyebrow}</span>
//         <h1 className="section-heading">{b.heading}</h1>
//       </header>

//       <section className="section--tight container">
//         {loading && <p>{b.loading}</p>}
//         {!loading && posts.length === 0 && <p>{b.empty}</p>}
//         <div className="grid grid-3">
//           {posts.map((post) => (
//             <article className="blog-card" key={post._id}>
//               <div className="blog-card__cover" />
//               <div className="blog-card__meta">
//                 {post.author} · {new Date(post.createdAt).toLocaleDateString()}
//               </div>
//               <h3 style={{ fontSize: "1.05rem" }}>{post.title}</h3>
//               <p style={{ fontSize: "0.9rem" }}>{post.excerpt}</p>
//             </article>
//           ))}
//         </div>
//       </section>
//     </>
//   );
// }

import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // swap for your router if different
import { fetchPosts } from "../api/blogApi";
// import { useTranslation } from "react-i18next"; // uncomment if you use react-i18next

export default function Blog() {
  // const { t } = useTranslation();
  const strings = {
    eyebrow: "Blog",
    heading: "Notes on tech, design, and growth",
    loading: "Loading posts…",
    empty: "New posts will appear here once published from the admin dashboard.",
  }; // replace with t("blog.xxx") once wired to your i18n setup

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;
    setLoading(true);
    fetchPosts(page)
      .then((data) => {
        if (ignore) return;
        setPosts(Array.isArray(data.posts) ? data.posts : []);
        setTotalPages(data.totalPages || 1);
      })
      .catch((err) => !ignore && setError(err.message))
      .finally(() => !ignore && setLoading(false));
    return () => {
      ignore = true;
    };
  }, [page]);

  return (
    <main className="container section--tight" id="blog">
      <div className="text-center mb-5">
        <div className="text-uppercase fw-semibold text-primary small mb-2">
          {strings.eyebrow}
        </div>
        <h2 className="fw-bold">{strings.heading}</h2>
      </div>

      {loading && (
        <div className="text-center py-5">
          <div className="spinner-border mb-3" role="status" />
          <p className="text-muted">{strings.loading}</p>
        </div>
      )}

      {!loading && error && (
        <p className="text-center text-danger">{error}</p>
      )}

      {!loading && !error && posts.length === 0 && (
        <p className="text-center text-muted">{strings.empty}</p>
      )}

      {!loading && !error && posts.length > 0 && (
        <>
          <div className="grid grid-3">
            {posts.map((post) => (
              <Link to={`/blog/${post.slug}`} className="blog-card" key={post._id}>
                  {post.coverImage && (
                    <img src={post.coverImage} alt={post.title} className="blog-card__image" />
                  )}
                  <div className="blog-card__body">
                    <h3>{post.title}</h3>
                    <p>{post.excerpt}</p>
                    <div>
                      {post.tags?.map((tag) => (
                        <span className="tag" key={tag}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="blog-card__footer">
                    {post.publishedAt &&
                      new Date(post.publishedAt).toLocaleDateString()}
                  </div>
              </Link>
            ))}
          </div>

          {totalPages > 1 && (
            <nav className="pagination" aria-label="Blog pages">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  type="button"
                  key={i + 1}
                  className={i + 1 === page ? "active" : ""}
                  onClick={() => setPage(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
            </nav>
          )}
        </>
      )}
    </main>
  );
}
