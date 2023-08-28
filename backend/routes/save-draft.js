const express = require("express");
const router = express.Router();
const Template = require("../models/template");

router.post("/", async (req, res) => {
  const content = req.body;

  try {
    const template = new Template({
      content,
    });

    const savedTemplate = await template.save(); // Corrected variable name

    res.status(201).json({
      message: "Draft saved successfully",
      templateId: savedTemplate._id,
    });
  } catch (error) {
    console.error("Error saving draft:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
