import type { RequestHandler } from "express";
import { paginationFields } from "../../../constants/pagination.constant";
import ApiError from "../../../errors/ApiError";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import catchAsyncError from "../../middlewares/catchAsyncError";
import { cowFilterableFields } from "./cow.constant";
import { CowService } from "./cow.service";

const createCow: RequestHandler = catchAsyncError(async (req, res) => {
  const { _id: userId } = req.user;
  const { seller } = req.body;
  if (userId !== seller) {
    throw new ApiError(401, "Unauthorized");
  }
  const result = await CowService.createCow(req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: " Cow created successfully!",
    data: result,
  });
});

const getAllCow: RequestHandler = catchAsyncError(async (req, res) => {
  const filters = pick(req.query, cowFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await CowService.getAllCow(filters, paginationOptions);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: " Cow retrieved successfully!",
    data: result.data,
    meta: result.meta,
  });
});

const getSingleCow: RequestHandler = catchAsyncError(async (req, res, next) => {
  const result = await CowService.getSingleCow(req.params.id);

  if (!result) {
    return next(new ApiError(404, "Cow not Found"));
  }

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: " Cow retrieved successfully!",
    data: result,
  });
});

const updateCow: RequestHandler = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const result = await CowService.getSingleCow(id);

  if (!result) {
    return next(new ApiError(404, "Cow not Found"));
  }

  const { _id: userId } = req.user;

  if (result.seller.toString() !== userId) {
    throw new ApiError(401, "You are not authorized");
  }

  const updatedResult = await CowService.updateCow(result, req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: " Cow Updated successfully!",
    data: updatedResult,
  });
});

const deleteCow: RequestHandler = catchAsyncError(async (req, res, next) => {
  const cow = await CowService.getSingleCow(req.params.id);

  if (!cow) {
    return next(new ApiError(404, "Cow not Found"));
  }

  const { _id: userId } = req.user;

  if (cow.seller.toString() !== userId) {
    throw new ApiError(401, "You are not authorized");
  }

  const result = await CowService.deleteCow(req.params.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: " Cow deleted successfully!",
    data: result,
  });
});

export const CowController = {
  createCow,
  getAllCow,
  getSingleCow,
  updateCow,
  deleteCow,
};
