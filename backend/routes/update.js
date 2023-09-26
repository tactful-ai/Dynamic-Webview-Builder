const express = require("express");
const router = express.Router();
const Template = require("../models/template");

// Update an existing template by its ID
router.patch("/:templateId", async (req, res) => {
  try {
    // Extract content and style from the request body
    const { content, style } = req.body;

    if (!content && !style) {
      return res
        .status(400)
        .json({ message: "Content or style is required for the update." });
    }

    const templateId = req.params.templateId;

    // Check if the template with the given ID exists
    const existingTemplate = await Template.findById(templateId);

    if (!existingTemplate) {
      return res.status(404).json({ message: "Template not found" });
    }

    // Update the template with the new content and style
    if (content) {
      existingTemplate.content = content;
    }

    if (style) {
      existingTemplate.style = style;
    }

    // Save the updated template to the database
    const updatedTemplate = await existingTemplate.save();

    res.status(200).json({
      message: "Template updated successfully",
      templateId: updatedTemplate._id.toString(),
    });
  } catch (error) {
    console.error("Error updating template:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
