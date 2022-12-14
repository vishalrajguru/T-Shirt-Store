const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const productCartSchema = mongoose.Schema({
  product: {
    type: ObjectId,
    ref: "Product",
  },
  name: String,
  price: Number,
  count: Number,
});
const ProductCart = mongoose.model("productCart", productCartSchema);
const orderSchema = new mongoose.Schema(
  {
    product: [productCartSchema],
    transaction_Id: {},
    amount: Number,
    price: Number,
    address: String,
    status: {
      type: String,
      default: "Received",
      enum: ["Cancelled", "Delivered", "Shipped", "Processing", "Received"]
    },
    updated: Date,
    user: {
      type: ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);
const Order = mongoose.model("Order", orderSchema);
module.exports = { ProductCart, Order };
