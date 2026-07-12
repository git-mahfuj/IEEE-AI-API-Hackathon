import { GoogleGenerativeAI } from "@google/generative-ai";

import dotenv from "dotenv";

dotenv.config();

const checkAvailableModels = async () => {
  const apiKey = process.env.GEMINI_API_KEY;
  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
    const data = await response.json();
    
    console.log("আপনার API Key-এর জন্য অ্যাভেইলেবল মডেলগুলো হলো:");
    // @ts-ignore
    const modelNames = data.models.map(m => m.name.replace("models/", ""));
    console.log(modelNames);
  } catch (error) {
    console.error("Error fetching models:", error);
  }
};

checkAvailableModels();

const gemini_Api_Key = process.env.GEMINI_API_KEY;

const googleAi = new GoogleGenerativeAI(gemini_Api_Key as string);
const model = googleAi.getGenerativeModel({ model: "gemini-flash-latest" });

export const generateGeminiResponse = async (prompt : string) => {
  try {
    const result = await model.generateContent(prompt);
    console.log(result);
    return result.response
  } catch (error) {
    console.error(error);
  }
};

// export const analyzeReportWithAI = async(description) => {
//     try {

//         const

//     } catch (error) {
//        console.error("AI engine compilation runtime anomaly:", error)
//        throw new Error("AI classification failed. Please try again.")
//     }
// }
