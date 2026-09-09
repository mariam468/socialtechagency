const express = require("express");
const router = express.Router();
const postController = require("../controllers/blogController");
const { protect, adminOnly } = require("../middleware/auth");

// TODO: point these at your actual auth middleware
// const { protect, adminOnly } = require("../middleware/authMiddleware");

// ---------- ADMIN ----------
// Wire in your real middleware here, e.g.:
// router.use("/admin/posts", protect, adminOnly);
router.use("/admin", protect, adminOnly);
router.get("/admin", postController.getAllPostsAdmin);
router.get("/admin/:id", postController.getPostByIdAdmin);
router.post("/admin", postController.createPost);
router.put("/admin/:id", postController.updatePost);
router.patch("/admin/:id/publish", postController.togglePublish);
router.delete("/admin/:id", postController.deletePost);

// ---------- PUBLIC ----------
router.get("/", postController.getPublishedPosts);
router.get("/:slug", postController.getPostBySlug);

module.exports = router;

/*
  In your main server.js / app.js, mount this with:
    const postRoutes = require("./routes/postRoutes");
    app.use("/api", postRoutes);
*/
