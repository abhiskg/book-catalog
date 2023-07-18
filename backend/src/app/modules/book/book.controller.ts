import type { RequestHandler } from "express";
import { paginationFields } from "../../../constants/pagination.constant";
import ApiError from "../../../errors/ApiError";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import catchAsyncError from "../../middlewares/catchAsyncError";
import { bookFilterableFields } from "./book.constant";
import { BookService } from "./book.service";

const createBook: RequestHandler = catchAsyncError(async (req, res) => {
  const result = await BookService.createBook(req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Book created successfully!",
    data: result,
  });
});

const getAllBooks: RequestHandler = catchAsyncError(async (req, res) => {
  const filters = pick(req.query, bookFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await BookService.getAllBooks(filters, paginationOptions);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Book retrieved successfully!",
    data: result.data,
    meta: result.meta,
  });
});

const getSingleBook: RequestHandler = catchAsyncError(
  async (req, res, next) => {
    const result = await BookService.getSingleBook(req.params.id);

    if (!result) {
      return next(new ApiError(404, "Book not Found"));
    }

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Book retrieved successfully!",
      data: result,
    });
  }
);

const updateBook: RequestHandler = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  const result = await BookService.getSingleBook(id);

  if (!result) {
    return next(new ApiError(404, "Book not Found"));
  }

  const updatedResult = await BookService.updateBook(result, req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Book Updated successfully!",
    data: updatedResult,
  });
});

const deleteBook: RequestHandler = catchAsyncError(async (req, res) => {
  const result = await BookService.deleteBook(req.params.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Book deleted successfully!",
    data: result,
  });
});

export const BookController = {
  createBook,
  getAllBooks,
  getSingleBook,
  updateBook,
  deleteBook,
};
