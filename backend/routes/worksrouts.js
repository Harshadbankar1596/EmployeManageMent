import express from "express";
import { adddailywork , getdailywork } from "../controller/dailyworkcontroller.js";

const router = express.Router();

router.post("/addwork", adddailywork);
router.post("/getwork", getdailywork);

export default router;