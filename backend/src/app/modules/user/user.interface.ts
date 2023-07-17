import type { Model, Types } from "mongoose";

export type IUser = {
  name: string;
  email: string;
  password: string;
};

export type UserModel = Model<IUser, Record<string, unknown>>;

export type ILoginUser = {
  email: string;
  password: string;
};
