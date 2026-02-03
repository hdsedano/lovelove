
import { GoogleGenAI } from "@google/genai";
import { Message } from "../types";
import { FAQ_KNOWLEDGE_BASE } from "../constants/faq";

export const getGeminiResponse = async (history: Message[], language: string) => {
  try {
    // Inicialización directa según la guía oficial
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const langNames = {
      'es': 'Español',
      'en': 'Inglés',
      'ca': 'Catalán'
    };

    const systemInstruction = `
      Eres el asistente de "Love Love" (lovelove.ink). 
      Tu tono es extremadamente dulce, calmado y poético.
      
      CONOCIMIENTO:
      ${JSON.stringify(FAQ_KNOWLEDGE_BASE)}

      REGLAS:
      1. Idioma: ${langNames[language as keyof typeof langNames] || 'Español'}.
      2. Filosofía: "És tan senzill per sempre amor". El amor colectivo sobre el yo.
      3. Producción: Ética y bajo demanda con Printful.
      4. Si el usuario quiere comprar, recuérdale que el pago es por WhatsApp.
      5. Usa muchos corazones (❤️) y lenguaje tierno.
    `;

    // Formatear historial para Gemini 3
    const contents = history.map(m => ({
      role: m.role === 'model' ? 'model' as const : 'user' as const,
      parts: [{ text: m.text }]
    }));

    // Asegurar que el primer mensaje es del usuario
    const finalContents = contents[0].role === 'model' ? contents.slice(1) : contents;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: finalContents,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.8,
      },
    });

    return response.text || "He sentido tu mensaje, pero mis palabras se han quedado en el corazón. ¿Me lo repites? ❤️";

  } catch (error: any) {
    console.error("Gemini Service Error:", error);
    // Lanza el error para que el componente lo maneje
    throw error;
  }
};
