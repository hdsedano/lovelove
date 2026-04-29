import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';

const PHRASES_ES = [
  "No estás solo.",
  "Respira, todavía hay amor aquí.",
  "Hoy sé suave contigo.",
  "Mira alrededor: seguimos juntos.",
  "El amor es la respuesta más sencilla.",
  "Tu presencia es un regalo para el mundo.",
  "Descansa en la certeza de que eres amado.",
  "La conexión es nuestra naturaleza más profunda.",
];

const PHRASES_EN = [
  "You are not alone.",
  "Breathe, there is still love here.",
  "Be gentle with yourself today.",
  "Look around: we are still together.",
  "Love is the simplest answer.",
  "Your presence is a gift to the world.",
  "Rest in the certainty that you are loved.",
  "Connection is our deepest nature.",
];

export const HeartDaily: React.FC<{ lang: Language }> = ({ lang }) => {
  const t = translations[lang];
  const [phrase, setPhrase] = useState("");

  useEffect(() => {
    const PHRASES = lang === 'en' ? PHRASES_EN : PHRASES_ES;
    // Select phrase based on day of year for consistency
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now.getTime() - start.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    const day = Math.floor(diff / oneDay);
    setPhrase(PHRASES[day % PHRASES.length]);
  }, [lang]);

  return (
    <section className="py-24 px-6 md:py-32 flex flex-col items-center justify-center text-center bg-brand-cream border-y border-brand-sand/30">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="max-w-2xl"
      >
        <div className="flex items-center justify-center mb-8">
          <Heart size={24} className="text-brand-rose fill-brand-rose/20" />
        </div>
        <h3 className="font-serif-italic text-sm uppercase tracking-[0.2em] text-brand-red/60 mb-6 font-medium">
          {t.dailyHeart}
        </h3>
        <AnimatePresence mode="wait">
          <motion.p
            key={phrase}
            initial={{ opacity: 0, filter: "blur(10px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 2 }}
            className="font-display text-4xl md:text-5xl lg:text-6xl text-brand-red/90 leading-tight"
          >
            {phrase}
          </motion.p>
        </AnimatePresence>
      </motion.div>
    </section>
  );
};
