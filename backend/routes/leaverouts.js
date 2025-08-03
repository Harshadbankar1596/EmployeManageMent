import express from "express";
import { allleavs, applyleaves , getallleavs , acseptleave} from "../controller/leavecontroller.js";

const router = express.Router()

router.post("/applyleaves" , applyleaves)
router.get("/getallleaves" , getallleavs)
router.post("/allleaves" , allleavs)
router.post("/acseptleave" , acseptleave)

export default router