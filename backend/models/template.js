const mongoose = require("mongoose");

const templateSchema = new mongoose.Schema({
  // Use the default ObjectId for the _id field, which is automatically created by MongoDB
  content: mongoose.Schema.Types.Mixed,
  style: mongoose.Schema.Types.Mixed,
});

const Template = mongoose.model("Template", templateSchema);

module.exports = Template;
