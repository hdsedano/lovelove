
import { GoogleGenAI } from "@google/genai";
import { Message } from "../types";
import { FAQ_KNOWLEDGE_BASE } from "../constants/faq";

/**
 * Servicio para interactuar con la API de Google Gemini.
 * Importante: La API_KEY se obtiene de process.env.API_KEY, que debe configurarse en Vercel.
 */
export const getGeminiResponse = async (history: Message[], language: string) => {
  // Intentamos obtener la clave. 
  // Nota para el usuario: El nombre del "proyecto" o "clave" dentro de Google AI Studio NO importa.
  // Lo único que importa es que el VALOR (la clave larga) esté en la variable API_KEY de Vercel.
  let apiKey: string | undefined;
  
  try {
    // @ts-ignore - process might not be defined in all environments without a check
    apiKey = typeof process !== 'undefined' ? process.env?.API_KEY : undefined;
  } catch (e) {
    console.error("No se pudo acceder a process.env", e);
  }

  // Si después de intentar obtenerla sigue siendo inválida
  if (!apiKey || apiKey === "undefined" || apiKey === "") {
    console.error("ERROR DE CONFIGURACIÓN: No se detecta process.env.API_KEY.");
    return language === 'es' 
      ? "Parece que la configuración en Vercel no se ha completado. Asegúrate de: 1. Crear la variable API_KEY. 2. Pegar el 'Key Value' (la clave que empieza por AIza). 3. Hacer un 'Redeploy' en Vercel. ❤️"
      : "Configuration in Vercel seems incomplete. Make sure to: 1. Create API_KEY variable. 2. Paste the 'Key Value' (the one starting with AIza). 3. Trigger a 'Redeploy' in Vercel. ❤️";
  }

  try {
    // Inicializamos la IA con la clave detectada
    const ai = new GoogleGenAI({ apiKey });
    
    const langNames = {
      'es': 'Español',
      'en': 'Inglés',
      'ca': 'Catalán'
    };

    const faqContext = JSON.stringify(FAQ_KNOWLEDGE_BASE);

    // Instrucciones del sistema para definir la personalidad de Love Love
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

    // Preparar el historial: la API requiere que empiece el usuario y alternen roles.
    let contents = history.map(msg => ({
      role: msg.role === 'model' ? 'model' : 'user',
      parts: [{ text: msg.text }]
    }));

    // Asegurar que el primer mensaje sea del usuario
    const firstUserIndex = contents.findIndex(c => c.role === 'user');
    if (firstUserIndex !== -1) {
      contents = contents.slice(firstUserIndex);
    } else {
      return "¡Hola! Soy el asistente de Love Love. ¿En qué puedo ayudarte? ❤️";
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
      throw new Error("La respuesta de la API está vacía.");
    }

    return response.text;
  } catch (error: any) {
    console.error("Error detallado de Gemini:", error);
    
    // Mensajes de error amigables según el idioma
    const errorMsgs: Record<string, string> = {
      'es': "Lo siento, mi conexión ha fallado un momento. ¿Podrías intentarlo de nuevo? El amor siempre encuentra el camino. ❤️",
      'en': "I'm sorry, my connection failed for a moment. Could you try again? Love always finds a way. ❤️",
      'ca': "Ho sento, la meva connexió ha fallat un moment. Podries tornar-ho a intentar? L'amor sempre troba el camí. ❤️"
    };

    // Si el error es específicamente de la API Key (401 o 403)
    if (error.message?.includes("API key") || error.status === 403 || error.status === 401) {
      return language === 'es' 
        ? "La clave API en Vercel no parece válida. Por favor, verifica que copiaste el 'Key Value' correctamente y no el nombre del proyecto. ❤️"
        : "The API key in Vercel doesn't seem valid. Please verify you copied the 'Key Value' correctly and not the project name. ❤️";
    }

    return errorMsgs[language] || errorMsgs.es;
  }
};
