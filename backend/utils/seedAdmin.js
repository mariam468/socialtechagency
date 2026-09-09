// Run with: npm run seed:admin
require("dotenv").config();
const connectDB = require("../config/db");
const User = require("../models/User");

(async () => {
  await connectDB();

  const email = (process.env.ADMIN_EMAIL || "admin@socialtechagency.com").toLowerCase();
  const password = process.env.ADMIN_PASSWORD || "ChangeMe123!";

  const existing = await User.findOne({ email });
  if (existing) {
    console.log(`Admin already exists: ${email}`);
    process.exit(0);
  }

  await User.create({ name: "Admin", email, password, role: "admin" });
  console.log(`Admin created -> email: ${email} / password: ${password}`);
  process.exit(0);
})();
