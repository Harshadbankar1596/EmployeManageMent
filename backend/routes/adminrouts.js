import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { getallprojects , getallusers , verifyisadmin} from "../controller/admincontroller.js";

const router = express.Router();

router.post("/verifyisadmin" , authMiddleware , verifyisadmin)
router.get("/getallprojects", authMiddleware , getallprojects)
router.get("/getallusers",authMiddleware , getallusers)

export default router;