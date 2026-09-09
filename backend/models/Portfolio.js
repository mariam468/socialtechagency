const mongoose = require("mongoose");

const portfolioSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    client: { type: String, trim: true },
    category: {
      type: String,
      enum: ["web-development", "mobile-app", "branding", "social-media", "marketing"],
      required: true,
    },
    summary: { type: String, required: true, trim: true },
    coverImageUrl: { type: String, trim: true },
    projectUrl: { type: String, trim: true },
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Portfolio", portfolioSchema);
