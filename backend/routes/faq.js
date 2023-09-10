const express = require("express");
const router = express.Router();

// Define two sample questions and answers
const questionsAndAnswers = [
  {
    question: "What is GrapesJS?",
    answer:
      "GrapesJS is an open-source web page builder that allows you to create web pages visually.",
  },
  {
    question: "How can I integrate an API with GrapesJS?",
    answer:
      "You can integrate an API with GrapesJS by creating custom components that fetch and display data from the API.",
  },
];

const dynamicTexts = [
  { id: "1", text: "lol" },
  { id: "2", text: "xd" },
  { id: "3", text: "wow" },
];

router.get("/", (req, res) => {
  res.json(questionsAndAnswers);
});

router.get("/custom-text", (req, res) => {
  res.json(dynamicTexts);
});

module.exports = router;
