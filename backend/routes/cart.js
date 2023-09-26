const express = require("express");
const router = express.Router();

const cart = [];

router.post("/add", async (req, res) => {
  const { productId, quantity } = req.body;

  const product = await fetch(`http://localhost:3001/products/${productId}`);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  cart.push({
    product,
    quantity: parseInt(quantity),
  });

  res.redirect("/cart");
});

router.get("/cart", (req, res) => {
  res.render("cart", { cart });
});

module.exports = router;
