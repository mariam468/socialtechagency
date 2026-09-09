// const mongoose = require("mongoose");

// const blogPostSchema = new mongoose.Schema(
//   {
//     title: { type: String, required: true, trim: true },
//     slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
//     excerpt: { type: String, trim: true },
//     content: { type: String, required: true },
//     coverImageUrl: { type: String, trim: true },
//     author: { type: String, trim: true, default: "Social Tech Agency" },
//     published: { type: Boolean, default: true },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("BlogPost", blogPostSchema);


const mongoose = require("mongoose");

const slugify = (str) =>
  str
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
    excerpt: {
      type: String,
      trim: true,
      maxlength: 300,
    },
    content: {
      type: String,
      required: true,
    },
    coverImage: {
      type: String,
      default: "",
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // adjust to your actual admin/user model name
    },
    tags: {
      type: [String],
      default: [],
    },
    published: {
      type: Boolean,
      default: false,
      index: true,
    },
    publishedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

// Auto-generate a unique slug from the title before saving
postSchema.pre("validate", async function (next) {
  if (this.isModified("title") || !this.slug) {
    let baseSlug = slugify(this.title || "post");
    let slug = baseSlug;
    let counter = 1;

    const Post = mongoose.model("Post");
    while (
      await Post.findOne({ slug, _id: { $ne: this._id } }).lean()
    ) {
      slug = `${baseSlug}-${counter++}`;
    }
    this.slug = slug;
  }
  next();
});

// Keep publishedAt in sync with the published flag
postSchema.pre("save", function (next) {
  if (this.isModified("published")) {
    if (this.published && !this.publishedAt) {
      this.publishedAt = new Date();
    }
    if (!this.published) {
      this.publishedAt = null;
    }
  }
  next();
});

module.exports = mongoose.model("Post", postSchema);
