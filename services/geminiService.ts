import { GoogleGenAI, Type } from "@google/genai";
import type { FaceBounds } from '../types';

// Fix: Removed the conditional check and fallback for API_KEY to adhere to the coding guidelines,
// which mandate that the API key be sourced exclusively from `process.env.API_KEY`.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const detectFace = async (base64ImageData: string, mimeType: string): Promise<FaceBounds | null> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: {
        parts: [
          { inlineData: { data: base64ImageData, mimeType: mimeType } },
          { text: "Analyze the image and identify the primary human face. Provide a bounding box that generously encompasses the entire face, including the forehead, cheeks, chin, jawline, and ears. The bounding box should be slightly padded to ensure the entire facial region is covered. If no face is found, do not return anything." },
        ],
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            face: {
              type: Type.OBJECT,
              nullable: true,
              description: "The bounding box of the detected face.",
              properties: {
                x: { type: Type.NUMBER, description: "The top-left x-coordinate." },
                y: { type: Type.NUMBER, description: "The top-left y-coordinate." },
                width: { type: Type.NUMBER, description: "The width of the bounding box." },
                height: { type: Type.NUMBER, description: "The height of the bounding box." },
              }
            }
          }
        }
      }
    });
    
    const jsonStr = response.text.trim();
    if (!jsonStr) {
      return null;
    }

    const result = JSON.parse(jsonStr);
    
    if (result.face && typeof result.face.x === 'number') {
        return result.face as FaceBounds;
    }

    return null;

  } catch (error) {
    console.error("Error detecting face with Gemini:", error);
    return null; // Assume no face on error
  }
};