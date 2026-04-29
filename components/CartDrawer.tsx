import React from 'react';
import { motion } from 'motion/react';
import { X, Minus, Plus, Heart, Send } from 'lucide-react';
import { Language, CartItem } from '../types';
import { WHATSAPP_NUMBER } from '../constants';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, lang, items, onUpdateQuantity, onRemove }) => {
  const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const handleCheckout = () => {
    const itemsList = items.map(i => {
      const name = lang === 'en' ? i.name_en : i.name_es;
      return `• ${i.quantity}x ${name} (${(i.price * i.quantity).toFixed(2)}€)`;
    }).join('\n');
    
    const totalText = `*TOTAL: ${subtotal.toFixed(2)}€*`;
    const fullMessage = `Hola Love Love, he sentido estos objetos:\n\n${itemsList}\n\n${totalText}\n\nEs tan sencillo por siempre amor.`;
    
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(fullMessage)}`;
    
    window.open(whatsappUrl, '_blank');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end overflow-hidden">
      {/* Overlay */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-brand-red/10 backdrop-blur-sm" 
        onClick={onClose}
      />
      
      {/* Panel */}
      <motion.div 
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="relative w-full max-w-md bg-brand-offwhite h-full shadow-2xl flex flex-col border-l border-brand-sand/20"
      >
        <div className="p-8 border-b border-brand-sand/20 flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="font-display text-2xl text-brand-red">Mi Selección</h2>
            <p className="font-serif-italic text-brand-red/40 text-xs italic tracking-widest uppercase">Love Love</p>
          </div>
          <button 
            onClick={onClose} 
            className="p-2 hover:bg-brand-red/5 rounded-full text-brand-red transition-all"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 space-y-10">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-6 opacity-30">
              <Heart size={32} className="text-brand-rose" />
              <p className="text-brand-red font-serif-italic italic text-lg">Aún está vacío, como un lienzo por llenar.</p>
            </div>
          ) : (
            items.map(item => (
              <div key={item.id} className="flex gap-6 group">
                <div className="relative overflow-hidden rounded-sm w-20 h-24 flex-shrink-0 bg-brand-cream border border-brand-sand/10">
                  <img src={item.image} alt={item.name_es} className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700" />
                </div>
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div className="space-y-1">
                    <h3 className="font-display text-lg text-brand-red leading-tight">
                      {lang === 'en' ? item.name_en : item.name_es}
                    </h3>
                    <p className="text-brand-red/40 font-serif-italic italic text-xs uppercase tracking-wider">{item.price}€</p>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-4 bg-white/50 border border-brand-sand/20 px-3 py-1 rounded-full text-brand-red text-xs">
                      <button onClick={() => onUpdateQuantity(item.id, -1)} className="hover:text-brand-rose transition-colors"><Minus size={12} /></button>
                      <span className="font-medium min-w-[20px] text-center">{item.quantity}</span>
                      <button onClick={() => onUpdateQuantity(item.id, 1)} className="hover:text-brand-rose transition-colors"><Plus size={12} /></button>
                    </div>
                    <button 
                      onClick={() => onRemove(item.id)} 
                      className="text-[9px] text-brand-red/30 hover:text-brand-red uppercase tracking-widest font-bold transition-colors"
                    >
                      Quitar
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="p-8 bg-brand-cream border-t border-brand-sand/20">
            <div className="flex justify-between items-end mb-8">
              <div className="space-y-1">
                <span className="text-xs uppercase tracking-[0.2em] font-bold text-brand-red/30">Subtotal</span>
                <p className="font-serif-italic text-sm text-brand-red/60 italic">Envío calculado al finalizar</p>
              </div>
              <span className="text-3xl font-display text-brand-red">{subtotal.toFixed(2)}€</span>
            </div>
            
            <button 
              onClick={handleCheckout}
              className="w-full py-5 bg-brand-red text-white rounded-full font-medium tracking-wide hover:shadow-xl hover:shadow-brand-red/10 transition-all duration-500 flex items-center justify-center gap-3 group"
            >
              <span>Continuar</span>
              <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
            <p className="text-center text-[10px] text-brand-red/30 mt-6 uppercase tracking-[0.2em] leading-relaxed italic">
              Conexión humana en cada envío.
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default CartDrawer;
