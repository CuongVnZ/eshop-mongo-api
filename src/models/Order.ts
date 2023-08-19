import mongoose, { Document, Schema } from "mongoose";

interface Item {
  pid: string;
  quantity?: number;
  price?: number;
}

interface Order extends Document {
  customerId: string;
  items: Item[];
  shipping: number;
  shippingAddress: object;
  note?: string;
  paymentMethod: string;
  total: number;
  status?: string;
  createdAt: Date;
  updatedAt: Date;
}

const OrderSchema: Schema<Order> = new Schema(
  {
    customerId: { type: String, required: true },
    items: [
      {
        pid: {
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

export default mongoose.model<Order>("Order", OrderSchema);