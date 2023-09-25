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

    // Extract HTML content and CSS styles from the template
    const htmlContent = template.content;
    const cssStyles = template.style;

    const ejsTemplatePath = path.join(__dirname, "../views", "template.ejs");

    const renderedHtml = ejs.render(fs.readFileSync(ejsTemplatePath, "utf-8"), {
      htmlContent: htmlContent,
      cssStyles: cssStyles,
    });

    res.status(200).send(renderedHtml);
  } catch (error) {
    console.error("Error publishing:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/:templateId/:id", async (req, res) => {
  const templateId = req.params.templateId;
  const id = req.params.id;
  try {
    const template = await Template.findById(templateId);

    if (!template) {
      return res.status(404).json({ message: "Template not found" });
    }
      // Now, fetch the product details using the product's id (id)
      const productResponse = await fetch(`http://localhost:3001/products/${id}`);

      if (!productResponse.ok) {
        return res.status(404).json({ message: "Product not found" });
      }

      const productData = await productResponse.json();


    const ejsTemplatePath = path.join(__dirname,"../views", "productTemplate.ejs");

    const renderedHtml = ejs.render(fs.readFileSync(ejsTemplatePath, "utf-8"), {
       productData 
    });


    res.status(200).send(renderedHtml);

  }
  catch (error) {
    console.error("Error publishing:", error);
    res.status(500).json({ message: "Internal server error" });
  }

});


module.exports = router;
