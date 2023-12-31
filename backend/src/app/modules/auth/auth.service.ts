import { Secret } from "jsonwebtoken";
import config from "../../../config";
import ApiError from "../../../errors/ApiError";
import { jwtHelpers } from "../../../helpers/jwtHelpers";
import { IUser } from "../../modules/users/users.interface";
import { User } from "../../modules/users/users.model";
import { IUserAuth } from "./auth.interface";

const createUser = async (payload: IUser) => {
  console.log("duplicate", payload);
  const user = await User.find(payload);
  const result = await User.create(payload);

  if (!result) {
    throw new ApiError(404, "signup request failed!");
  }
  return result;
};

// login
const loginUser = async (payload: IUserAuth) => {
  const { email: userEmail, password } = payload;

  const isUserExit = await User.findOne({ email: userEmail });
  console.log("sUserExit", isUserExit, userEmail);

  if (!isUserExit) {
    throw new ApiError(404, "User not found!");
  }

  if (
    isUserExit?.password &&
    !(await User.isPasswordMatch(password, isUserExit.password))
  ) {
    throw new ApiError(401, "Password not match!");
  }

  const { _id: id, email } = isUserExit;

  const accessToken = jwtHelpers.createToken(
    { id, email },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );
  const refreshToken = jwtHelpers.createToken(
    { id, email },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
    email,
  };
};

export const AuthService = {
  createUser,
  loginUser,
};
