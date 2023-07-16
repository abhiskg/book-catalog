import { startSession } from "mongoose";
import ApiError from "../../../errors/ApiError";
import type { ICow } from "../cow/cow.interface";
import Cow from "../cow/cow.model";
import User from "../user/user.model";
import type { IOrder } from "./order.interface";
import Order from "./order.model";

const createOrder = async (payload: IOrder) => {
  const { buyer: buyerId, cow: cowId } = payload;

  const buyer = await User.findById(buyerId);
  if (!buyer) {
    throw new ApiError(404, "Buyer not found");
  }

  const cow = await Cow.findById(cowId);
  if (!cow) {
    throw new ApiError(404, "Cow not found");
  }

  if (cow.label === "sold out") {
    throw new ApiError(400, "Cow Sold Out");
  }

  const seller = await User.findById(cow.seller);
  if (!seller) {
    throw new ApiError(404, "Seller not found");
  }

  if (Number(buyer.budget) < Number(cow.price)) {
    throw new ApiError(400, "Buyer don't have enough money");
  }

  let result;
  //   Transaction and Rollback
  const session = await startSession();
  session.startTransaction();
  try {
    buyer.budget = Number(buyer.budget) - Number(cow.price);
    await buyer.save({ session });

    cow.label = "sold out";
    await cow.save({ session });

    seller.income = Number(seller.income) + Number(cow.price);
    await seller.save({ session });

    const [order] = await Order.create([payload], { session });

    result = order;

    await session.commitTransaction();
  } catch (error) {
    await session.abortTransaction();
  } finally {
    await session.endSession();
  }

  const savedOrder = await Order.findById(result?._id)
    .populate("cow")
    .populate("buyer");

  return savedOrder;
};

const getAllOrders = async () => {
  const result = await Order.find({}).populate("cow").populate("buyer");
  return result;
};

const getAllBuyerOrders = async (id: string) => {
  const result = await Order.find({ buyer: id })
    .populate("cow")
    .populate("buyer");
  return result;
};

const getAllSellerOrders = async (id: string) => {
  const results = await Order.find().populate("cow").populate("buyer");
  if (results?.length > 0) {
    const filteredResult = results.filter(
      (result) => (result.cow as ICow).seller.toString() === id
    );
    return filteredResult;
  }
  return results;
};

const getSpecificOrder = async (id: string) => {
  const result = await Order.findById(id)
    .populate("buyer")
    .populate({
      path: "cow",
      populate: [
        {
          path: "seller",
        },
      ],
    });
  return result;
};

export const OrderService = {
  createOrder,
  getAllOrders,
  getSpecificOrder,
  getAllBuyerOrders,
  getAllSellerOrders,
};
