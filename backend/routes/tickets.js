const express = require("express");
const router = express.Router();
const tickets = [];

// Create a new ticket
router.post("/tickets", (req, res) => {
  const newTicket = req.body;
  tickets.push(newTicket);
  res.json(newTicket);
});

// View all tickets
router.get("/tickets", (req, res) => {
  res.json(tickets);
});
module.exports = router;
