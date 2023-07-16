import type { RequestHandler } from "express";
import ApiError from "../../../errors/ApiError";
import sendResponse from "../../../shared/sendResponse";
import catchAsyncError from "../../middlewares/catchAsyncError";
import { UserService } from "./user.service";

const getAllUser: RequestHandler = catchAsyncError(async (req, res) => {
  const result = await UserService.getAllUser();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: " User retrieved successfully!",
    data: result,
  });
});

const getSingleUser: RequestHandler = catchAsyncError(
  async (req, res, next) => {
    const result = await UserService.getSingleUser(req.params.id);

    if (!result) {
      return next(new ApiError(404, "User not Found"));
    }

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: " User retrieved successfully!",
      data: result,
    });
  }
);

const getUserProfile: RequestHandler = catchAsyncError(
  async (req, res, next) => {
    const { _id } = req.user;
    const result = await UserService.getSingleUser(_id);

    if (!result) {
      return next(new ApiError(404, "User not Found"));
    }

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: " User Profile Retrieved Successfully",
      data: result,
    });
  }
);

const updateUser: RequestHandler = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  const result = await UserService.getSingleUser(id);

  if (!result) {
    return next(new ApiError(404, "User not Found"));
  }

  const updatedResult = await UserService.updateUser(result, req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: " User Updated successfully!",
    data: updatedResult,
  });
});

const updateUserProfile: RequestHandler = catchAsyncError(
  async (req, res, next) => {
    const { _id } = req.user;

    const result = await UserService.getSingleUser(_id);

    if (!result) {
      return next(new ApiError(404, "User not Found"));
    }

    const updatedResult = await UserService.updateUser(result, req.body);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: " User Updated successfully!",
      data: updatedResult,
    });
  }
);

const deleteUser: RequestHandler = catchAsyncError(async (req, res, next) => {
  const result = await UserService.deleteUser(req.params.id);

  if (!result) {
    return next(new ApiError(404, "User not Found"));
  }

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: " User deleted successfully!",
    data: result,
  });
});

export const UserController = {
  getAllUser,
  getSingleUser,
  updateUser,
  deleteUser,
  getUserProfile,
  updateUserProfile,
};
