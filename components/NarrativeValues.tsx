import React from 'react';
import { motion } from 'motion/react';
import { Language } from '../types';
import { translations } from '../translations';

export const NarrativeValues: React.FC<{ lang: Language }> = ({ lang }) => {
  const t = translations[lang];
  return (
    <section className="py-32 px-6 bg-brand-offwhite" id="explore">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2 }}
          className="text-center space-y-10"
        >
          <span className="font-serif-italic text-sm uppercase tracking-[0.3em] text-brand-red/40 font-semibold italic">
            ¿Qué es Love Love?
          </span>
          
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-brand-red leading-tight">
            {t.narrativeTitle} <br />
            <span className="font-serif-italic font-light italic">{t.narrativeSubtitle}</span>
          </h2>
          
          <div className="w-12 h-[1px] bg-brand-red/20 mx-auto" />
        </motion.div>
      </div>
    </section>
  );
};
