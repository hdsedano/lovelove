
import React from 'react';
import { Language } from '../types';
import { translations } from '../translations';

const Hero: React.FC<{ lang: Language }> = ({ lang }) => {
  const t = translations[lang];
  return (
    <section className="relative h-[85vh] flex items-center justify-center overflow-hidden bg-[#faf3ef]">
      {/* Fondo original limpio */}
      <div className="absolute inset-0 opacity-[0.15]" style={{ backgroundImage: 'radial-gradient(#e5989b 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
      
      <div className="relative z-10 text-center px-4 max-w-4xl animate-fade-in">
        <p className="font-script text-3xl md:text-4xl text-[#e5989b] mb-4 drop-shadow-sm">
          &ldquo;{t.mantra}&rdquo;
        </p>
        
        <h1 className="font-serif text-5xl md:text-7xl text-[#6d1a1d] font-black mb-8 leading-tight">
          {t.heroTitle}
        </h1>
        
        <p className="text-lg md:text-xl text-[#6d1a1d]/80 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
          {t.heroSubtitle}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#shop" className="px-8 py-4 bg-[#6d1a1d] text-white rounded-full font-bold uppercase tracking-widest hover:bg-[#a32a2e] transition-all transform hover:-translate-y-1 shadow-xl">
            {t.shopNow}
          </a>
          <a href="#cause" className="px-8 py-4 bg-white/80 backdrop-blur border-2 border-[#6d1a1d]/10 text-[#6d1a1d] rounded-full font-bold uppercase tracking-widest hover:border-[#6d1a1d] transition-all transform hover:-translate-y-1">
            {t.ourCause}
          </a>
        </div>
      </div>

      <div className="absolute top-1/4 -left-12 w-48 h-48 bg-[#e5989b]/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 -right-12 w-64 h-64 bg-[#6d1a1d]/5 rounded-full blur-3xl"></div>
    </section>
  );
};

export default Hero;
