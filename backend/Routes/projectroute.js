const express = require("express");
const router = express.Router();

const {
  getProjects,
  getProjectById,
  createProject,
} = require("../Controllers/ProjectController");

router.get("/", getProjects);
router.get("/test", (req, res) => res.json({ message: "Project route works" }));
router.get("/:id", getProjectById);
router.post("/", createProject);

module.exports = router;