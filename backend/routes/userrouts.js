import { createUser, loginUser, logoutUser, verifyToken, addpunch, works, workstatus, taskstatus, getlogs, summary, uploadprofileimg, getimage, updateprofile, addtask , screenshot } from "../controller/usercontroller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import express from "express";
const router = express.Router();

router.post("/register", createUser);

router.post("/login", loginUser);

router.post("/logout", logoutUser);

router.get("/verify", authMiddleware, verifyToken);

router.post('/addpunch', authMiddleware, addpunch)

router.post('/works', authMiddleware, works)

router.post('/workstatus', authMiddleware, workstatus)

router.post('/taskstatus', authMiddleware, taskstatus)

router.post('/addtask', authMiddleware, addtask)

router.post('/getlogs', authMiddleware, getlogs)

router.post('/summary', authMiddleware, summary)

router.post('/uploadprofileimg', authMiddleware, uploadprofileimg)

router.post('/getimage', authMiddleware, getimage)

router.post('/updateprofile', authMiddleware, updateprofile)

router.post('/screenshot', authMiddleware, screenshot)

export default router;