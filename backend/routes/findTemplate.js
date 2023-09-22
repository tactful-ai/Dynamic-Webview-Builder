const express = require("express");
const router = express.Router();
const Template = require("../models/template");

router.get("/:templateId", async (req, res) => {
  try {
    const { templateId } = req.params;

    const template = await Template.findById(templateId);

    if (!template) {
      console.log("Not Found");
      return res.status(404).json({ message: "Template not found" });
    }

    res.status(200).json({
      content: template.content,
      style: template.style,
    });
  } catch (error) {
    console.error("Error fetching template:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
