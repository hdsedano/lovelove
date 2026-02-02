
import React from 'react';
import { X, Minus, Plus, ShoppingBag, Heart, Send } from 'lucide-react';
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

  const handleCheckout = () => {
    const itemsList = items.map(i => {
      const name = lang === 'en' ? i.name_en : i.name_es;
      return `• ${i.quantity}x ${name} ($${(i.price * i.quantity).toFixed(2)})`;
    }).join('\n');
    
    const totalText = `*TOTAL: $${subtotal.toFixed(2)}*`;
    const fullMessage = `${t.whatsappMessage}\n\n${itemsList}\n\n${totalText}\n\nEs tan sencillo por siempre amor.`;
    
    // Reemplaza con tu número de teléfono real (incluyendo código de país sin el +)
    const phoneNumber = "34600000000"; 
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(fullMessage)}`;
    
    window.open(whatsappUrl, '_blank');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-[#6d1a1d]/40 backdrop-blur-sm transition-opacity animate-fade-in" 
        onClick={onClose}
      ></div>
      
      {/* Panel */}
      <div className="relative w-full max-w-md bg-[#fdfaf7] h-full shadow-2xl flex flex-col transform transition-transform duration-500 ease-out">
        <div className="p-6 border-b border-[#e5989b]/20 flex items-center justify-between bg-white">
          <h2 className="font-serif text-2xl font-black text-[#6d1a1d] flex items-center">
            <ShoppingBag className="mr-2 text-[#e5989b]" size={28} /> {t.viewCart}
          </h2>
          <button 
            onClick={onClose} 
            className="p-2 hover:bg-[#e5989b]/10 rounded-full text-[#6d1a1d] transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-50">
              <div className="w-20 h-20 bg-[#e5989b]/10 rounded-full flex items-center justify-center">
                <Heart size={40} className="text-[#e5989b]" />
              </div>
              <p className="text-[#6d1a1d] font-serif italic text-xl">{t.cartEmpty}</p>
            </div>
          ) : (
            items.map(item => (
              <div key={item.id} className="flex space-x-4 border-b border-[#e5989b]/10 pb-6 group">
                <div className="relative overflow-hidden rounded-xl w-24 h-32 flex-shrink-0 shadow-sm group-hover:shadow-md transition-shadow">
                  <img src={item.image} alt={item.name_en} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div>
                    <h3 className="font-serif text-lg text-[#6d1a1d] leading-tight font-bold">
                      {lang === 'en' ? item.name_en : item.name_es}
                    </h3>
                    <p className="text-[#e5989b] font-black mt-1 text-sm">${item.price.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center space-x-3 bg-white border border-[#e5989b]/20 px-3 py-1.5 rounded-full shadow-sm">
                      <button 
                        onClick={() => onUpdateQuantity(item.id, -1)} 
                        className="text-[#6d1a1d] hover:text-[#e5989b] transition-colors p-1"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="font-black text-sm min-w-[24px] text-center text-[#6d1a1d]">{item.quantity}</span>
                      <button 
                        onClick={() => onUpdateQuantity(item.id, 1)} 
                        className="text-[#6d1a1d] hover:text-[#e5989b] transition-colors p-1"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <button 
                      onClick={() => onRemove(item.id)} 
                      className="text-[10px] text-red-400 hover:text-red-600 uppercase tracking-widest font-black transition-colors"
                    >
                      {lang === 'en' ? 'Remove' : 'Eliminar'}
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="p-8 bg-white border-t border-[#e5989b]/20 shadow-[0_-10px_40px_rgba(0,0,0,0.03)]">
            <div className="flex justify-between items-center mb-8">
              <span className="text-lg font-serif italic text-[#6d1a1d]">{t.total}</span>
              <div className="text-right">
                <span className="text-3xl font-black text-[#6d1a1d] block">${subtotal.toFixed(2)}</span>
                <span className="text-[10px] text-[#6d1a1d]/40 uppercase tracking-widest">USD</span>
              </div>
            </div>
            
            <button 
              onClick={handleCheckout}
              className="w-full py-5 bg-[#6d1a1d] text-white rounded-2xl font-bold uppercase tracking-widest hover:bg-[#a32a2e] transition-all shadow-xl shadow-red-900/10 flex items-center justify-center space-x-3 group"
            >
              <span>{t.checkout}</span>
              <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
            
            <p className="text-center text-[10px] text-[#6d1a1d]/50 mt-5 uppercase tracking-[0.2em] leading-relaxed">
              {t.shippingInfo}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
