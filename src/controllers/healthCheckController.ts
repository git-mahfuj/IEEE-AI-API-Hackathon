import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { type Request, type Response } from "express";

const healthCheckController = asyncHandler(
  async (req: Request, res: Response) => {
    
  },
);

export { healthCheckController };
