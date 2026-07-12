import { Router } from "express";
import {type IRouter} from "express"
import { type Request , type Response  } from "express";
import { ApiResponse } from "../utils/ApiResponse.js";
import { healthCheckController } from "../controllers/healthCheckController.js";

const router  : IRouter = Router();

router.route("/health").get(healthCheckController)

export default router