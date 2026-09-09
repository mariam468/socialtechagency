require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
const connectDB = require("./config/db");
const { protect, adminOnly } = require("./middleware/auth");
const imageUpload = require("./middleware/upload");

const authRoutes = require("./routes/authRoutes");
const quoteRoutes = require("./routes/quoteRoutes");
const blogRoutes = require("./routes/blogRoutes");
const {
  testimonialsRouter,
  portfolioRouter,
  careersRouter,
  teamRouter,
  servicesRouter,
  packagesRouter,
  homeContentRouter,
  aboutContentRouter,
} = require("./routes/contentRoutes");

connectDB();

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL || "*", credentials: true }));
app.use(express.json());
app.use(morgan("dev"));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.post("/api/uploads/image", protect, adminOnly, imageUpload.single("image"), (req, res) => {
  if (!req.file) return res.status(400).json({ message: "Please select an image file" });
  res.status(201).json({ url: `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}` });
});

app.get("/api/health", (req, res) => res.json({ status: "ok" }));

app.use("/api/auth", authRoutes);
app.use("/api/quotes", quoteRoutes);
app.use("/api/testimonials", testimonialsRouter);
app.use("/api/portfolio", portfolioRouter);
app.use("/api/blog", blogRoutes);
app.use("/api/careers", careersRouter);
app.use("/api/team", teamRouter);
app.use("/api/services", servicesRouter);
app.use("/api/packages", packagesRouter);
app.use("/api/home-content", homeContentRouter);
app.use("/api/about-content", aboutContentRouter);

// 404 handler
app.use((req, res) => res.status(404).json({ message: "Route not found" }));

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong", error: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
