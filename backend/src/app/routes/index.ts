import express from "express";
import { CowRoutes } from "../modules/cow/cow.route";
import { AuthRoutes } from "../modules/auth/auth.route";
import { UserRoutes } from "../modules/user/user.route";
import { OrderRoutes } from "../modules/order/order.route";
import { AdminRoutes } from "../modules/admin/admin.route";

const router = express.Router();

router.use("/cows", CowRoutes);
router.use("/auth", AuthRoutes);
router.use("/users", UserRoutes);
router.use("/orders", OrderRoutes);
router.use("/admins", AdminRoutes);

export const RootRoute = router;
