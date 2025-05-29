import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
<<<<<<< HEAD
  apiKey: import.meta.env.VITE_GEMINI_API_KEY, // Never expose this on frontend!
=======
  apiKey: "apikey";
>>>>>>> 75c854c4125dc0ddc08fdafcccfba66c321c065f
});

async function main(prompt) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: `${prompt} in 1-2 paragraphs only`,
    });

    console.log("Full Gemini Response:", response);

    // The actual content is in `response.response.candidates[0].content.parts[0].text`
    return (
        response?.candidates?.[0]?.content?.parts?.[0]?.text
        );
  } catch (error) {
    console.error("Error in AI call:", error);
    return null;
  }
}

export default main;
