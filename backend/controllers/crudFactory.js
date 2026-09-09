// Generic CRUD controller factory so Testimonial / Portfolio / BlogPost / JobOpening
// don't each need hand-written duplicate controllers.
const buildCrudController = (Model, publicFilter = { published: true }) => ({
  // public list (only published items)
  getPublic: async (req, res) => {
    try {
      const items = await Model.find(publicFilter).sort({ createdAt: -1 });
      res.json(items);
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err.message });
    }
  },

  // admin list (everything)
  getAll: async (req, res) => {
    try {
      const items = await Model.find().sort({ createdAt: -1 });
      res.json(items);
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err.message });
    }
  },

  getById: async (req, res) => {
    try {
      const item = await Model.findById(req.params.id);
      if (!item) return res.status(404).json({ message: "Not found" });
      res.json(item);
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err.message });
    }
  },

  create: async (req, res) => {
    try {
      const item = await Model.create(req.body);
      res.status(201).json(item);
    } catch (err) {
      res.status(400).json({ message: "Invalid data", error: err.message });
    }
  },

  update: async (req, res) => {
    try {
      const item = await Model.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!item) return res.status(404).json({ message: "Not found" });
      res.json(item);
    } catch (err) {
      res.status(400).json({ message: "Invalid data", error: err.message });
    }
  },

  remove: async (req, res) => {
    try {
      const item = await Model.findByIdAndDelete(req.params.id);
      if (!item) return res.status(404).json({ message: "Not found" });
      res.json({ message: "Deleted" });
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err.message });
    }
  },
});

module.exports = buildCrudController;
