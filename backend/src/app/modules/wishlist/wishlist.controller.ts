import { Request, Response } from "express";
import sendResponse from "../../../shared/sendResponse";
import { Wishlist } from "./wishlist.model";
import { WishlistService } from "./wishlist.service";
import catchAsyncError from "../../middlewares/catchAsyncError";

const addBookWishlist = catchAsyncError(async (req: Request, res: Response) => {
  const book = req.body;

  const isExist = await Wishlist.findOne({
    userEmail: book?.userEmail,
    bookId: book?.bookId,
  }).lean();

  if (isExist) {
    await Wishlist.deleteOne({
      userEmail: book?.userEmail,
      bookId: book?.bookId,
    });

    return sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Remove from wishlist successfully",
    });
  }
  const result = await WishlistService.addBookWishlist(book);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Book added in wishlist successfully",
    data: result,
  });
});

const getWishlists = catchAsyncError(async (req: Request, res: Response) => {
  const user = req.user;
  const result = await WishlistService.getWishlists(user);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Wishlist retrieved successfully",
    data: result,
  });
});

export const WishlistCtrl = {
  addBookWishlist,
  getWishlists,
};
