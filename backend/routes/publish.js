const express = require("express");
const fs = require("fs");
const path = require("path");
const Template = require("../models/template");
const router = express.Router();

router.get("/:templateId", async (req, res) => {
  const templateId = req.params.templateId;

  try {
    const template = await Template.findById(templateId);

    if (!template) {
      return res.status(404).json({ message: "Template not found" });
    }
    const htmlContent = template.content;

    const ejsTemplatePath = path.join(__dirname, "../views", "template.ejs");
    fs.writeFileSync(ejsTemplatePath, htmlContent);

    const templateUrl = `http://localhost:3001/template/${templateId}`;
    console.log(templateUrl);

    res.status(200).json({ url: templateUrl });
  } catch (error) {
    console.error("Error publishing:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
