import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document{
  username: string;
  email: string;
  fullname: string;
  phone: string;
  shippingAddress: string;
  password: string;
  points?: number;
  isAdmin?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema<IUser> = new Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    fullname: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    shippingAddress: { type: String, required: true },
    password: { type: String, required: true },
    points: { type: Number, default: 0 },
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model<IUser>("User", UserSchema);