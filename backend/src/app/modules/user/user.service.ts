/* eslint-disable @typescript-eslint/no-explicit-any */
import type { IGenericMongoDBDocument } from "../../../interfaces/document.interface";
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

  const updatedDocument = await result.save();

  return updatedDocument;
};

const deleteUser = async (id: string) => {
  let result;

  return result;
};

export const UserService = {
  getAllUser,
  deleteUser,
  getSingleUser,
  updateUser,
};
