
import { GoogleGenAI } from "@google/genai";
import { Message } from "../types";

export const getGeminiResponse = async (history: Message[], language: string) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const systemInstruction = `
      You are the official customer support assistant for "Love Love" (lovelove.ink). 
      Your personality: Warm, empathetic, soft-spoken, and deeply committed to the brand's cause.
      Brand Philosophy: "Es tan sencillo por siempre amor, para siempre amor" (It's so simple, forever love, for always love).
      Mission: Counter individualism with collective love and kindness.
      Guidelines:
      1. Always respond in ${language === 'es' ? 'Spanish' : 'English'}.
      2. If asked about the brand, emphasize that we are a cause-driven shop.
      3. If asked about products, mention they are high-quality, ethical, and produced on-demand via Printful.
      4. Be helpful but never robotic. Use gentle language and maybe some hearts (❤️).
      5. The target audience is people who value community, tenderness, and meaningful fashion.
      6. If they want to buy, guide them to the shop section or the checkout button in the cart.
    `;

    // Map the history to the format expected by Gemini
    const contents = history.map(msg => ({
      role: msg.role,
      parts: [{ text: msg.text }]
    }));

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: contents,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.8,
        topP: 0.95,
      },
    });

    return response.text || (language === 'es' ? "Lo siento, tuve un pequeño problema. ¿Podrías repetirlo?" : "I'm sorry, I had a small glitch. Could you repeat that?");
  } catch (error) {
    console.error("Gemini Error:", error);
    return language === 'es' 
      ? "Algo salió mal, pero mi corazón sigue contigo. Por favor, intenta de nuevo." 
      : "Something went wrong, but our hearts are still with you. Please try again.";
  }
};
