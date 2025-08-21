import express from "express"
import {getallemployees, getemployeedetail, setadmin, superadminveryfy, veryfyissuperadmin} from "../controller/superadmincontroller.js"
import { authMiddleware } from "../middleware/auth.middleware.js"

const router = express.Router()

router.post("/veryfyissuperadmin" , authMiddleware , veryfyissuperadmin)

router.get("/getallemployees" ,authMiddleware , getallemployees)

router.post("/getemployeedetail" ,authMiddleware , getemployeedetail)

router.get("/superadminveryfy" ,authMiddleware , superadminveryfy)

router.post("/setadmin" , authMiddleware , setadmin)

export default router