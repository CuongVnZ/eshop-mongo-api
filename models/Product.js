const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    pid: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    desc: { type: String, required: true },
    img: { type: String, required: true },
    category: { type: String },
    size: { type: Array },
    price: { type: Number, required: true },
    inStock: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);