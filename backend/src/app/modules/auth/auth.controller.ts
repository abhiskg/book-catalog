import type { RequestHandler } from "express";
import config from "../../../config";
import sendResponse from "../../../shared/sendResponse";
import catchAsyncError from "../../middlewares/catchAsyncError";
import { AuthService } from "./auth.service";

const signUpUser: RequestHandler = catchAsyncError(async (req, res) => {
  const result = await AuthService.signUpUser(req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: " User created successfully!",
    data: result,
  });
});

const loginUser: RequestHandler = catchAsyncError(async (req, res) => {
  const result = await AuthService.loginUser(req.body);

  const { accessToken, refreshToken } = result;

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: config.env === "production",
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User login successfully!",
    data: { accessToken },
  });
});

const refreshToken: RequestHandler = catchAsyncError(async (req, res) => {
  const { refreshToken } = req.cookies;
  const result = await AuthService.refreshToken(refreshToken);

  res.cookie("refreshToken", refreshToken, {
    secure: config.env === "production",
    httpOnly: true,
    sameSite: "strict", // Prevent CSRF attacks
    maxAge: 30 * 24 * 60 * 60 * 1000, //30days
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "New access token generated successfully !",
    data: result,
  });
});

export const AuthController = {
  signUpUser,
  loginUser,
  refreshToken,
};
