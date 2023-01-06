const express = require("express");
const router = express.Router();

//Orders model
const Order = require("../../Model/Order");

//Cart model
const Cart = require("../../Model/Cart");

// @route   POST api/ecom/cart
// @desc    Add items to cart
// @access  Public
router.post(
  "/cart",

  async (req, res) => {
    try {
      const queryres = await Cart.findOneAndUpdate(
        { email: req.body.email },
        { $push: { products: req.body.products }, email: req.body.email },
        { new: true, upsert: true }
      );

      res.json({ response: queryres, message: "Item was added successfully" });
    } catch (err) {
      return res.status(400).json(err);
    }
  }
);

// @route   DELETE api/ecom/cart
// @desc    Delete items to cart
// @access  Public
router.delete(
  "/cart",
  async (req, res) => {
    try {
      const Doc = await Cart.findOne({ email: req.body.email });
      Doc.products.pull({ _id: req.body.product_id });
      const delresponse=await Doc.save();
      res.json({ response: delresponse, message: "Item was deleted successfully" });
    } catch (err) {
      console.log(err);
      return res.status(400).json(err);
    }
  }
);

// @route   GET api/ecom/cart
// @desc    GET items of cart
// @access  Public
router.get("/cart", async (req, res) => {
  try {
    const quersyres = await Cart.findOne({ email: req.query.email });
    res.json({ response: queryres, message: "cart details fetched" });
  } catch (err) {
    return res.status(400).json(err);
  }
});

// @route   POST api/ecom/order
// @desc    Create order
// @access  Public
router.post("/order", async (req, res) => {
  try {
    const quersyres = await Order.create({ ...req.body });
    res.json({ message: "Order created successfully." });
  } catch (err) {
    console.log(err);
    return res.status(400).json(err);
  }
});

module.exports = router;