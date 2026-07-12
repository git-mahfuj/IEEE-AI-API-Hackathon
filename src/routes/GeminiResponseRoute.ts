import { Router } from "express";
import {type IRouter} from "express"
import { type Request , type Response  } from "express";
import { ApiResponse } from "../utils/ApiResponse.js";
import { geminiResponseController } from "../controllers/GeminiResponseController.js";

const router : IRouter = Router()

router.route("/gemini").get(geminiResponseController)

export default router