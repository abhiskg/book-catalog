import { Request, Response } from "express";
import config from "../../../config";
import sendResponse from "../../../shared/sendResponse";
import { AuthService } from "./auth.service";
import catchAsyncError from "../../middlewares/catchAsyncError";

// login users
const loginUser = catchAsyncError(async (req: Request, res: Response) => {
  const result = await AuthService.loginUser(req.body);
  const { refreshToken, ...others } = result;

  const refreshToken_options = {
    secure: config.env === "production",
    httpOnly: true,
  };

  res.cookie("refreshToken", refreshToken, refreshToken_options);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "User logged in successfully",
    data: others,
  });
});

const createUser = catchAsyncError(async (req: Request, res: Response) => {
  const data = req.body;
  const result = await AuthService.createUser(data);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User create successfull",
    data: result,
  });
});

// login users service

export const AuthCtrl = {
  createUser,
  loginUser,
};
