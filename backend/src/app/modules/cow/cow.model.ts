import { Schema, model } from "mongoose";
import type { CowModel, ICow } from "./cow.interface";
import { cowBreed, cowCategory, cowLabel, cowLocation } from "./cow.constant";

const cowSchema = new Schema<ICow>(
  {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
      enum: cowLocation,
    },
    breed: {
      type: String,
      required: true,
      enum: cowBreed,
    },
    weight: {
      type: Number,
      required: true,
    },
    label: {
      type: String,
      enum: cowLabel,
      default: "for sale",
    },
    category: {
      type: String,
      required: true,
      enum: cowCategory,
    },
    seller: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

const Cow = model<ICow, CowModel>("Cow", cowSchema);
export default Cow;
