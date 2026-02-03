
import React from 'react';
import { Product, Language } from '../types';
import { translations } from '../translations';
import { X, Heart, ShoppingBag } from 'lucide-react';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  onAddToCart: (p: Product) => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, isOpen, onClose, lang, onAddToCart }) => {
  if (!isOpen || !product) return null;

  const t = translations[lang];
  
  const getName = () => {
    if (lang === 'en') return product.name_en;
    if (lang === 'ca') return product.name_ca;
    return product.name_es;
  };

  const getDescription = () => {
    if (lang === 'en') return product.description_en;
    if (lang === 'ca') return product.description_ca;
    return product.description_es;
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-[#6d1a1d]/60 backdrop-blur-md animate-fade-in" 
        onClick={onClose}
      ></div>
      
      <div className="relative bg-[#fdfaf7] w-full max-w-4xl max-h-[90vh] rounded-[40px] shadow-2xl overflow-hidden flex flex-col md:flex-row transform transition-all duration-500 animate-fade-in scale-100">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-10 p-2 bg-white/80 backdrop-blur rounded-full text-[#6d1a1d] hover:bg-[#6d1a1d] hover:text-white transition-all shadow-lg"
        >
          <X size={24} />
        </button>

        {/* Imagen */}
        <div className="md:w-1/2 h-[300px] md:h-auto overflow-hidden">
          <img 
            src={product.image} 
            alt={getName()} 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Contenido */}
        <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center overflow-y-auto">
          <span className="text-xs uppercase tracking-[0.3em] text-[#e5989b] font-black mb-4 inline-block">
            {product.category}
          </span>
          
          <h2 className="font-serif text-3xl md:text-4xl font-black text-[#6d1a1d] mb-4 leading-tight">
            {getName()}
          </h2>
          
          <p className="text-3xl font-black text-[#6d1a1d] mb-8">
            ${product.price.toFixed(2)}
          </p>
          
          <div className="h-px bg-[#e5989b]/20 w-16 mb-8"></div>
          
          <p className="text-[#6d1a1d]/70 leading-relaxed mb-10 text-lg">
            {getDescription()}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-auto">
            <button 
              onClick={() => { onAddToCart(product); onClose(); }}
              className="flex-1 py-5 bg-[#6d1a1d] text-white rounded-2xl font-bold uppercase tracking-widest hover:bg-[#a32a2e] transition-all shadow-xl flex items-center justify-center space-x-3"
            >
              <ShoppingBag size={20} />
              <span>{t.addToCart}</span>
            </button>
            
            <button className="p-5 border-2 border-[#e5989b]/30 text-[#6d1a1d] rounded-2xl hover:border-[#6d1a1d] transition-all">
              <Heart size={24} />
            </button>
          </div>

          <p className="mt-8 text-[10px] text-[#6d1a1d]/40 uppercase tracking-widest text-center md:text-left">
            "Es tan sencillo por siempre amor"
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
