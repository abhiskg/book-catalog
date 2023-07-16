import type { Model, Types } from "mongoose";
import type { ICow } from "../cow/cow.interface";
import type { IUser } from "../user/user.interface";

export type IOrder = {
  cow: Types.ObjectId | ICow;
  buyer: Types.ObjectId | IUser;
};

export type OrderModel = Model<IOrder, Record<string, unknown>>;
