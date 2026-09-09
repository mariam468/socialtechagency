const express = require("express");
const router = express.Router();
const { login, register, me } = require("../controllers/authController");
const { protect } = require("../middleware/auth");

router.post("/login", login);
router.post("/register", register); // NOTE: lock this down or remove after creating your first admin
router.get("/me", protect, me);

module.exports = router;
