import express from "express";
import { PlanToReadCtrl } from "./planToRead.controller";
import auth from "../../middlewares/auth";

const router = express.Router();

router.post("/add-planToRead", PlanToReadCtrl.addPlanToRead);
router.get("/", auth(), PlanToReadCtrl.getPlanToRead);

export const PlanToReadRoute = router;
