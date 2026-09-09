import { useEffect, useState } from "react";
import {
  createPost,
  deletePost,
  fetchAllPostsAdmin,
  togglePublish,
} from "../../api/blogApi";

const initialForm = {
  title: "",
  excerpt: "",
  content: "",
  coverImage: "",
  tags: "",
  published: true,
};

export default function BlogAdmin() {
  const [posts, setPosts] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const loadPosts = () => {
    setLoading(true);
    fetchAllPostsAdmin()
      .then(setPosts)
      .catch((error) => setMessage(error.response?.data?.message || error.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setForm((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setMessage("");
    try {
      await createPost({
        ...form,
        tags: form.tags.split(",").map((tag) => tag.trim()).filter(Boolean),
      });
      setForm(initialForm);
      setMessage("Post created successfully.");
      loadPosts();
    } catch (error) {
      setMessage(error.response?.data?.message || error.message);
    } finally {
      setSaving(false);
    }
  };

  const handleToggle = async (id) => {
    await togglePublish(id);
    loadPosts();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this post?")) return;
    await deletePost(id);
    loadPosts();
  };

  return (
    <section>
      <h1 style={{ fontSize: "1.5rem", marginBottom: 24 }}>Blog posts</h1>
      {message && <p role="status">{message}</p>}

      <form onSubmit={handleSubmit} className="admin-form">
        <label>Title<input name="title" value={form.title} onChange={handleChange} required /></label>
        <label>Excerpt<textarea name="excerpt" value={form.excerpt} onChange={handleChange} /></label>
        <label>Content<textarea name="content" value={form.content} onChange={handleChange} required rows={8} /></label>
        <label>Cover image URL<input name="coverImage" value={form.coverImage} onChange={handleChange} /></label>
        <label>Tags, separated by commas<input name="tags" value={form.tags} onChange={handleChange} /></label>
        <label><input type="checkbox" name="published" checked={form.published} onChange={handleChange} /> Published</label>
        <button type="submit" disabled={saving}>{saving ? "Saving..." : "Create post"}</button>
      </form>

      <h2 style={{ fontSize: "1.1rem", margin: "32px 0 16px" }}>Existing posts</h2>
      {loading ? <p>Loading...</p> : posts.length === 0 ? <p>No posts yet.</p> : (
        <table className="data-table">
          <thead><tr><th>Title</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody>{posts.map((post) => (
            <tr key={post._id}>
              <td>{post.title}</td>
              <td>{post.published ? "Published" : "Draft"}</td>
              <td>
                <button type="button" onClick={() => handleToggle(post._id)}>{post.published ? "Unpublish" : "Publish"}</button>{" "}
                <button type="button" onClick={() => handleDelete(post._id)}>Delete</button>
              </td>
            </tr>
          ))}</tbody>
        </table>
      )}
    </section>
  );
}