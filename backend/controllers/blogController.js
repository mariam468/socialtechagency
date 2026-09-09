
const Post = require("../models/BlogPost");

// ---------- PUBLIC ----------

// GET /api/posts  (published only, paginated)
exports.getPublishedPosts = async (req, res) => {
  try {
    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const limit = Math.min(parseInt(req.query.limit) || 9, 50);
    const skip = (page - 1) * limit;

    const filter = { published: true };
    if (req.query.tag) filter.tags = req.query.tag;

    const [posts, total] = await Promise.all([
      Post.find(filter)
        .select("-content") // list view doesn't need full body
        .sort({ publishedAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Post.countDocuments(filter),
    ]);

    res.json({
      posts,
      page,
      totalPages: Math.ceil(total / limit),
      totalPosts: total,
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to load posts", error: err.message });
  }
};

// GET /api/posts/:slug  (single published post)
exports.getPostBySlug = async (req, res) => {
  try {
    const post = await Post.findOne({
      slug: req.params.slug,
      published: true,
    }).lean();

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: "Failed to load post", error: err.message });
  }
};

// ---------- ADMIN ----------
// Mount these behind your existing auth + admin-only middleware.

// GET /api/admin/posts  (all posts, published or not)
exports.getAllPostsAdmin = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 }).lean();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: "Failed to load posts", error: err.message });
  }
};

// GET /api/admin/posts/:id
exports.getPostByIdAdmin = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: "Failed to load post", error: err.message });
  }
};

// POST /api/admin/posts
exports.createPost = async (req, res) => {
  try {
    const { title, excerpt, content, coverImage, tags, published } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: "Title and content are required" });
    }

    const post = await Post.create({
      title,
      excerpt,
      content,
      coverImage,
      tags,
      published: !!published,
      author: req.user?._id, // depends on your auth middleware attaching req.user
    });

    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ message: "Failed to create post", error: err.message });
  }
};

// PUT /api/admin/posts/:id
exports.updatePost = async (req, res) => {
  try {
    const { title, excerpt, content, coverImage, tags, published } = req.body;
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ message: "Post not found" });

    if (title !== undefined) post.title = title;
    if (excerpt !== undefined) post.excerpt = excerpt;
    if (content !== undefined) post.content = content;
    if (coverImage !== undefined) post.coverImage = coverImage;
    if (tags !== undefined) post.tags = tags;
    if (published !== undefined) post.published = published;

    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: "Failed to update post", error: err.message });
  }
};

// PATCH /api/admin/posts/:id/publish
exports.togglePublish = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    post.published = !post.published;
    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: "Failed to update post", error: err.message });
  }
};

// DELETE /api/admin/posts/:id
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json({ message: "Post deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete post", error: err.message });
  }
};
