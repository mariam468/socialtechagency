const mongoose = require("mongoose");

const quoteSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, trim: true },

    // نوع الخدمة التي محتاجينها
    serviceType: {
      type: String,
      required: true,
      enum: [
        "web-development",
        "mobile-app",
        "social-media-management",
        "branding-design",
        "digital-marketing",
        "seo",
        "other",
      ],
    },

    // الميزانية التقريبية
    budgetRange: {
      type: String,
      required: true,
      enum: ["under-1000", "1000-3000", "3000-7000", "7000-15000", "15000-plus", "not-sure"],
    },

    // تفاصيل المشروع
    projectDetails: { type: String, required: true, trim: true },

    // timeline
    timeline: {
      type: String,
      required: true,
      enum: ["asap", "1-month", "1-3-months", "3-6-months", "flexible"],
    },

    wantsFreeCall: { type: Boolean, default: false },

    status: {
      type: String,
      enum: ["new", "contacted", "in-progress", "won", "lost"],
      default: "new",
    },

    notes: { type: String, trim: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Quote", quoteSchema);
