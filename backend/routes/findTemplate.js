const express = require("express");
const router = express.Router();
const Template = require("../models/template");

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Fetch the template by ID from the database
    const template = await Template.findById(id);

    if (!template) {
      return res.status(404).json({ message: "Template not found" });
    }
    res.status(200).json(template);


    // // Extract content and style from the template
    // const { content, style } = template;

    // // Render the Builder component with content and style as props
    // res.render("builder", { content, style });
  } catch (error) {
    console.error("Error fetching template:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
