const express = require("express");
const router = express.Router();
const Template = require("../models/template");

router.get("/", async (req, res) => {
  try {
    const templates = await Template.find();
    res.status(200).json(templates);
  } catch (error) {
    console.error("Error fetching templates:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
