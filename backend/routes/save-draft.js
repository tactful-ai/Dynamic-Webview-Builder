const express = require("express");
const router = express.Router();
const Template = require("../models/template");

router.post("/", async (req, res) => {
  const { content, style } = req.body;

  try {
    const template = new Template({
      content,
      style,
    });

    const savedTemplate = await template.save();

    res.status(201).json({
      message: "Draft saved successfully",
      templateId: savedTemplate._id.toString(),
    });
    console.log("Database content:", content, "Database style:", style);
  } catch (error) {
    console.error("Error saving draft:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
