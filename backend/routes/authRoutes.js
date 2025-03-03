const express = require("express");
const router = express.Router();

// Dummy Auth Route
router.get("/", (req, res) => {
  res.send("Auth route is working!");
});

module.exports = router;
