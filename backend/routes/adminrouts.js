import express from "express";

import { getallprojects , getallusers } from "../controller/admincontroller.js";

const router = express.Router();

router.get("/getallprojects", getallprojects)
router.get("/getallusers", getallusers)

export default router;