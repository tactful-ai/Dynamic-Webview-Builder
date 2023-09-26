const express = require("express");
const router = express.Router();

const questionsAndAnswers = [
  {
    question: "yyyyy What is Dstny Engage?",
    answer:
      "Dstny Engage is an omnichannel communications software that helps businesses connect with customers across multiple channels, such as email, social media, and voice, for personalized interactions.",
  },
  {
    question: "mklseHow can Dstny Engage benefit my business?",
    answer:
      "Dstny Engage boosts customer satisfaction by delivering personalized experiences, simplifies engagement with a Unified Inbox, and increases revenue by reaching more customers through preferred channels.",
  },
  {
    question: "mklseHow can Dstny Engage benefit my business?",
    answer:
      "Dstny Engage boosts customer satisfaction by delivering personalized experiences, simplifies engagement with a Unified Inbox, and increases revenue by reaching more customers through preferred channels.",
  },
  {
    question: "mklseHow can Dstny Engage benefit my business?",
    answer:
      "Dstny Engage boosts customer satisfaction by delivering personalized experiences, simplifies engagement with a Unified Inbox, and increases revenue by reaching more customers through preferred channels.",
  },
];

router.get("/", (req, res) => {
  res.json(questionsAndAnswers);
});

module.exports = router;
