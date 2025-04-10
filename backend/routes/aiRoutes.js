const express = require("express");
const router = express.Router();
const { searchSkills } = require("../controllers/aiSearchController");

router.post("/search", searchSkills);

module.exports = router;
