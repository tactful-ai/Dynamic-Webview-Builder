const express = require("express");
const router = express.Router();
const Template = require("../models/template"); // Import the Template model

// Define a route to handle the creation and saving of draft templates
router.post("/", async (req, res) => {
  try {
    // Extract content and style from the request body
    const { content, style } = req.body;

    // Check if content and style are provided and are not empty
    if (!content || !style) {
      return res
        .status(400)
        .json({ message: "Content and style are required." });
    }

    // Create a new template instance
    const template = new Template({
      content,
      style,
    });

    // Save the template to the database
    const savedTemplate = await template.save();

    // Respond with a 201 status code and the ID of the saved template
    res.status(201).json({
      message: "Draft saved successfully",
      templateId: savedTemplate._id.toString(),
    });
  } catch (error) {
    // Handle errors and return a 500 response for internal server errors
    console.error("Error saving draft:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
