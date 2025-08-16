import express from "express";
import { adddailywork , deletework, getdailywork } from "../controller/dailyworkcontroller.js";

const router = express.Router();

router.post("/addwork", adddailywork);
router.post("/getwork", getdailywork);
router.post("/deletework" , deletework)

export default router;