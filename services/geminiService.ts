
import { GoogleGenAI } from "@google/genai";
import { Message } from "../types";
import { FAQ_KNOWLEDGE_BASE } from "../constants/faq";

/**
 * Servicio de Inteligencia Artificial para Love Love.
 * La API_KEY se inyecta desde el entorno de Vercel.
 */
export const getGeminiResponse = async (history: Message[], language: string) => {
  // Intentamos obtener la clave de la forma más directa posible
  const apiKey = process.env.API_KEY;

  if (!apiKey || apiKey === "undefined" || apiKey === "null") {
    console.warn("Love Love: API_KEY no encontrada. Verifica la configuración en Vercel.");
    return language === 'es' 
      ? "Mi conexión con el servidor de amor todavía no está activa. Por favor, realiza un 'Redeploy' en Vercel para activar mi corazón. ❤️"
      : "My connection to the love server is not active yet. Please perform a 'Redeploy' in Vercel to activate my heart. ❤️";
  }

  try {
    // Inicialización del cliente de IA
    const ai = new GoogleGenAI({ apiKey });
    
    const langNames = {
      'es': 'Español',
      'en': 'Inglés',
      'ca': 'Catalán'
    };

    const systemInstruction = `
      You are the official customer support assistant for "Love Love" (lovelove.ink). 
      Personality: Warm, empathetic, soft-spoken, and deeply committed to the brand's cause.
      
      KNOWLEDGE BASE:
      ${JSON.stringify(FAQ_KNOWLEDGE_BASE)}

      Rules:
      1. Always respond in ${langNames[language as keyof typeof langNames] || 'Español'}.
      2. Use the KNOWLEDGE BASE for shipping, returns, sizing, and mission.
      3. Philosophy: "És tan senzill per sempre amor, per sempre amor".
      4. If unsure, stay in character and offer WhatsApp contact.
      5. Counter individualism with collective love.
      6. Mention on-demand production via Printful.
      7. Always use gentle language and hearts (❤️).
    `;

    // Preparamos los mensajes asegurando el formato correcto (user -> model -> user)
    const contents = history
      .filter(m => m.text && m.text.trim() !== "")
      .map(m => ({
        role: m.role === 'model' ? 'model' as const : 'user' as const,
        parts: [{ text: m.text }]
      }));

    // Gemini requiere que el primer mensaje sea del 'user'
    if (contents.length > 0 && contents[0].role === 'model') {
      contents.shift();
    }

    if (contents.length === 0) {
      return "¡Hola! ¿En qué puedo ayudarte hoy con Love Love? ❤️";
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: contents,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
        topP: 0.95,
      },
    });

    return response.text || "He sentido tu mensaje, pero no he podido encontrar las palabras. ¿Puedes repetirlo? ❤️";

  } catch (error: any) {
    console.error("Error en el servicio Gemini:", error);
    
    // Errores comunes de clave
    if (error.status === 403 || error.status === 401 || error.message?.includes("key")) {
      return "La clave de acceso no parece válida. Por favor, verifica que copiaste el 'Key Value' correctamente en Vercel. ❤️";
    }

    return language === 'es' 
      ? "Lo siento mucho, mi conexión ha tenido un pequeño tropiezo. ¿Podrías intentarlo de nuevo? ❤️"
      : "I'm so sorry, my connection had a little stumble. Could you try again? ❤️";
  }
};
