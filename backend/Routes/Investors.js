const express = require("express");
const router = express.Router();

const { getInvestors , getUserById } = require("../controllers/userController");

router.get("/investors", getInvestors);
router.get("/:id", getUserById);  

module.exports = router;
