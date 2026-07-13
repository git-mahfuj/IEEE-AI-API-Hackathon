import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { analyzeReportWithAI } from "../utils/AIHelper.js";
import { type Request, type Response } from "express";

const geminiResponseController = asyncHandler(
  async (req: Request, res: Response) => {
   const question = req.body.question;
   
    if (!question) {
      return res
        .status(400)
        .json(new ApiError(400 , "Please Provide Questions"));
    }

    const result = await analyzeReportWithAI(question);

    return res
      .status(200)
      .json(new ApiResponse(200, result, "Gemini Response Ok"));
  }
);

export { geminiResponseController };
