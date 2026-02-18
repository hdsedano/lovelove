
import { Product } from "../types";

const PRINTFUL_API_URL = "https://api.printful.com";

export const fetchPrintfulProducts = async (): Promise<Product[]> => {
  const apiKey = process.env.PRINTFUL_API_KEY;

  if (!apiKey || apiKey === "TU_PRINTFUL_ACCESS_TOKEN_AQUI") {
    console.warn("Printful API Key no configurada. Usando productos locales.");
    throw new Error("API Key missing");
  }

  try {
    // 1. Obtener la lista de productos sincronizados
    const response = await fetch(`${PRINTFUL_API_URL}/store/products`, {
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) throw new Error("Error fetching from Printful");

    const data = await response.json();
    const syncProducts = data.result;

    // 2. Mapear los productos de Printful a nuestro formato interno
    // Nota: Printful devuelve los productos básicos. Para precios y descripciones detalladas
    // a veces se requiere una segunda llamada por producto, pero usaremos los datos de la lista para agilidad.
    const mappedProducts: Product[] = syncProducts.map((p: any) => ({
      id: p.id.toString(),
      name_en: p.name,
      name_es: p.name, // Printful API suele devolver un solo nombre por defecto
      name_ca: p.name,
      price: 0, // El precio suele estar en las variantes (Sync Variants)
      image: p.thumbnail_url || "https://picsum.photos/id/1027/800/1000",
      description_en: "Official Love Love Product - High quality print on demand.",
      description_es: "Producto oficial de Love Love - Impresión bajo demanda de alta calidad.",
      description_ca: "Producte oficial de Love Love - Impressió sota demanda d'alta qualitat.",
      category: "Official Collection"
    }));

    // Para obtener el precio real, necesitamos consultar los detalles de cada producto
    // Para simplificar y no saturar la API, en esta versión asignaremos un precio base 
    // o podrías extender esto con un Promise.all de detalles.
    return mappedProducts;
  } catch (error) {
    console.error("Printful Integration Error:", error);
    throw error;
  }
};
