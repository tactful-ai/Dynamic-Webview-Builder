// routes/templates.js
const express = require("express");
const router = express.Router();
const Template = require("../models/template");

// Define a route to fetch all templates
router.get("/", async (req, res) => {
  try {
    // Fetch all templates from the database
    const templates = await Template.find();

    // Send the list of templates as a JSON response
    res.status(200).json(templates);
  } catch (error) {
    console.error("Error fetching templates:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
