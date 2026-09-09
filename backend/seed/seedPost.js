/**
 * Seed script — inserts a few sample blog posts directly into MongoDB
 * so you can see the Blog page rendering real content immediately.
 *
 * Adjust the require path below to match where your BlogPost model
 * actually lives (this assumes backend/models/BlogPost.js).
 *
 * Run from your backend folder:
 *   node seed/seedPosts.js
 */

require("dotenv").config(); // remove if you don't use a .env file
const mongoose = require("mongoose");
const BlogPost = require("../models/BlogPost"); // adjust path/name if different

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/socialtechagency";

const samplePosts = [
  {
    title: "Why We Rebuilt Our Stack Around React and Node",
    excerpt:
      "A look at the tradeoffs that pushed us toward a MERN-based architecture for client projects.",
    content:
      "When we started taking on more client work, we needed a stack that let us move fast without sacrificing maintainability. Here's what led us to React, Node, Express, and MongoDB — and a few things we'd do differently in hindsight.",
    coverImage: "",
    tags: ["engineering", "react", "node"],
    published: true,
  },
  {
    title: "5 Design Principles We Apply to Every Client Site",
    excerpt: "Consistency, hierarchy, and restraint — the basics that actually move the needle.",
    content:
      "Good design isn't about trends, it's about clarity. Here are five principles our team returns to on every project, with examples of what changes when we apply them.",
    coverImage: "",
    tags: ["design"],
    published: true,
  },
  {
    title: "How We Think About Growth for Small Businesses",
    excerpt: "Growth doesn't always mean more traffic — sometimes it means better conversion.",
    content:
      "Most of our clients don't need more visitors, they need the visitors they already have to take action. Here's the framework we use to figure out which lever to pull first.",
    coverImage: "",
    tags: ["growth", "strategy"],
    published: true,
  },
  {
    title: "Draft: Upcoming Case Study (Not Yet Published)",
    excerpt: "A work-in-progress post to demonstrate the draft/publish flow.",
    content: "This post is intentionally left unpublished so you can test the Publish button in the admin dashboard.",
    coverImage: "",
    tags: ["case-study"],
    published: false,
  },
];

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB:", MONGO_URI);

    await BlogPost.deleteMany({}); // clears existing posts — remove this line if you don't want that
    const created = await BlogPost.insertMany(samplePosts);

    console.log(`Inserted ${created.length} posts:`);
    created.forEach((p) => console.log(`  - ${p.title} (${p.published ? "published" : "draft"})`));

    process.exit(0);
  } catch (err) {
    console.error("Seed failed:", err.message);
    process.exit(1);
  }
}

seed();