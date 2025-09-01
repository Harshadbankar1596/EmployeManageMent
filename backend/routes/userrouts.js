import { createUser, loginUser, logoutUser, verifyToken, addpunch, works, workstatus, taskstatus, getlogs, summary, uploadprofileimg, getimage, updateprofile, addtask , screenshot, getallmembers, changepassword } from "../controller/usercontroller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import express from "express";
const router = express.Router();

router.post("/register", createUser);

router.post("/login", loginUser);

router.post("/logout", logoutUser);

router.get("/verify", verifyToken);

router.post("/changepassword" , changepassword)

router.post('/addpunch', addpunch)

router.post('/works',authMiddleware , works)

router.post('/workstatus', authMiddleware, workstatus)

router.post('/taskstatus', authMiddleware, taskstatus)

router.post('/addtask', authMiddleware, addtask)

router.post('/getlogs', authMiddleware, getlogs)

router.post('/summary', authMiddleware, summary)

router.post('/uploadprofileimg', authMiddleware, uploadprofileimg)

router.post('/getimage', authMiddleware, getimage)

router.post('/updateprofile', authMiddleware, updateprofile)

router.post('/screenshot', authMiddleware, screenshot)

router.post("/getallmembers" , getallmembers)

export default router;