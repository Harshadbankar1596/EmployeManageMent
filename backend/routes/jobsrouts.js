import express from "express"
import { deletejobs, getjobs, uploadjob } from "../controller/jobscontroller.js"

const router = express.Router()

router.post("/uploadjob" , uploadjob)
router.get("/getjobs" , getjobs)
router.post("/deletejobs" , deletejobs)

export default router