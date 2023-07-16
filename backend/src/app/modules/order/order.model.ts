import { Schema, model } from "mongoose";
import type { IOrder, OrderModel } from "./order.interface";

const OrderSchema = new Schema<IOrder>(
  {
    buyer: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    cow: {
      type: Schema.Types.ObjectId,
      ref: "Cow",
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

const Order = model<IOrder, OrderModel>("Order", OrderSchema);
export default Order;
