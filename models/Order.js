const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    uid: { type: String, required: true },
    items: [
      {
        productId: {
          type: String,
        },
        quantity: {
          type: Number,
          default: 1,
        },
        price: {
          type: Number,
          default: 0,
        },
      },
    ],
    shipping: { type: Number, required: true },
    address: { type: Object, required: true },
    note: { type: String, default: "" },
    status: { type: String, default: "Pending" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);