
import { Product } from "../types";

const PRINTFUL_API_URL = "https://api.printful.com";

export const fetchPrintfulProducts = async (): Promise<Product[]> => {
  // En Vercel, estas variables se inyectan en el entorno de ejecución
  const apiKey = process.env.PRINTFUL_API_KEY;

  if (!apiKey || apiKey === "1Rx7RkgzvU1wDpkMSIhcAMXegLQftPtLZAk1r75m" || apiKey === "") {
    console.warn("Printful API Key no detectada. Asegúrate de configurarla en el panel de Vercel.");
    throw new Error("API Key missing");
  }

  try {
    const response = await fetch(`${PRINTFUL_API_URL}/store/products`, {
      method: 'GET',
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) {
      if (response.status === 401) console.error("Error de Printful: Token inválido.");
      throw new Error(`Printful API error: ${response.status}`);
    }

    const data = await response.json();
    const syncProducts = data.result || [];

    if (syncProducts.length === 0) {
      console.info("La tienda de Printful está conectada pero no tiene productos sincronizados.");
      return [];
    }

    // Mapeamos los productos con datos de fallback por si faltan campos
    return syncProducts.map((p: any) => ({
      id: p.id.toString(),
      name_en: p.name || "Love Love Product",
      name_es: p.name || "Producto Love Love",
      name_ca: p.name || "Producte Love Love",
      price: 25.00, // Precio base (Printful requiere llamada extra para variantes)
      image: p.thumbnail_url || "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800",
      description_en: "Official Love Love piece. Ethical production focused on community care.",
      description_es: "Pieza oficial de Love Love. Producción ética enfocada en el cuidado comunitario.",
      description_ca: "Peça oficial de Love Love. Producció ètica enfocada en la cura comunitària.",
      category: "Official Collection"
    }));
  } catch (error) {
    console.error("No se pudo sincronizar con Printful:", error);
    throw error;
  }
};
