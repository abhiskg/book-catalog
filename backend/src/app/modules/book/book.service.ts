import { PaginationHelper } from "../../../helpers/pagination.helper";
import { type IGenericMongoDBDocument } from "../../../interfaces/document.interface";
import type { IPaginationOptions } from "../../../interfaces/pagination.interface";

import { UpdateHelper } from "../../../helpers/update.helper";
import { bookSearchableFields } from "./book.constant";
import { IBook, IBookFilters } from "./book.interface";
import Book from "./book.model";

const getAllBooks = async (
  filters: IBookFilters,
  paginationOptions: IPaginationOptions
) => {
  const { search, ...filtersData } = filters;

  const { limit, page, skip, sortCondition } =
    PaginationHelper.calculatePagination(paginationOptions, {
      limit: 10,
      page: 1,
      sortBy: "createdAt",
      sortOrder: "desc",
    });

  const andConditions = [];

  if (search) {
    andConditions.push({
      $or: bookSearchableFields.map((field) => ({
        [field]: { $regex: search, $options: "i" },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const filterCondition =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Book.find(filterCondition)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);

  const total = await Book.countDocuments(filterCondition);
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleBook = async (id: string) => {
  const result = await Book.findById(id)
    .populate("academicBook")
    .populate("academicDepartment");
  return result;
};

const updateBook = async (
  result: IGenericMongoDBDocument<IBook>,
  payload: Partial<IBook>
) => {
  const { updatedDocument } = await UpdateHelper.updateDocument(
    result,
    payload
  );

  return updatedDocument;
};

const deleteBook = async (id: string) => {
  const result = await Book.findByIdAndDelete(id);
  return result;
};

export const BookService = {
  getAllBooks,
  deleteBook,
  getSingleBook,
  updateBook,
};
