const express = require("express");
const router = express.Router();
const Template = require("../models/template");

router.get("/publish/:id", async (req, res) => {
  const templateId = req.params.id;

  try {
    const template = await Template.findById(templateId);

    if (!template) {
      return res.status(404).json({ message: "Template not found" });
    }

    res.status(201).json({ message: " Published successfully" });
    res.json({ content: template.content });
  } catch (error) {
    console.error("Error fetching template:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
