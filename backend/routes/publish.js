const express = require("express");
const fs = require("fs");
const path = require("path");
const ejs = require("ejs");
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

    const cssStyles = template.style;

    const ejsTemplatePath = path.join(__dirname, "../views", "template.ejs");

    const renderedHtml = ejs.render(fs.readFileSync(ejsTemplatePath, "utf-8"), {
      htmlContent: htmlContent,
      cssStyles: cssStyles, // Pass the CSS styles to the EJS template
    });
    res.status(200).send(renderedHtml);
  } catch (error) {
    console.error("Error publishing:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
