const express = require("express");
const router = express.Router();
const Template = require("../models/template");

// Delete a template by its ID
router.delete("/:templateId", async (req, res) => {
  try {
    const templateId = req.params.templateId;

    // Check if the template with the given ID exists
    const existingTemplate = await Template.findById(templateId);

    if (!existingTemplate) {
      return res.status(404).json({ message: "Template not found" });
    }

    // Delete the template from the database using deleteOne
    await Template.deleteOne({ _id: templateId });

    res.status(200).json({ message: "Template deleted successfully" });
  } catch (error) {
    console.error("Error deleting template:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
