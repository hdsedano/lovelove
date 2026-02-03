
import React from 'react';
import { Product, Language } from '../types';
import { translations } from '../translations';
import { Heart, Search } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  lang: Language;
  onAddToCart: (p: Product) => void;
  onViewProduct: (p: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, lang, onAddToCart, onViewProduct }) => {
  const t = translations[lang];
  const getName = () => {
    if (lang === 'en') return product.name_en;
    if (lang === 'ca') return product.name_ca;
    return product.name_es;
  };

  const name = getName();

  return (
    <div 
      onClick={() => onViewProduct(product)}
      className="group relative bg-white p-4 rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col h-full border border-pink-50 cursor-pointer"
    >
      <div className="aspect-[4/5] overflow-hidden rounded-2xl mb-6 relative">
        <img 
          src={product.image} 
          alt={name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-[#6d1a1d]/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <div className="bg-white/90 backdrop-blur p-4 rounded-full text-[#6d1a1d] shadow-lg transform scale-50 group-hover:scale-100 transition-transform duration-500">
            <Search size={24} />
          </div>
        </div>
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity z-10">
          <button 
            onClick={(e) => { e.stopPropagation(); }}
            className="bg-white/80 backdrop-blur p-2 rounded-full text-[#6d1a1d] hover:bg-[#6d1a1d] hover:text-white transition-colors"
          >
            <Heart size={20} />
          </button>
        </div>
      </div>
      
      <div className="flex-1 flex flex-col text-center">
        <span className="text-[10px] uppercase tracking-widest text-[#e5989b] font-bold mb-2">{product.category}</span>
        <h3 className="font-serif text-xl text-[#6d1a1d] mb-2 px-2">{name}</h3>
        <p className="text-2xl font-black text-[#6d1a1d] mb-6">${product.price.toFixed(2)}</p>
        
        <button 
          onClick={(e) => { e.stopPropagation(); onAddToCart(product); }}
          className="mt-auto w-full py-3 bg-[#faf3ef] text-[#6d1a1d] rounded-xl font-bold uppercase tracking-widest text-xs border border-[#e5989b]/30 hover:bg-[#6d1a1d] hover:text-white hover:border-[#6d1a1d] transition-all"
        >
          {t.addToCart}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
