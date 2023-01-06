const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const OrderSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  products: [
    {
      id: { type: Number },
      title: { type: String },
      description: { type: String },
      price: { type: Number },
      category: { type: String },
      thumbnail: { type: String },
      images: [{ type: String }],
    },
  ],
});

module.exports = Order = mongoose.model("Order", OrderSchema);
