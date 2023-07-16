import type { Model } from "mongoose";

export type IAdmin = {
  role: "admin";
  password: string;
  phoneNumber: string;
  name: {
    firstName: string;
    lastName: string;
  };
  address: string;
};

export type IAdminMethods = {
  isPasswordMatched(
    enteredPassword: string,
    savedPassword: string
  ): Promise<boolean>;
};

export type AdminModel = Model<IAdmin, Record<string, unknown>, IAdminMethods>;

export type ILoginAdmin = {
  password: string;
  phoneNumber: string;
};
