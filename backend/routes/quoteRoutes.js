const express = require("express");
const router = express.Router();
const {
  createQuote,
  getQuotes,
  getQuoteById,
  updateQuote,
  deleteQuote,
} = require("../controllers/quoteController");
const { protect, adminOnly } = require("../middleware/auth");

// Public - the "Get a Quote" form on the website submits here
router.post("/", createQuote);

// Admin only
router.get("/", protect, adminOnly, getQuotes);
router.get("/:id", protect, adminOnly, getQuoteById);
router.patch("/:id", protect, adminOnly, updateQuote);
router.delete("/:id", protect, adminOnly, deleteQuote);

module.exports = router;
