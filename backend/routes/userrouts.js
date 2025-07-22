
import { createUser, loginUser, logoutUser, verifyToken , addpunch , works , workstatus} from "../controller/usercontroller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import express from "express";
const router = express.Router();

router.post("/register", createUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

router.get("/verify", authMiddleware, verifyToken);
router.post('/addpunch' , authMiddleware , addpunch)
router.post('/works' , authMiddleware , works)
router.post('/workstatus' , authMiddleware , workstatus)


export default router;