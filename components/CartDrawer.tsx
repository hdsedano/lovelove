
import React from 'react';
import { X, Minus, Plus, ShoppingBag, Heart } from 'lucide-react';
import { Language, CartItem } from '../types';
import { translations } from '../translations';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, lang, items, onUpdateQuantity, onRemove }) => {
  const t = translations[lang];
  const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Overlay */}
      <div className="absolute inset-0 bg-[#6d1a1d]/40 backdrop-blur-sm" onClick={onClose}></div>
      
      {/* Panel */}
      <div className="relative w-full max-w-md bg-[#fdfaf7] h-full shadow-2xl flex flex-col animate-slide-left">
        <div className="p-6 border-b border-[#e5989b]/20 flex items-center justify-between">
          <h2 className="font-serif text-2xl font-black text-[#6d1a1d] flex items-center">
            <ShoppingBag className="mr-2" /> {t.viewCart}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-[#e5989b]/10 rounded-full text-[#6d1a1d]">
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-50">
              <Heart size={64} className="text-[#e5989b]" />
              <p className="text-[#6d1a1d] font-serif italic text-xl">{t.cartEmpty}</p>
            </div>
          ) : (
            items.map(item => (
              <div key={item.id} className="flex space-x-4 border-b border-[#e5989b]/10 pb-6">
                <img src={item.image} alt={item.name_en} className="w-24 h-32 object-cover rounded-xl shadow-sm" />
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-lg text-[#6d1a1d] leading-tight">
                      {lang === 'en' ? item.name_en : item.name_es}
                    </h3>
                    <p className="text-[#e5989b] font-black mt-1">${item.price.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 bg-white border border-pink-50 px-3 py-1 rounded-lg">
                      <button onClick={() => onUpdateQuantity(item.id, -1)} className="text-[#6d1a1d] hover:text-[#e5989b]"><Minus size={16} /></button>
                      <span className="font-bold text-sm min-w-[20px] text-center">{item.quantity}</span>
                      <button onClick={() => onUpdateQuantity(item.id, 1)} className="text-[#6d1a1d] hover:text-[#e5989b]"><Plus size={16} /></button>
                    </div>
                    <button onClick={() => onRemove(item.id)} className="text-xs text-red-500 uppercase tracking-widest font-bold">Remove</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="p-6 bg-white border-t border-[#e5989b]/20">
            <div className="flex justify-between items-center mb-6">
              <span className="text-lg font-serif italic text-[#6d1a1d]">{t.total}</span>
              <span className="text-3xl font-black text-[#6d1a1d]">${subtotal.toFixed(2)}</span>
            </div>
            <button className="w-full py-5 bg-[#6d1a1d] text-white rounded-2xl font-bold uppercase tracking-widest hover:bg-[#a32a2e] transition-all shadow-xl shadow-red-900/10">
              {t.checkout}
            </button>
            <p className="text-center text-[10px] text-[#6d1a1d]/50 mt-4 uppercase tracking-[0.2em]">
              {t.shippingInfo}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
