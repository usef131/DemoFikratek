const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: String,
    summary: String,
    description: String,
    category: String,
    fundingGoal: Number,
    teamSize: Number,
    status: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "Project",
  projectSchema
);