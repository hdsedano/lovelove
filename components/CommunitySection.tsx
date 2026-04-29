import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Send, Loader2, Heart } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';

export const CommunitySection: React.FC<{ lang: Language }> = ({ lang }) => {
  const t = translations[lang];
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setEmail('');
    }, 1500);
  };

  return (
    <section className="py-32 px-6 bg-brand-cream border-y border-brand-sand/10" id="join">
      <div className="max-w-3xl mx-auto text-center space-y-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="space-y-6"
        >
          <h2 className="font-display text-5xl md:text-6xl text-brand-red leading-tight">{lang === 'en' ? 'Community' : 'Comunidad'}</h2>
          <p className="font-serif-italic text-brand-red/70 text-xl md:text-2xl max-w-xl mx-auto italic font-light">
            {t.newsletterSubtitle}
          </p>
        </motion.div>

        {status === 'success' ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center space-y-4 py-8"
          >
            <div className="w-16 h-16 bg-brand-red rounded-full flex items-center justify-center text-white mb-4">
              <Heart size={24} fill="currentColor" />
            </div>
            <p className="font-display text-2xl text-brand-red tracking-tight">{t.communitySuccess}</p>
            <p className="text-brand-red/60 font-serif-italic italic">{t.communitySuccessSub}</p>
          </motion.div>
        ) : (
          <motion.form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row items-center gap-4 max-w-md mx-auto"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t.communityPlaceholder}
              required
              className="w-full px-8 py-5 bg-brand-offwhite border-none rounded-full focus:ring-2 focus:ring-brand-rose/20 transition-all font-light placeholder:text-brand-red/30 italic text-brand-red"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full sm:w-auto px-10 py-5 bg-brand-red text-white rounded-full font-medium hover:bg-brand-red/90 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {status === 'loading' ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Send size={18} /> <span>{t.communityJoin}</span></>}
            </button>
          </motion.form>
        )}
      </div>
    </section>
  );
};
