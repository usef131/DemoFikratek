const express = require("express");
const router = express.Router();

const { getInvestors } = require("../controllers/userController");

router.get("/investors", getInvestors);

module.exports = router;
