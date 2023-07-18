import express from "express";

import { BookRoutes } from "../modules/book/book.route";
import { UserRoutes } from "../modules/user/user.route";

const router = express.Router();

router.use("/books", BookRoutes);
router.use("/users", UserRoutes);

export const RootRoute = router;
