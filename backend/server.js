const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// Use environment variables or default values for configuration
const PORT = process.env.PORT || 3001;
const CORS_ORIGIN = process.env.CORS_ORIGIN || "http://localhost:5173";
const mongoURL =
  process.env.MONGODB_URL || "mongodb://localhost:27017/web-builder";

// Define API endpoints
const saveDraft = require("./routes/saveDraft");
const publish = require("./routes/publish");
const update = require("./routes/update");
const faq = require("./routes/faq");
const faqItems = require("./routes/faqItems");
const deleteTemplate = require("./routes/delete");
const itemDetails = require("./routes/itemDetails");
const allTemplates = require("./routes/allTemplates");
const findTemplate = require("./routes/findTemplate");
const cart = require("./routes/cart");

const app = express();

// Set the view engine and views directory
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

// Enable CORS with specific options
app.use(cors({ credentials: true, origin: CORS_ORIGIN }));

// Middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define route handlers
app.use("/save-draft", saveDraft);
app.use("/publish", publish);
app.use("/update", update);
app.use("/delete", deleteTemplate);
app.use("/faq", faq);
app.use("/faqItems", faqItems);
app.use("/products", itemDetails);
app.use("/templates", allTemplates);
app.use("/templates", findTemplate);
app.use("/", cart);

// Establish a connection with the MongoDB database
mongoose
  .connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    family: 4, // Use IPv4 for compatibility
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
