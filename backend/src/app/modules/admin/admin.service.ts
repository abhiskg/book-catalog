import config from "../../../config";
import ApiError from "../../../errors/ApiError";
import { JwtHelper } from "../../../helpers/jwt.helper";
import type { IAdmin, ILoginAdmin } from "./admin.interface";
import Admin from "./admin.model";

const createAdmin = async (payload: IAdmin) => {
  const result = await Admin.create(payload);
  return result;
};

const loginAdmin = async (payload: ILoginAdmin) => {
  const { password, phoneNumber } = payload;

  const admin = await Admin.findOne({ phoneNumber }, { password: 1, role: 1 });

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

export const AdminService = {
  createAdmin,
  loginAdmin,
};
