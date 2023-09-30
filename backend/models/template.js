const mongoose = require("mongoose");

const templateSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  content: mongoose.Schema.Types.Mixed,
  style: mongoose.Schema.Types.Mixed,
});

const Template = mongoose.model("Template", templateSchema);

module.exports = Template;
