
import { GoogleGenAI } from "@google/genai";
import { Message } from "../types";
import { FAQ_KNOWLEDGE_BASE } from "../constants/faq";

export const getGeminiResponse = async (history: Message[], language: string) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const langNames = {
      'es': 'Español',
      'en': 'Inglés',
      'ca': 'Catalán'
    };

    const faqContext = JSON.stringify(FAQ_KNOWLEDGE_BASE);

    const systemInstruction = `
      You are the official customer support assistant for "Love Love" (lovelove.ink). 
      Your personality: Warm, empathetic, soft-spoken, and deeply committed to the brand's cause.
      
      KNOWLEDGE BASE (FAQ):
      ${faqContext}

      Guidelines:
      1. Always respond in ${langNames[language as keyof typeof langNames] || 'Spanish'}.
      2. Use the KNOWLEDGE BASE to answer questions about shipping, returns, sizing, and mission.
      3. If asked something NOT in the knowledge base, maintain the "Love Love" persona but offer to connect them with a human via the WhatsApp button.
      4. Brand Philosophy: "És tan senzill per sempre amor, per sempre amor".
      5. Counter individualism with collective love and kindness.
      6. Mention that products are high-quality, ethical, and produced on-demand via Printful.
      7. Be helpful but never robotic. Use gentle language and some hearts (❤️).
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
        temperature: 0.7,
        topP: 0.95,
      },
    });

    const errorMsgs = {
      'es': "Lo siento, mi conexión con el corazón de la tienda falló un momento. ¿Podrías repetirlo?",
      'en': "I'm sorry, my connection with the heart of the shop flickered for a second. Could you repeat that?",
      'ca': "Ho sento, la meva connexió amb el cor de la botiga ha fallat un moment. Ho podries repetir?"
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
