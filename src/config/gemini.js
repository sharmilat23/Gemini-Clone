import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY, // Correct key name
});

async function main(prompt) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: `${prompt} in 1-2 paragraphs only`,
    });

    console.log("Full Gemini Response:", response);

    return response?.candidates?.[0]?.content?.parts?.[0]?.text;
  } catch (error) {
    console.error("Error in AI call:", error);
    return null;
  }
}

export default main;
