import { Request, Response } from "express";
import sendResponse from "../../../shared/sendResponse";
import catchAsyncError from "../../middlewares/catchAsyncError";
import { PlanToRead } from "./planToRead.model";
import { PlanToReadService } from "./planToRead.service";

const addPlanToRead = catchAsyncError(async (req: Request, res: Response) => {
  const book = req.body;

  const isExist = await PlanToRead.findOne({
    userEmail: book?.userEmail,
    bookId: book?.bookId,
  }).lean();

  if (isExist) {
    await PlanToRead.deleteOne({
      userEmail: book?.userEmail,
      bookId: book?.bookId,
    });

    return sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Remove from Plan To Read successfully",
    });
  }
  const result = await PlanToReadService.addPlanToRead(book);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Book added in Plan To Read successfully",
    data: result,
  });
});

const getPlanToRead = catchAsyncError(async (req: Request, res: Response) => {
  const user = req.user;
  const result = await PlanToReadService.getPlanToRead(user);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "PlanToRead retrieved successfully",
    data: result,
  });
});

export const PlanToReadCtrl = {
  addPlanToRead,
  getPlanToRead,
};
