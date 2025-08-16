import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { getallprojects, getallusers, verifyisadmin, addproject, getproject, addmember, getallmembersname, addtask, employee, getemployeedailyreport } from "../controller/admincontroller.js";

const router = express.Router();

router.post("/verifyisadmin", verifyisadmin)
router.get("/getallprojects", getallprojects)
router.get("/getallusers", getallusers)
router.post("/addproject", addproject)
router.post("/getproject", getproject)
router.post("/addmember" , addmember)
router.get("/getallmembersname"  , getallmembersname)
router.post("/addtask" , addtask)
router.post("/employee" , employee)
router.post("/employeedailyreport" , getemployeedailyreport)

export default router;