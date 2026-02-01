
import React from 'react';
import { Language } from '../types';
import { translations } from '../translations';
import { HeartHandshake, Earth, Leaf, Sparkles } from 'lucide-react';

const MissionSection: React.FC<{ lang: Language }> = ({ lang }) => {
  const t = translations[lang];
  return (
    <section id="cause" className="scroll-mt-24 py-32 bg-[#6d1a1d] text-white relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#e5989b]/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="relative group">
            <div className="relative z-10 overflow-hidden rounded-[60px] shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1516589174184-c68526574af7?auto=format&fit=crop&q=80&w=1000" 
                alt="Collective Care" 
                className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#6d1a1d]/60 to-transparent"></div>
            </div>
            {/* The Badge of the Cause */}
            <div className="absolute -bottom-10 -left-10 bg-[#e5989b] text-[#6d1a1d] p-8 rounded-full w-48 h-48 flex flex-col items-center justify-center text-center shadow-xl rotate-12 group-hover:rotate-0 transition-transform duration-500 z-20">
              <Sparkles className="mb-2" size={24} />
              <span className="font-serif italic text-lg leading-tight">It's so<br/>simple</span>
            </div>
          </div>
          
          <div className="space-y-8">
            <div className="inline-block px-4 py-1 bg-[#e5989b]/20 border border-[#e5989b]/30 rounded-full">
              <span className="text-[#e5989b] text-xs font-black uppercase tracking-[0.3em]">{t.ourCause}</span>
            </div>
            
            <h2 className="font-serif text-5xl md:text-6xl font-black leading-tight">
              {lang === 'es' ? 'Mucho más que una tienda.' : 'More than just a store.'}
            </h2>
            
            <p className="text-xl md:text-2xl text-white/80 font-light leading-relaxed font-serif italic border-l-4 border-[#e5989b] pl-8 py-2">
              &ldquo;{t.mantra}&rdquo;
            </p>

            <p className="text-lg text-white/70 leading-relaxed">
              {t.causeText} {lang === 'es' 
                ? 'Nacimos para recordarnos que el "yo" es más fuerte cuando es parte de un "nosotros". Cada compra apoya la difusión de mensajes de ternura y la producción ética que respeta la vida en todas sus formas.'
                : 'We were born to remind ourselves that "I" is stronger when it is part of "us". Every purchase supports the spread of messages of tenderness and ethical production that respects life in all its forms.'}
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-8">
              <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                <div className="w-14 h-14 bg-[#e5989b]/10 rounded-2xl flex items-center justify-center text-[#e5989b] mb-4">
                  <HeartHandshake size={32} />
                </div>
                <h4 className="font-bold text-sm uppercase tracking-widest text-white">{lang === 'es' ? 'Cuidado Colectivo' : 'Collective Care'}</h4>
              </div>
              <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                <div className="w-14 h-14 bg-[#e5989b]/10 rounded-2xl flex items-center justify-center text-[#e5989b] mb-4">
                  <Earth size={32} />
                </div>
                <h4 className="font-bold text-sm uppercase tracking-widest text-white">{lang === 'es' ? 'Impacto Global' : 'Global Impact'}</h4>
              </div>
              <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                <div className="w-14 h-14 bg-[#e5989b]/10 rounded-2xl flex items-center justify-center text-[#e5989b] mb-4">
                  <Leaf size={32} />
                </div>
                <h4 className="font-bold text-sm uppercase tracking-widest text-white">{lang === 'es' ? 'Ética Consciente' : 'Conscious Ethics'}</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Background Decorative Text */}
      <div className="absolute -bottom-20 left-0 w-full opacity-[0.03] pointer-events-none select-none overflow-hidden">
        <span className="text-[25rem] font-black whitespace-nowrap leading-none uppercase tracking-tighter">LOVE LOVE LOVE LOVE</span>
      </div>
    </section>
  );
};

export default MissionSection;
