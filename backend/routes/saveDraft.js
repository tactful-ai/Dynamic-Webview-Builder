const express = require("express");
const router = express.Router();
const Template = require("../models/template");

router.post("/", async (req, res) => {
  try {
    const { content, style, name } = req.body;

    if (!content || !style || !name) {
      return res
        .status(400)
        .json({ message: "Content, style and name are required." });
    }
    const template = new Template({
      content,
      style,
      name,
    });

    const savedTemplate = await template.save();

    res.status(201).json({
      message: "Template created successfully",
      templateId: savedTemplate._id.toString(),
      templateName: savedTemplate.name,
    });
  } catch (error) {
    console.error("Error creating template:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
