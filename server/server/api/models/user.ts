import mongoose, { Model } from "mongoose";

export interface IUserModel extends mongoose.Document {
  _id: string;
  email: string;
  password: string;
}
const schema = new mongoose.Schema<IUserModel>(
  {
    email: String,
    password: String,
  },
  {
    collection: "users",
  }
);

export const User = mongoose.model<IUserModel>("User", schema);
