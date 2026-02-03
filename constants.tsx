
import { Product } from './types';

// CAMBIA ESTE NÚMERO: Incluye el código de país sin el símbolo + (ejemplo: 34 para España, 52 para México)
export const WHATSAPP_NUMBER = "34649072362"; 

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name_en: "The 'Forever Love' Organic Tee",
    name_es: "Camiseta Orgánica 'Amor para Siempre'",
    name_ca: "Samarreta Orgànica 'Amor per Sempre'",
    price: 34.00,
    image: "https://picsum.photos/id/1027/800/1000",
    description_en: "Soft, breathable, and ethical. Made for long-lasting comfort.",
    description_es: "Suave, transpirable y ética. Hecha para un confort duradero.",
    description_ca: "Suau, transpirable i ètica. Feta per a un confort durador.",
    category: "Clothing"
  },
  {
    id: '2',
    name_en: "Connection Tote Bag",
    name_es: "Bolso de Tela 'Conexión'",
    name_ca: "Boss de Tela 'Connexió'",
    price: 22.00,
    image: "https://picsum.photos/id/1010/800/1000",
    description_en: "Carry your love everywhere. Heavy-duty organic canvas.",
    description_es: "Lleva tu amor a todas partes. Lona orgánica de alta resistencia.",
    description_ca: "Porta el teu amor a tot arreu. Lona orgànica de gran resistència.",
    category: "Accessories"
  },
  {
    id: '3',
    name_en: "Embroidered Heart Hoodie",
    name_es: "Sudadera Corazón Bordado",
    name_ca: "Sudadera Cor Bordat",
    price: 58.00,
    image: "https://picsum.photos/id/1062/800/1000",
    description_en: "A warm hug in fabric. Featuring our signature embroidered heart.",
    description_es: "Un abrazo cálido en tela. Con nuestro corazón bordado distintivo.",
    description_ca: "Una abraçada càlida en roba. Amb el nostre cor bordat distintiu.",
    category: "Clothing"
  },
  {
    id: '4',
    name_en: "Solidarity Mug",
    name_es: "Taza Solidaridad",
    name_ca: "Tassa Solidaritat",
    price: 18.00,
    image: "https://picsum.photos/id/429/800/1000",
    description_en: "Morning coffee tastes better with a purpose.",
    description_es: "El café de la mañana sabe mejor con un propósito.",
    description_ca: "El cafè del matí té millor gust amb un propòsit.",
    category: "Home"
  }
];

export const BRAND_LOGO_URL = '/input_file_0.png';
