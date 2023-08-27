const mongoose = require("mongoose");

const templateSchema = new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  content: String,
});

const Template = mongoose.model("Template", templateSchema);

module.exports = Template;
