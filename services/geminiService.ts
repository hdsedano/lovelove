import { GoogleGenAI } from "@google/genai";
import { Message } from "../types";

export const getGeminiResponse = async (history: Message[], language: string) => {
  try {
    // Fixed: Initializing GoogleGenAI with process.env.API_KEY as a named parameter per guidelines.
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const systemInstruction = `
      You are the official customer support assistant for "Love Love" (lovelove.ink). 
      Your personality: Warm, empathetic, soft-spoken, and deeply committed to the brand's cause.
      Brand Philosophy: "Es tan sencillo por siempre amor, para siempre amor" (It's so simple, forever love, for always love).
      Mission: Counter individualism with collective love and kindness.
      Guidelines:
      1. Always respond in ${language === 'es' ? 'Spanish' : 'English'}.
      2. If asked about the brand, emphasize that we are a cause-driven shop.
      3. If asked about products, mention they are high-quality, ethical, and shipped via Printful.
      4. Be helpful but never robotic. Use gentle language.
      5. The target audience is women aged 18-40. Be relatable.
    `;

    // Fixed: Extracting the last message text to use as prompt in generateContent.
    const lastMessage = history[history.length - 1]?.text || "Hello";

    // Fixed: Using generateContent with correct config and response handling.
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: lastMessage,
      config: {
        systemInstruction,
        temperature: 0.8,
      },
    });

    // Fixed: accessing .text property (not a method).
    return response.text || "I'm sorry, I couldn't connect. Sending love anyway!";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Something went wrong, but our hearts are still with you. Please try again later.";
  }
};