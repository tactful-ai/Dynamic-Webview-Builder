const express = require("express");
const router = express.Router();

const dynamicTexts = [{ text: "Hello" }, { text: "Welcome" }];

router.get("/", (req, res) => {
  res.json(dynamicTexts);
});

module.exports = router;
