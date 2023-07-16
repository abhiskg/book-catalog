/* eslint-disable @typescript-eslint/no-explicit-any */
import { startSession } from "mongoose";
import ApiError from "../../../errors/ApiError";
import type { IGenericMongoDBDocument } from "../../../interfaces/document.interface";
import Cow from "../cow/cow.model";
import type { IUser } from "./user.interface";
import User from "./user.model";

const getAllUser = async () => {
  const result = await User.find({});

  return result;
};

const getSingleUser = async (id: string) => {
  const result = await User.findById(id);
  return result;
};

const updateUser = async (
  result: IGenericMongoDBDocument<IUser>,
  payload: Partial<IUser>
) => {
  const { name, ...userData } = payload;

  if (Object.keys(userData).length > 0) {
    Object.keys(userData).forEach((key) => {
      if (key in result) {
        (result as any)[key] = userData[key as keyof typeof userData];
      }
    });
  }

  // result.name.firstName
  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach((key) => {
      result.name[key as keyof typeof name] = name[key as keyof typeof name];
    });
  }

  const updatedDocument = await result.save();

  return updatedDocument;
};

const deleteUser = async (id: string) => {
  let result;
  // Transaction and rollback
  const session = await startSession();
  session.startTransaction();
  try {
    const user = await User.findByIdAndDelete(id, { session });

    if (!user) {
      throw new ApiError(404, "Id not found");
    }

    if (user.role === "seller" && (await Cow.findOne({ seller: id }))) {
      await Cow.deleteMany({ seller: id }, { session });
    }

    result = user;

    await session.commitTransaction();
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    await session.endSession();
  }
  return result;
};

export const UserService = {
  getAllUser,
  deleteUser,
  getSingleUser,
  updateUser,
};
