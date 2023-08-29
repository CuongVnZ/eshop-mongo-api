import mongoose, { Document, Schema } from "mongoose";

interface IOption extends Document {
  name: string;
  price: number;
}

interface IProduct extends Document {
  pid: string;
  title: string;
  desc: string;
  img: string;
  category?: string;
  types?: IOption[];
  options?: IOption[];
  price: number;
  inStock?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema: Schema<IProduct> = new Schema(
  {
    pid: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    desc: { type: String, required: true },
    img: { type: String, required: true },
    category: { type: String },
    types: [ { name: String, price: Number } ],
    options: [ { name: String, price: Number } ],
    price: { type: Number, required: true },
    inStock: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model<IProduct>("Product", ProductSchema);