import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchPostBySlug } from "../api/blogApi";

export default function BlogPostDetail() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetchPostBySlug(slug)
      .then(setPost)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <main className="container section--tight text-center">
        <div className="spinner-border" role="status" />
      </main>
    );
  }

  if (error || !post) {
    return (
      <main className="container section--tight text-center">
        <p className="text-muted">Post not found.</p>
        <Link to="/blog">← Back to blog</Link>
      </main>
    );
  }

  return (
    <main className="container section--tight post-detail">
      <Link to="/blog" className="d-inline-block mb-4 text-decoration-none">
        ← Back to blog
      </Link>

      {post.coverImage && (
        <img
          src={post.coverImage}
          alt={post.title}
          className="w-100 rounded mb-4"
          style={{ maxHeight: 400, objectFit: "cover" }}
        />
      )}

      <h1 className="fw-bold mb-2">{post.title}</h1>
      <div className="text-muted small mb-3">
        {post.publishedAt && new Date(post.publishedAt).toLocaleDateString()}
      </div>
      <div className="mb-4">
        {post.tags?.map((tag) => (
          <span className="tag" key={tag}>
            {tag}
          </span>
        ))}
      </div>

      {/* If content is stored as HTML/markdown-rendered HTML, sanitize before using dangerouslySetInnerHTML */}
      <div className="post-content" style={{ whiteSpace: "pre-wrap" }}>
        {post.content}
      </div>
    </main>
  );
}
