import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { AuthValidation } from "./auth.validation";
import { AuthController } from "./auth.controller";

const router = express.Router();

router.post(
  "/signup",
  validateRequest(AuthValidation.signUpUserZodSchema),
  AuthController.signUpUser
);

router.post(
  "/login",
  validateRequest(AuthValidation.loginUserZodSchema),
  AuthController.loginUser
);

router.post(
  "/refresh-token",
  validateRequest(AuthValidation.refreshTokenZodSchema),
  AuthController.refreshToken
);

export const AuthRoutes = router;