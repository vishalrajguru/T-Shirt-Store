const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      maxlength: 32,
      required: true,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 200,
      required: true,
    },
    price: {
      type: Number,
      maxlength: 32,
      required: true,
    },
    stock: {
      type: Number,
      trim: true,
    },
    category: {
      type: ObjectId,
      ref: "Category",
      required: true, 
    },
    sold: {
      type: Number,
      default: 0,
    },
    url: {
      type: String,
      required: true,
    },
  },
  { timestamp: true }
);
module.exports = mongoose.model("Product", productSchema);
