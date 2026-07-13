import { GoogleGenerativeAI , SchemaType, type Schema } from "@google/generative-ai";

import dotenv from "dotenv";

dotenv.config();

const checkAvailableModels = async () => {
  const apiKey = process.env.GEMINI_API_KEY;
  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
    const data = await response.json();
    
    console.log("Available API model:");
    // @ts-ignore
    const modelNames = data.models.map(m => m.name.replace("models/", ""));
    console.log(modelNames);
  } catch (error) {
    console.error("Error fetching models:", error);
  }
};

checkAvailableModels();

const gemini_Api_Key = process.env.GEMINI_API_KEY;

const genAI = new GoogleGenerativeAI(gemini_Api_Key as string);

const reportSchema  = {
      type: SchemaType.OBJECT,
      properties: {
        category: { 
          type: SchemaType.STRING, 
          enum: ["medical", "fire", "accident", "crime", "flood", "utility", "public_service", "infrastructure", "other"]
        },
        urgency: { 
          type: SchemaType.STRING, 
          enum: ["low", "medium", "high", "critical"] 
        },
        summary: { 
          type: SchemaType.STRING, 
          description: "A short AI-generated summary in English." 
        },
        suggestedAction: { 
          type: SchemaType.STRING, 
          description: "Recommended emergency action for responders." 
        },
        confidence: { 
          type: SchemaType.NUMBER, 
          description: "Confidence score metric between 0.0 and 1.0" 
        }
      },
      required: ["category", "urgency", "summary", "suggestedAction", "confidence"],
    };

export const analyzeReportWithAI = async (description : string) => {
  try {

    const model = genAI.getGenerativeModel({
      model: "gemini-pro-latest", 
      systemInstruction: "You are an emergency response triage system. Categorize the issue accurately, determine severity, compile a brief english summary, and output a strict recommendation.",
    });

    const prompt = `Process this citizen text description and format metadata carefully: "${description}"`;
    const result = await model.generateContent({
      contents : [{
        role : "user",
        parts : [{
          text : prompt
        }]
      }],
      generationConfig : {
        responseMimeType : "application/json",
       responseSchema : reportSchema as any
      },
    
    });

    // 5. Parse and return the JSON
    const responseText = result.response.text();
    return JSON.parse(responseText);

  } catch (error) {
    console.error("AI engine compilation runtime anomaly:", error);
    throw new Error("AI classification failed. Please try again.");
  }
};

