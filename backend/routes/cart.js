const express = require("express");
const router = express.Router();
const ejs = require("ejs");

// Define a cart array to store cart items (you can use a database for a real application)
const cart = [];

// Add to Cart route
router.post("/add", async(req, res) => {
  const { productId, quantity } = req.body;

  // Find the product by its ID
  const product  = await fetch(`http://localhost:3001/products/${productId}`);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  // Add the product to the cart with the specified quantity
  cart.push({
    product,
    quantity: parseInt(quantity), // Ensure quantity is a number
  });

  res.redirect("/cart"); // Redirect to the cart page or another appropriate route
});

// Cart page route (you can create a separate route to display the cart)
router.get("/cart", (req, res) => {
  // Render the cart page with the items in the cart array
  res.render("cart", { cart });
});

module.exports = router;