import express from "express";
import { Router } from "express";
import {type IRouter} from "express"
import { reportController } from "../controllers/reportController.js";

const router : IRouter = Router()
router.get("/test", (req, res) => {
  res.send("Report router is working!");
});
router.post("/reports" , reportController)

export default router
