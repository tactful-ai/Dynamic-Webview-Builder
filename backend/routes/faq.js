const express = require("express");
const router = express.Router();

const questionsAndAnswers = [
  {
    question: "What is GrapesJS?",
    answer:
      "GrapesJS is an open-source web page builder framework that enables developers and designers to create and customize web pages visually. It provides a drag-and-drop interface and a wide range of features for building responsive and interactive web designs without writing code.",
  },
  {
    question: "How can GrapesJS benefit web developers and designers?",
    answer:
      "GrapesJS simplifies the web development and design process by offering a user-friendly interface for creating web pages. It allows for rapid prototyping, easy content management, and the ability to export clean and structured HTML and CSS code, saving time and effort in the development workflow.",
  },
];

router.get("/", (req, res) => {
  res.json(questionsAndAnswers);
});

module.exports = router;
