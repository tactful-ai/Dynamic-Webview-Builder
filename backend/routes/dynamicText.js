const express = require("express");
const router = express.Router();

// Sample data representing dynamic texts
const dynamicTexts = [{ text: "Hello" }, { text: "Welcome" }];

// Define a GET route that returns the dynamic texts
router.get("/", (req, res) => {
  res.json(dynamicTexts);
});

module.exports = router;
