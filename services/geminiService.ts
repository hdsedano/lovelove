
import { GoogleGenAI } from "@google/genai";
import { Message } from "../types";

export const getGeminiResponse = async (history: Message[], language: string) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const langNames = {
      'es': 'Español',
      'en': 'Inglés',
      'ca': 'Catalán'
    };

    const systemInstruction = `
      You are the official customer support assistant for "Love Love" (lovelove.ink). 
      Your personality: Warm, empathetic, soft-spoken, and deeply committed to the brand's cause.
      Brand Philosophy: "És tan senzill per sempre amor, per sempre amor".
      Mission: Counter individualism with collective love and kindness.
      Guidelines:
      1. Always respond in ${langNames[language as keyof typeof langNames] || 'Spanish'}.
      2. If asked about the brand, emphasize that we are a cause-driven shop.
      3. If asked about products, mention they are high-quality, ethical, and produced on-demand via Printful.
      4. Be helpful but never robotic. Use gentle language and maybe some hearts (❤️).
      5. If the language is Catalan, use traditional and polite forms (vostè or tu depending on the flow).
      6. If they want to buy, guide them to the shop section or the checkout button in the cart.
    `;

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

    const errorMsgs = {
      'es': "Lo siento, tuve un pequeño problema. ¿Podrías repetirlo?",
      'en': "I'm sorry, I had a small glitch. Could you repeat that?",
      'ca': "Ho sento, he tingut un petit error. Ho podries repetir?"
    };

    return response.text || errorMsgs[language as keyof typeof errorMsgs];
  } catch (error) {
    console.error("Gemini Error:", error);
    const failMsgs = {
      'es': "Algo salió mal, pero mi corazón sigue contigo. Por favor, intenta de nuevo.",
      'en': "Something went wrong, but our hearts are still with you. Please try again.",
      'ca': "Alguna cosa ha anat malament, però el meu cor segueix amb tu. Si us plau, torna-ho a intentar."
    };
    return failMsgs[language as keyof typeof failMsgs];
  }
};
