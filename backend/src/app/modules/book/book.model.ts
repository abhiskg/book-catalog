import { Schema, model } from "mongoose";
import type { BookModel, IBook } from "./book.interface";

const bookSchema = new Schema<IBook>(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
    publicationDate: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    reviews: {
      type: [String],
      required: true,
      default: [],
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

const Book = model<IBook, BookModel>("Book", bookSchema);
export default Book;
