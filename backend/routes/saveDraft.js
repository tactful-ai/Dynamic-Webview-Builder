const express = require("express");
const router = express.Router();
const Template = require("../models/template");

router.post("/", async (req, res) => {
  try {
    // Extract content and style from the request body
    const { content, style } = req.body;

    if (!content || !style) {
      return res
        .status(400)
        .json({ message: "Content and style are required." });
    }

    const template = new Template({
      content,
      style,
    });

    // Save the template to the database
    const savedTemplate = await template.save();

    res.status(201).json({
      message: "Draft saved successfully",
      templateId: savedTemplate._id.toString(),
    });
  } catch (error) {
    console.error("Error saving draft:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
