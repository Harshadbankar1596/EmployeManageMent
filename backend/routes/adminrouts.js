import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { getallprojects, getallusers, verifyisadmin, addproject, getproject, addmember, getallmembersname, addtask, employee } from "../controller/admincontroller.js";

const router = express.Router();

router.post("/verifyisadmin", authMiddleware, verifyisadmin)
router.get("/getallprojects", authMiddleware, getallprojects)
router.get("/getallusers", authMiddleware, getallusers)
router.post("/addproject", authMiddleware, addproject)
router.post("/getproject", authMiddleware, getproject)
router.post("/addmember",authMiddleware , addmember)
router.get("/getallmembersname"  , getallmembersname)
router.post("/addtask" , addtask)
router.post("/employee" , employee)

export default router;