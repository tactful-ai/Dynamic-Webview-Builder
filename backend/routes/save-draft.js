const express = require("express");
const router = express.Router();
const Template = require("../models/template");

router.post("/save-draft", async (req, res) => {
  const { content } = req.body;

  try {
    const template = new Template({
      content,
    });

    await template.save();

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
