/* eslint-disable @typescript-eslint/no-unused-vars */
import type { RequestHandler } from "express";
import config from "../../../config";
import sendResponse from "../../../shared/sendResponse";
import catchAsyncError from "../../middlewares/catchAsyncError";
import { AdminService } from "./admin.service";

const createAdmin: RequestHandler = catchAsyncError(async (req, res) => {
  const result = await AdminService.createAdmin(req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Admin created successfully!",
    data: result,
  });
});

const loginAdmin: RequestHandler = catchAsyncError(async (req, res) => {
  const result = await AdminService.loginAdmin(req.body);

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
    message: "Admin login successfully!",
    data: { accessToken },
  });
});

export const AdminController = {
  createAdmin,
  loginAdmin,
};
