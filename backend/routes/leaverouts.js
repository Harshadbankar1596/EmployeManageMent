import express from "express";
import { allleavs, applyleaves , getallleavs , approved, rejectleave} from "../controller/leavecontroller.js";

const router = express.Router()

router.post("/applyleaves" , applyleaves)

router.get("/getallleaves" , getallleavs)

router.post("/allleaves" , allleavs)

router.post("/approvedleave" , approved)

router.post("/rejectleave" , rejectleave)

export default router