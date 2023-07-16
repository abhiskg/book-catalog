import type { Model, Types } from "mongoose";
import type { IUser } from "../user/user.interface";

type Location =
  | "Dhaka"
  | "Chattogram"
  | "Barishal"
  | "Rajshahi"
  | "Sylhet"
  | "Comilla"
  | "Rangpur"
  | "Mymensingh";

type Breed =
  | "Brahman"
  | "Nellore"
  | "Sahiwal"
  | "Gir"
  | "Indigenous"
  | "Tharparkar"
  | "Kankrej";

export type ICow = {
  name: string;
  age: number;
  price: string;
  location: Location;
  breed: Breed;
  weight: number;
  label: "for sale" | "sold out";
  category: "Dairy" | "Beef" | "Dual Purpose";
  seller: Types.ObjectId | IUser;
};

export type ICowOutput = {
  _id: Types.ObjectId;
} & ICow;

export type CowModel = Model<ICow, Record<string, unknown>>;

export type ICowFilters = {
  searchTerm?: string;
  location?: string;
  minPrice?: string;
  maxPrice?: string;
};
