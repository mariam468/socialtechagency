import { useEffect, useState } from "react";
import { Container, Table, Button, Badge, Spinner, Alert } from "react-bootstrap";
import {
  fetchAllPostsAdmin,
  togglePublish,
  deletePost,
} from "../../api/blogApi";
import BlogPostForm from "./BlogPostForm";

export default function BlogAdminDashboard() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingPost, setEditingPost] = useState(null); // null = list view, {} = new post, {...} = editing
  const [actionError, setActionError] = useState(null);

  const loadPosts = () => {
    setLoading(true);
    fetchAllPostsAdmin()
      .then(setPosts)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const handleTogglePublish = async (id) => {
    setActionError(null);
    try {
      const updated = await togglePublish(id);
      setPosts((prev) => prev.map((p) => (p._id === id ? updated : p)));
    } catch (err) {
      setActionError(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this post? This cannot be undone.")) return;
    setActionError(null);
    try {
      await deletePost(id);
      setPosts((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      setActionError(err.message);
    }
  };

  if (editingPost !== null) {
    return (
      <BlogPostForm
        post={editingPost._id ? editingPost : null}
        onDone={() => {
          setEditingPost(null);
          loadPosts();
        }}
        onCancel={() => setEditingPost(null)}
      />
    );
  }

  return (
    <Container className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-bold mb-0">Blog posts</h3>
        <Button onClick={() => setEditingPost({})}>+ New post</Button>
      </div>

      {actionError && <Alert variant="danger">{actionError}</Alert>}

      {loading && (
        <div className="text-center py-5">
          <Spinner animation="border" />
        </div>
      )}

      {!loading && error && <Alert variant="danger">{error}</Alert>}

      {!loading && !error && posts.length === 0 && (
        <p className="text-muted">No posts yet. Create your first one above.</p>
      )}

      {!loading && !error && posts.length > 0 && (
        <Table hover responsive className="align-middle">
          <thead>
            <tr>
              <th>Title</th>
              <th>Status</th>
              <th>Updated</th>
              <th className="text-end">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post._id}>
                <td>{post.title}</td>
                <td>
                  <Badge bg={post.published ? "success" : "secondary"}>
                    {post.published ? "Published" : "Draft"}
                  </Badge>
                </td>
                <td className="text-muted small">
                  {new Date(post.updatedAt).toLocaleDateString()}
                </td>
                <td className="text-end">
                  <Button
                    size="sm"
                    variant="outline-secondary"
                    className="me-2"
                    onClick={() => setEditingPost(post)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant={post.published ? "outline-warning" : "outline-success"}
                    className="me-2"
                    onClick={() => handleTogglePublish(post._id)}
                  >
                    {post.published ? "Unpublish" : "Publish"}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline-danger"
                    onClick={() => handleDelete(post._id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
}
