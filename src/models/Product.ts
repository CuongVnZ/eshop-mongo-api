import mongoose, { Document, Schema } from "mongoose";

interface Product extends Document {
  pid: string;
  title: string;
  desc: string;
  img: string;
  category?: string;
  types?: string[];
  options?: string[];
  price: number;
  inStock?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema: Schema<Product> = new Schema(
  {
    pid: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    desc: { type: String, required: true },
    img: { type: String, required: true },
    category: { type: String },
    types: { type: [String] },
    options: { type: [String] },
    price: { type: Number, required: true },
    inStock: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model<Product>("Product", ProductSchema);