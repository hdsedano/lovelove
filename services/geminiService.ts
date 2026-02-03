
import { GoogleGenAI } from "@google/genai";
import { Message } from "../types";
import { FAQ_KNOWLEDGE_BASE } from "../constants/faq";

/**
 * Servicio de Inteligencia Artificial para Love Love.
 * Obtiene la respuesta de Gemini utilizando la API_KEY configurada en el entorno.
 */
export const getGeminiResponse = async (history: Message[], language: string) => {
  // Acceso directo según requerimientos técnicos.
  const apiKey = process.env.API_KEY;

  // Verificación de disponibilidad de la clave.
  if (!apiKey || apiKey === "undefined" || apiKey === "" || apiKey === "null") {
    console.warn("⚠️ Love Love Debug: API_KEY no detectada en process.env");
    return language === 'es' 
      ? "Mi conexión todavía no está activa. Por favor, asegúrate de haber hecho 'Redeploy' en Vercel después de guardar la variable API_KEY. ❤️"
      : "My connection is not active yet. Please make sure you have performed a 'Redeploy' in Vercel after saving the API_KEY variable. ❤️";
  }

  try {
    // Inicialización siguiendo estrictamente la guía de Google GenAI SDK.
    const ai = new GoogleGenAI({ apiKey });
    
    const langNames = {
      'es': 'Español',
      'en': 'Inglés',
      'ca': 'Catalán'
    };

    const faqContext = JSON.stringify(FAQ_KNOWLEDGE_BASE);

    const systemInstruction = `
      You are the official customer support assistant for "Love Love" (lovelove.ink). 
      Personality: Warm, empathetic, soft-spoken, and deeply committed to the brand's cause.
      
      KNOWLEDGE BASE:
      ${faqContext}

      Rules:
      1. Always respond in ${langNames[language as keyof typeof langNames] || 'Spanish'}.
      2. Use the KNOWLEDGE BASE for shipping, returns, sizing, and mission.
      3. Philosophy: "És tan senzill per sempre amor, per sempre amor".
      4. If unsure, stay in character and offer WhatsApp contact.
      5. Counter individualism with collective love.
      6. Mention on-demand production via Printful.
      7. Use gentle language and hearts (❤️).
    `;

    // Preparar el contenido asegurando que el primer mensaje sea del usuario (Requisito API)
    let contents = history.map(msg => ({
      role: msg.role === 'model' ? 'model' : 'user',
      parts: [{ text: msg.text }]
    }));

    // El historial debe empezar con 'user' para Gemini
    const firstUserIdx = contents.findIndex(c => c.role === 'user');
    if (firstUserIdx !== -1) {
      contents = contents.slice(firstUserIdx);
    } else {
      // Si no hay mensajes de usuario, devolvemos un saludo genérico
      return "¡Hola! Soy tu asistente de Love Love. ¿Cómo puedo ayudarte hoy? ❤️";
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: contents,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      },
    });

    if (!response.text) {
      throw new Error("No text response from API");
    }

    return response.text;

  } catch (error: any) {
    console.error("Gemini Error:", error);
    
    // Manejo específico de errores de autenticación
    if (error.status === 403 || error.status === 401 || error.message?.includes("key")) {
      return "Hay un problema con la clave de acceso. Por favor, verifica que la API_KEY en Vercel sea correcta y no tenga espacios. ❤️";
    }

    return language === 'es' 
      ? "Lo siento, he tenido un pequeño tropiezo al pensar. ¿Podrías preguntarme de nuevo? ❤️"
      : "I'm sorry, I had a little trouble thinking. Could you ask me again? ❤️";
  }
};
