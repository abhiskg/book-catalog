import { Request, Response } from "express";
import sendResponse from "../../../shared/sendResponse";
import catchAsyncError from "../../middlewares/catchAsyncError";
import { UserService } from "./users.service";

// get all users
const getAllUsers = catchAsyncError(async (req: Request, res: Response) => {
  const result = await UserService.getAllUsers();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Get all users successfully",
    data: result,
  });
});

// get single user
const getSingleUser = catchAsyncError(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await UserService.getSingleUser(id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Find single user successfully",
    data: result,
  });
});

export const UsersCtrl = {
  getAllUsers,
  getSingleUser,
};
