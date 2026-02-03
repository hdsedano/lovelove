
import { GoogleGenAI } from "@google/genai";
import { Message } from "../types";
import { FAQ_KNOWLEDGE_BASE } from "../constants/faq";

export const getGeminiResponse = async (history: Message[], language: string) => {
  const apiKey = process.env.API_KEY;

  if (!apiKey || apiKey === "undefined" || apiKey === "") {
    console.error("CONFIGURACIÓN NECESARIA: Falta la API_KEY. Consíguela gratis en https://aistudio.google.com/app/apikey");
    return language === 'es' 
      ? "Todavía estoy terminando de conectar mi corazón. Por favor, asegúrate de añadir la API_KEY en los ajustes de Vercel y hacer un 'Redeploy'. ❤️"
      : "I'm still connecting my heart. Please make sure to add the API_KEY in Vercel settings and trigger a 'Redeploy'. ❤️";
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    
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
      3. Brand Philosophy: "És tan senzill per sempre amor, per sempre amor".
      4. If asked something NOT in the knowledge base, maintain the "Love Love" persona but offer to connect them with a human via WhatsApp.
      5. Counter individualism with collective love and kindness.
      6. Mention that products are high-quality and produced on-demand via Printful.
      7. Be helpful but never robotic. Use gentle language and some hearts (❤️).
    `;

    // Ensure the conversation history starts with 'user' and alternates roles correctly.
    let contents = history.map(msg => ({
      role: msg.role === 'model' ? 'model' : 'user',
      parts: [{ text: msg.text }]
    }));

    const firstUserIndex = contents.findIndex(c => c.role === 'user');
    if (firstUserIndex !== -1) {
      contents = contents.slice(firstUserIndex);
    } else {
      return "¡Hola! ¿En qué puedo ayudarte hoy? ❤️";
    }

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: contents,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
        topP: 0.95,
      },
    });

    if (!response.text) {
      throw new Error("Empty response from Gemini API");
    }

    return response.text;
  } catch (error: any) {
    console.error("Detailed Gemini API Error:", error);
    
    const failMsgs = {
      'es': `Algo salió mal (Error: ${error.message || 'desconocido'}). Por favor, intenta de nuevo.`,
      'en': `Something went wrong (Error: ${error.message || 'unknown'}). Please try again.`,
      'ca': `Alguna cosa ha anat malament (Error: ${error.message || 'desconegut'}). Torna-ho a intentar.`
    };
    return failMsgs[language as keyof typeof failMsgs] || failMsgs.es;
  }
};
