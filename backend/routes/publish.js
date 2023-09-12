const express = require("express");
const fs = require("fs");
const path = require("path");
const ejs = require("ejs");
const Template = require("../models/template"); // Import the Template model
const router = express.Router();

// Define a route to render and serve an HTML template
router.get("/:templateId", async (req, res) => {
  const templateId = req.params.templateId;

  try {
    // Retrieve the template by its ID from the MongoDB database
    const template = await Template.findById(templateId);

    if (!template) {
      // If the template doesn't exist, return a 404 response
      return res.status(404).json({ message: "Template not found" });
    }

    // Extract HTML content and CSS styles from the template
    const htmlContent = template.content;
    const cssStyles = template.style;

    // Define the path to the EJS template file
    const ejsTemplatePath = path.join(__dirname, "../views", "template.ejs");

    // Render the EJS template with HTML content and CSS styles
    const renderedHtml = ejs.render(fs.readFileSync(ejsTemplatePath, "utf-8"), {
      htmlContent: htmlContent,
      cssStyles: cssStyles,
    });

    // Send the rendered HTML as the response
    res.status(200).send(renderedHtml);
  } catch (error) {
    console.error("Error publishing:", error);
    // Handle errors and return a 500 response for internal server errors
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
