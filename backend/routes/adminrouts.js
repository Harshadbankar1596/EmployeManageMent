import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { getallprojects, getallusers, verifyisadmin, addproject, getproject } from "../controller/admincontroller.js";

const router = express.Router();

router.post("/verifyisadmin", authMiddleware, verifyisadmin)
router.get("/getallprojects", authMiddleware, getallprojects)
router.get("/getallusers", authMiddleware, getallusers)
router.post("/addproject", authMiddleware, addproject)
router.post("/getproject", authMiddleware, getproject)

export default router;