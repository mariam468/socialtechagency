const mongoose = require("mongoose");

const aboutContentSchema = new mongoose.Schema(
  {
    eyebrow: { type: String, trim: true },
    heading: { type: String, trim: true },
    lede: { type: String, trim: true },
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("AboutContent", aboutContentSchema);
