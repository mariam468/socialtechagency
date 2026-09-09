const express = require("express");
const { protect, adminOnly } = require("../middleware/auth");
const buildCrudController = require("../controllers/crudFactory");

const Testimonial = require("../models/Testimonial");
const Portfolio = require("../models/Portfolio");
const BlogPost = require("../models/BlogPost");
const JobOpening = require("../models/JobOpening");
const TeamMember = require("../models/TeamMember");
const Service = require("../models/Service");
const Package = require("../models/Package");
const HomeContent = require("../models/HomeContent");
const AboutContent = require("../models/AboutContent");

// Builds a router with: GET / (public), GET /admin (all), GET /:id, POST /, PATCH /:id, DELETE /:id
function buildRouter(Model, publicFilter) {
  const router = express.Router();
  const ctrl = buildCrudController(Model, publicFilter);

  router.get("/", ctrl.getPublic);
  router.get("/admin", protect, adminOnly, ctrl.getAll);
  router.post("/admin", protect, adminOnly, ctrl.create);
  router.patch("/admin/:id", protect, adminOnly, ctrl.update);
  router.delete("/admin/:id", protect, adminOnly, ctrl.remove);
  router.get("/:id", ctrl.getById);
  router.post("/", protect, adminOnly, ctrl.create);
  router.patch("/:id", protect, adminOnly, ctrl.update);
  router.delete("/:id", protect, adminOnly, ctrl.remove);

  return router;
}

const testimonialsRouter = buildRouter(Testimonial, { published: true });
const portfolioRouter = buildRouter(Portfolio, { published: true });
const blogRouter = buildRouter(BlogPost, { published: true });
const careersRouter = buildRouter(JobOpening, { isOpen: true });
const teamRouter = buildRouter(TeamMember, { published: true });
const servicesRouter = buildRouter(Service, { published: true });
const packagesRouter = buildRouter(Package, { published: true });
const homeContentRouter = buildRouter(HomeContent, { published: true });
const aboutContentRouter = buildRouter(AboutContent, { published: true });

module.exports = {
  testimonialsRouter,
  portfolioRouter,
  blogRouter,
  careersRouter,
  teamRouter,
  servicesRouter,
  packagesRouter,
  homeContentRouter,
  aboutContentRouter,
};
