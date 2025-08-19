import express from "express"
import { getjobs, uploadjob } from "../controller/jobscontroller.js"

const router = express.Router()

router.post("/uploadjob" , uploadjob)
router.get("/getjobs" , getjobs)

export default router