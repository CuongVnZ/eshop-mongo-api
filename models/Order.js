const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    customerId: { type: String, required: true },
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
    shippingAddress: { type: Object, required: true },
    note: { type: String, default: "" },
    paymentMethod: { type: String, required: true },
    total: { type: Number, required: true },
    status: { type: String, default: "Pending" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);