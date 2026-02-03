
export type Language = 'en' | 'es' | 'ca';

export interface Product {
  id: string;
  name_en: string;
  name_es: string;
  name_ca: string;
  price: number;
  image: string;
  description_en: string;
  description_es: string;
  description_ca: string;
  category: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Message {
  role: 'user' | 'model';
  text: string;
}
