import type { Model } from "mongoose";

export type IBook = {
  title: string;
  author: string;
  genre: string;
  publicationDate: Date;
  reviews: string[];
};

export type BookModel = Model<IBook, Record<string, unknown>>;

export type IBookFilters = {
  search?: string;
  genre?: string;
  publicationDate?: string;
};
