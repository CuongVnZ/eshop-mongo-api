const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    fullname: {type: String, required: true},
    phone: {type: String, required: true, unique: true},
    shippingAddress: {type: String, required: true},
    password: { type: String, required: true },
    points: {type: Number, default: 0},
    isAdmin: {
      type: Boolean,
      default: false,
    },
    // img: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);