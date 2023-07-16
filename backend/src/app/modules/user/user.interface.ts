import type { Model, Types } from "mongoose";

export type IUser = {
  role: string;
  password: string;
  phoneNumber: string;
  name: {
    firstName: string;
    lastName: string;
  };
  address: string;
  budget: number;
  income: number;
};

export type IUserOutput = {
  _id: Types.ObjectId;
} & IUser;

export type IUserMethods = {
  isPasswordMatched(
    enteredPassword: string,
    savedPassword: string
  ): Promise<boolean>;
};

export type UserModel = Model<IUser, Record<string, unknown>, IUserMethods>;

export type ILoginUser = {
  password: string;
  phoneNumber: string;
};
