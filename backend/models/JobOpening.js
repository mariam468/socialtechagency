const mongoose = require("mongoose");

const jobOpeningSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    department: { type: String, trim: true },
    location: { type: String, trim: true, default: "Remote" },
    employmentType: {
      type: String,
      enum: ["full-time", "part-time", "internship", "freelance"],
      default: "full-time",
    },
    description: { type: String, required: true },
    isOpen: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("JobOpening", jobOpeningSchema);
