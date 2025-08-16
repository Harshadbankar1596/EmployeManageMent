import express from "express"
import {getallemployees, getemployeedetail, superadminveryfy} from "../controller/superadmincontroller.js"

const router = express.Router()

router.get("/getallemployees" , getallemployees)

router.post("/getemployeedetail" , getemployeedetail)

router.get("/superadminveryfy" , superadminveryfy)

export default router