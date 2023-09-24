const express = require("express");
const router = express.Router();
const products = [
  {
    id: "1",
    productName: "Product 1",
    picture:
      "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?cs=srgb&dl=pexels-math-90946.jpg&fm=jpg",
    description: "Description of Product 1",
    ratings: "5",
  },
  {
    id: "2",
    productName: "Product 2",
    picture:
      "https://img.freepik.com/photos-gratuite/appareil-numerique-sans-fil-casque-rose_53876-96804.jpg?w=360",
    description: "Description of Product 2",
    ratings: "3.5",
  },
];

// Get all products
router.get("/", (req, res) => {
  res.json(products);
});

// Get a specific product by ID
router.get("/:productId", (req, res) => {
  const productId = req.params.productId;
  const product = products.find((p) => p.id === productId);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.json(product);
});

module.exports = router;
