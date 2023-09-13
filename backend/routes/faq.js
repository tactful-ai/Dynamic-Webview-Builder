const express = require("express");
const router = express.Router();

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

router.get("/", (req, res) => {
  res.json(questionsAndAnswers);
});

module.exports = router;
