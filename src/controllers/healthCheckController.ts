import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { generateGeminiResponse } from "../utils/AIHelper.js";
import { type Request, type Response } from "express";

const healthCheckController = asyncHandler(
  async (req: Request, res: Response) => {
    
  },
);

export { healthCheckController };
