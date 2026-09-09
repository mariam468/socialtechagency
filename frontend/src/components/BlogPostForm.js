import { useState } from "react";
import { Container, Form, Button, Row, Col, Alert } from "react-bootstrap";
import { createPost, updatePost } from "../../api/blogApi";

export default function BlogPostForm({ post, onDone, onCancel }) {
  const isEditing = !!post;

  const [form, setForm] = useState({
    title: post?.title || "",
    excerpt: post?.excerpt || "",
    content: post?.content || "",
    coverImage: post?.coverImage || "",
    tags: post?.tags?.join(", ") || "",
    published: post?.published || false,
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const payload = {
      ...form,
      tags: form.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    };

    try {
      if (isEditing) {
        await updatePost(post._id, payload);
      } else {
        await createPost(payload);
      }
      onDone();
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Container className="py-4" style={{ maxWidth: 760 }}>
      <h3 className="fw-bold mb-4">{isEditing ? "Edit post" : "New post"}</h3>

      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            name="title"
            value={form.title}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Excerpt</Form.Label>
          <Form.Control
            as="textarea"
            rows={2}
            name="excerpt"
            value={form.excerpt}
            onChange={handleChange}
            maxLength={300}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Content</Form.Label>
          <Form.Control
            as="textarea"
            rows={10}
            name="content"
            value={form.content}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Row>
          <Col md={8}>
            <Form.Group className="mb-3">
              <Form.Label>Cover image URL</Form.Label>
              <Form.Control
                name="coverImage"
                value={form.coverImage}
                onChange={handleChange}
                placeholder="https://…"
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Tags (comma separated)</Form.Label>
              <Form.Control
                name="tags"
                value={form.tags}
                onChange={handleChange}
                placeholder="react, design"
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-4">
          <Form.Check
            type="switch"
            id="published-switch"
            name="published"
            label="Published"
            checked={form.published}
            onChange={handleChange}
          />
        </Form.Group>

        <div className="d-flex gap-2">
          <Button type="submit" disabled={saving}>
            {saving ? "Saving…" : isEditing ? "Save changes" : "Create post"}
          </Button>
          <Button variant="outline-secondary" onClick={onCancel} disabled={saving}>
            Cancel
          </Button>
        </div>
      </Form>
    </Container>
  );
}
