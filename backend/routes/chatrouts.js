import express from "express"
import { getmessages , creategroup } from "../controller/chatcontroller.js"
const router = express.Router()

router.post("/getmessages", getmessages)
router.post("/creategroup", creategroup)

export default router