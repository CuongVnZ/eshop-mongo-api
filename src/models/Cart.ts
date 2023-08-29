import mongoose, { Document, Schema } from "mongoose";

interface Product {
  productId: string;
  quantity?: number;
}

interface ICart extends Document {
  uid: string;
  products: Product[];
  createdAt: Date;
  updatedAt: Date;
}

const CartSchema: Schema<ICart> = new Schema(
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

export default mongoose.model<ICart>("Cart", CartSchema);