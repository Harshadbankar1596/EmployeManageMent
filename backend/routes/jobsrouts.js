import express from "express"
import { deletejobs, getjobs, uploadjob } from "../controller/jobscontroller.js"
import upload from "../middleware/multer.js"
const router = express.Router()

router.post("/uploadjob" ,upload.single("resume") , uploadjob)

router.get("/getjobs"   ,  getjobs)

router.post("/deletejobs" , deletejobs)

export default router