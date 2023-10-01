import express from "express";
import { FinishedBookCtrl } from "./finishedBook.controller";
import auth from "../../middlewares/auth";

const router = express.Router();

router.post("/add-finished-book", FinishedBookCtrl.addFinishedBook);
router.get("/", auth(), FinishedBookCtrl.getFinishedBook);

export const FinishedRoute = router;
