import React from 'react';
import { motion } from 'motion/react';
import { Phone, Wind, Eye } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';

export const DailyPractices: React.FC<{ lang: Language }> = ({ lang }) => {
  const t = translations[lang];
  const PRACTICES = [
    {
      icon: <Phone size={24} />,
      title: t.practice1Title,
      description: t.practice1Desc
    },
    {
      icon: <Wind size={24} />,
      title: t.practice2Title,
      description: t.practice2Desc
    },
    {
      icon: <Eye size={24} />,
      title: t.practice3Title,
      description: t.practice3Desc
    }
  ];

  return (
    <section className="py-32 px-6 bg-brand-offwhite">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20 space-y-4">
          <h2 className="font-display text-4xl text-brand-red">{t.practicesTitle}</h2>
          <p className="font-serif-italic text-brand-red/60 text-lg">{t.practicesSubtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20">
          {PRACTICES.map((practice, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="group flex flex-col items-center text-center space-y-6"
            >
              <div className="w-16 h-16 rounded-full border border-brand-red/10 flex items-center justify-center text-brand-red group-hover:bg-brand-red group-hover:text-white transition-all duration-700">
                {practice.icon}
              </div>
              <h3 className="font-display text-2xl text-brand-red">{practice.title}</h3>
              <p className="font-sans text-brand-red/60 leading-relaxed font-light px-4">
                {practice.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
