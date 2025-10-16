import express from "express"
import { getmessages , creategroup, GetAllGroupName } from "../controller/chatcontroller.js"
const router = express.Router()

router.post("/getmessages", getmessages)
router.post("/creategroup", creategroup)
router.get("/allgroups" , GetAllGroupName)


export default router