import React from 'react';
import { motion } from 'motion/react';
import { BRAND_LOGO_URL } from '../constants';
import { Language } from '../types';
import { translations } from '../translations';

export const NarrativeHero: React.FC<{ lang: Language }> = ({ lang }) => {
  const t = translations[lang];
  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center pt-24 pb-12 px-6 overflow-hidden bg-brand-offwhite">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 z-0 pointer-events-none"
      >
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-rose/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-brand-sand/10 rounded-full blur-[100px]" />
      </motion.div>

      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center text-center">
        <motion.img
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          src={BRAND_LOGO_URL}
          alt="Love Love"
          className="h-12 w-auto mb-16 opacity-80"
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="space-y-6"
        >
          <h1 className="font-display text-7xl md:text-8xl lg:text-[10rem] text-brand-red leading-[0.85] tracking-[-0.04em]">
            {t.heroTitle} <br />
            <span className="font-serif-italic font-light">{t.heroSubtitle1}</span>
          </h1>
          
          <p className="font-serif-italic text-xl md:text-2xl text-brand-red/60 max-w-lg mx-auto">
            {t.heroSubtitle2}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-20 flex flex-col sm:flex-row items-center gap-6"
        >
          <a
            href="#join"
            className="px-10 py-5 bg-brand-red text-white rounded-full font-medium tracking-wide hover:shadow-xl hover:shadow-brand-red/10 transition-all duration-500 hover:-translate-y-1"
          >
            {t.heroJoin}
          </a>
          <a
            href="#explore"
            className="px-10 py-5 text-brand-red font-medium tracking-wide border border-brand-red/10 rounded-full hover:bg-brand-red/5 transition-all duration-500"
          >
            {t.heroExplore}
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 2 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 text-brand-red/30 animate-bounce"
      >
        <div className="w-[1px] h-12 bg-current" />
      </motion.div>
    </section>
  );
};
