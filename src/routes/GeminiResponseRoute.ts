import { Router } from "express";
import {type IRouter} from "express"
import { geminiResponseController } from "../controllers/GeminiResponseController.js";

const router : IRouter = Router()

router.route("/gemini").get(geminiResponseController)

export default router