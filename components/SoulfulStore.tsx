import React from 'react';
import { motion } from 'motion/react';
import { Product, Language } from '../types';
import { PRODUCTS } from '../constants';
import { translations } from '../translations';
import { Plus } from 'lucide-react';

export const SoulfulStore: React.FC<{ onAddToCart: (p: Product) => void, lang: Language }> = ({ onAddToCart, lang }) => {
  const t = translations[lang];
  return (
    <section className="py-32 px-6 bg-brand-offwhite" id="collection">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="space-y-4">
            <span className="font-serif-italic text-sm uppercase tracking-[0.3em] text-brand-red/40 font-semibold italic">
              {lang === 'en' ? 'Love Love Collection' : 'Colección Love Love'}
            </span>
            <h2 className="font-display text-5xl md:text-6xl text-brand-red leading-[0.9]">
              {t.soulfulTitle} <br /><span className="font-serif-italic font-light">{t.soulfulSubtitle}</span>
            </h2>
          </div>
          <p className="max-w-xs font-sans text-brand-red/60 text-sm leading-relaxed font-light italic">
            {t.soulfulDesc}
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-20 gap-x-12">
          {PRODUCTS.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[3/4] mb-8 overflow-hidden bg-brand-cream border border-brand-sand/20 rounded-sm">
                <img
                  src={product.image}
                  alt={lang === 'en' ? product.name_en : product.name_es}
                  className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[1.5s] ease-out opacity-90 group-hover:opacity-100"
                />
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddToCart(product);
                  }}
                  className="absolute bottom-6 right-6 w-12 h-12 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-brand-red shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                >
                  <Plus size={20} />
                </motion.button>
              </div>
              
              <div className="space-y-1">
                <h3 className="font-display text-xl text-brand-red">{lang === 'en' ? product.name_en : product.name_es}</h3>
                <div className="flex justify-between items-center text-brand-red/60 font-serif-italic text-sm italic">
                  <span>{product.category}</span>
                  <span>{product.price}€</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
