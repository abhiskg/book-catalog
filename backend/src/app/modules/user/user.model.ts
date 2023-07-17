import { Schema, model } from "mongoose";
import type { IUser, UserModel } from "./user.interface";

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, "User name is Required"],
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      required: true
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

const User = model<IUser, UserModel>("User", userSchema);
export default User;
