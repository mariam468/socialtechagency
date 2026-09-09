const mongoose = require("mongoose");

const homeContentSchema = new mongoose.Schema(
  {
    eyebrow: { type: String, trim: true },
    heading: { type: String, trim: true },
    lede: { type: String, trim: true },
    ctaQuote: { type: String, trim: true },
    ctaWork: { type: String, trim: true },
    servicesEyebrow: { type: String, trim: true },
    servicesHeading: { type: String, trim: true },
    bannerHeading: { type: String, trim: true },
    bannerText: { type: String, trim: true },
    bannerButton: { type: String, trim: true },
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("HomeContent", homeContentSchema);
