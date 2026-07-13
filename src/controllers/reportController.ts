import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { type Request, type Response } from "express";
import { analyzeReportWithAI } from "../utils/AIHelper.js";

const reportController = asyncHandler(async (req: Request, res: Response) => {
  const { name, contact, location, description, language } = req.body;
  
  if (
    !description ||
    !location ||
    description.trim() === "" ||
    location.trim() === ""
  ) {
    return res
      .status(400)
      .json(new ApiError(400, "Description and location are required."));
  }
  const reportLanguage =
    language && ["bn", "en", "unknown"].includes(language)
      ? language
      : "unknown";

  let aiAnalysis;
  try {
    aiAnalysis = await analyzeReportWithAI(description);
  } catch (error: any) {
    return res.status(502).json(new ApiError(502, error.message));
  }
  const newReport = {
    id: `report_${Date.now()}`,
    name: name || "Anoynymous",
    contact: contact || "N/A",
    location: location,
    description: description,
    language : reportLanguage,
    category: aiAnalysis.category,
    urgency: aiAnalysis.urgency,
    summary: aiAnalysis.summary,
    suggestedAction: aiAnalysis.suggestedAction,
    confidence: aiAnalysis.confidence,
    status: "pending",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        newReport,
        "Report processed and ingested successfully.",
      ),
    );
});

export {reportController}
