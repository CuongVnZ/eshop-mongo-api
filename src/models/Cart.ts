import mongoose, { Document, Schema } from "mongoose";

interface Product {
  productId: string;
  quantity?: number;
}

interface Cart extends Document {
  uid: string;
  products: Product[];
  createdAt: Date;
  updatedAt: Date;
}

const CartSchema: Schema<Cart> = new Schema(
  {
    uid: { type: String, required: true },
    products: [
      {
        productId: {
          type: String,
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model<Cart>("Cart", CartSchema);