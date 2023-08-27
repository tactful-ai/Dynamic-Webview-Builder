const express = require("express");
const mongoose = require("mongoose");
const expressLayouts = require("express-ejs-layouts");
const cors = require("cors");

const indexRouter = require("./routes/index");

const app = express();

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", "layouts/layout");
app.use(expressLayouts);
app.use(express.static("public"));
app.use(cors({ credentials: true, origin: "http::/localhost:5173" }));
app.use("/", indexRouter);

const PORT = 3001;

const mongoURL = "mongodb://localhost:27017";

mongoose
  .connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    family: 4,
  })
  .then(() => {
    console.log("Connected to Mongoose");
  })
  .catch((error) => {
    console.error("Error connecting to Mongoose:", error);
  });

app.post("/save-draft", async (req, res) => {
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

app.get("/publish/:id", async (req, res) => {
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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
