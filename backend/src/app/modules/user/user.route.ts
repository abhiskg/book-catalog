import express from "express";
import { ENUM_USER_ROLE } from "../../../enums/user.enum";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { UserController } from "./user.controller";
import { UserValidation } from "./user.validation";

const router = express.Router();

router.get(
  "/my-profile",
  auth(ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.SELLER),
  UserController.getUserProfile
);

router.patch(
  "/my-profile",
  auth(ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.SELLER),
  UserController.updateUserProfile
);

router.get("/:id", auth(ENUM_USER_ROLE.ADMIN), UserController.getSingleUser);
router.patch(
  "/:id",
  validateRequest(UserValidation.updateUserZodSchema),
  auth(ENUM_USER_ROLE.ADMIN),
  UserController.updateUser
);
router.delete("/:id", auth(ENUM_USER_ROLE.ADMIN), UserController.deleteUser);

router.get("/", auth(ENUM_USER_ROLE.ADMIN), UserController.getAllUser);
export const UserRoutes = router;
