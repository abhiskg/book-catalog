import type { RequestHandler } from "express";
import ApiError from "../../../errors/ApiError";
import sendResponse from "../../../shared/sendResponse";
import catchAsyncError from "../../middlewares/catchAsyncError";
import type { ICowOutput } from "../cow/cow.interface";
import type { IUserOutput } from "../user/user.interface";
import { OrderService } from "./order.service";

const createOrder: RequestHandler = catchAsyncError(async (req, res) => {
  const { _id } = req.user;
  const { buyer } = req.body;

  if (buyer !== _id) {
    throw new ApiError(403, "Forbidden");
  }
  const result = await OrderService.createOrder(req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    data: result,
    message: "Order created successfully",
  });
});

const getAllOrder: RequestHandler = catchAsyncError(async (req, res) => {
  const { _id, role } = req.user;
  let result;
  if (role === "buyer") {
    result = await OrderService.getAllBuyerOrders(_id);
  } else if (role === "seller") {
    result = await OrderService.getAllSellerOrders(_id);
  } else {
    result = await OrderService.getAllOrders();
  }

  sendResponse(res, {
    statusCode: 200,
    success: true,
    data: result,
    message: "Order retrieved successfully",
  });
});

const getSpecificOrder: RequestHandler = catchAsyncError(async (req, res) => {
  const { _id, role } = req.user;
  const result = await OrderService.getSpecificOrder(req.params.id);

  if (!result) {
    throw new ApiError(404, "Order not found");
  }
  if (
    role === "buyer" &&
    (result.buyer as IUserOutput)._id.toString() !== _id
  ) {
    throw new ApiError(401, "This Buyer is not authorized");
  }
  if (
    role === "seller" &&
    ((result.cow as ICowOutput).seller as IUserOutput)._id.toString() !== _id
  ) {
    throw new ApiError(401, "This seller is not authorized");
  }

  sendResponse(res, {
    statusCode: 200,
    success: true,
    data: result,
    message: "Order retrieved successfully",
  });
});

export const OrderController = {
  createOrder,
  getAllOrder,
  getSpecificOrder,
};
