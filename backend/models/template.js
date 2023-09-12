const mongoose = require("mongoose");

// Define a Mongoose schema for the Template model
const templateSchema = new mongoose.Schema({
  // Use the default ObjectId for the _id field, which is automatically created by MongoDB
  content: mongoose.Schema.Types.Mixed,
  style: mongoose.Schema.Types.Mixed,
});

// Create a Mongoose model named "Template" using the schema
const Template = mongoose.model("Template", templateSchema);

// Export the Template model for use in other parts of the application
module.exports = Template;
