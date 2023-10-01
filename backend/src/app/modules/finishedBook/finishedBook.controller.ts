import { Request, Response } from "express";
import sendResponse from "../../../shared/sendResponse";
import catchAsyncError from "../../middlewares/catchAsyncError";
import { FinishedBook } from "./finishedBook.model";
import { FinishedBookService } from "./finishedBook.service";

const addFinishedBook = catchAsyncError(async (req: Request, res: Response) => {
  const book = req.body;

  const isExist = await FinishedBook.findOne({
    userEmail: book?.userEmail,
    bookId: book?.bookId,
  }).lean();

  if (isExist) {
    await FinishedBook.deleteOne({
      userEmail: book?.userEmail,
      bookId: book?.bookId,
    });

    return sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Remove from finished book successfully",
    });
  }
  const result = await FinishedBookService.addFinishedBook(book);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Book added in Finished successfully",
    data: result,
  });
});

const getFinishedBook = catchAsyncError(async (req: Request, res: Response) => {
  const user = req.user;
  const result = await FinishedBookService.getFinishedBook(user);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Finished book retrieved successfully",
    data: result,
  });
});

export const FinishedBookCtrl = {
  addFinishedBook,
  getFinishedBook,
};
