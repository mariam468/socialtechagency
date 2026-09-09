const Quote = require("../models/Quote");

// @route POST /api/quotes   (public - website "Get a Quote" form)
const createQuote = async (req, res) => {
  try {
    const { name, email, phone, serviceType, budgetRange, projectDetails, timeline, wantsFreeCall } =
      req.body;

    if (!name || !email || !serviceType || !budgetRange || !projectDetails || !timeline) {
      return res.status(400).json({ message: "Please fill in all required fields." });
    }

    const quote = await Quote.create({
      name,
      email,
      phone,
      serviceType,
      budgetRange,
      projectDetails,
      timeline,
      wantsFreeCall: !!wantsFreeCall,
    });

    res.status(201).json({ message: "Your request has been received. We'll be in touch soon!", quote });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// @route GET /api/quotes   (admin only)
const getQuotes = async (req, res) => {
  try {
    const { status } = req.query;
    const filter = status ? { status } : {};
    const quotes = await Quote.find(filter).sort({ createdAt: -1 });
    res.json(quotes);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// @route GET /api/quotes/:id  (admin only)
const getQuoteById = async (req, res) => {
  try {
    const quote = await Quote.findById(req.params.id);
    if (!quote) return res.status(404).json({ message: "Quote not found" });
    res.json(quote);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// @route PATCH /api/quotes/:id  (admin only - update status/notes)
const updateQuote = async (req, res) => {
  try {
    const { status, notes } = req.body;
    const quote = await Quote.findByIdAndUpdate(
      req.params.id,
      { ...(status && { status }), ...(notes !== undefined && { notes }) },
      { new: true, runValidators: true }
    );
    if (!quote) return res.status(404).json({ message: "Quote not found" });
    res.json(quote);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// @route DELETE /api/quotes/:id  (admin only)
const deleteQuote = async (req, res) => {
  try {
    const quote = await Quote.findByIdAndDelete(req.params.id);
    if (!quote) return res.status(404).json({ message: "Quote not found" });
    res.json({ message: "Quote deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = { createQuote, getQuotes, getQuoteById, updateQuote, deleteQuote };
