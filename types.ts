
export type Language = 'en' | 'es';

export interface Product {
  id: string;
  name_en: string;
  name_es: string;
  price: number;
  image: string;
  description_en: string;
  description_es: string;
  category: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Message {
  role: 'user' | 'model';
  text: string;
}
