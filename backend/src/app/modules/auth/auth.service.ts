import type { JwtPayload } from "jsonwebtoken";
import config from "../../../config";
import ApiError from "../../../errors/ApiError";
import { JwtHelper } from "../../../helpers/jwt.helper";
import type { ILoginUser, IUser } from "../user/user.interface";
import User from "../user/user.model";

const signUpUser = async (payload: IUser) => {
  const result = await User.create(payload);
  return result;
};

const loginUser = async (payload: ILoginUser) => {
  const { password, phoneNumber } = payload;

  const admin = await User.findOne({ phoneNumber }, { password: 1, role: 1 });

  if (!admin || !(await admin.isPasswordMatched(password, admin.password))) {
    throw new ApiError(401, "Invalid Admin or Password");
  }

  const tokenPayload = {
    _id: admin._id,
    role: admin.role,
  };

  const accessToken = JwtHelper.generateToken(
    tokenPayload,
    config.jwt.access_secret,
    config.jwt.access_expires_in
  );

  const refreshToken = JwtHelper.generateToken(
    tokenPayload,
    config.jwt.refresh_secret,
    config.jwt.refresh_expires_in
  );

  return {
    accessToken,
    refreshToken,
  };
};

const refreshToken = async (token: string) => {
  try {
    const verifiedToken = JwtHelper.verifyToken(
      token,
      config.jwt.refresh_secret
    ) as JwtPayload;

    const user = User.findById(verifiedToken._id);

    if (!user) {
      throw new ApiError(404, "User doesn't exist");
    }

    const tokenPayload = {
      id: user.id,
      role: user.role,
    };

    const accessToken = JwtHelper.generateToken(
      tokenPayload,
      config.jwt.access_secret,
      config.jwt.access_expires_in
    );

    return { accessToken };
  } catch (error) {
    throw new ApiError(401, "Invalid Refresh Token");
  }
};

export const AuthService = {
  signUpUser,
  loginUser,
  refreshToken,
};
