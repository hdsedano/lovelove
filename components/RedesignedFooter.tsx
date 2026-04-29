import React from 'react';
import { Instagram, Mail, Heart } from 'lucide-react';
import { BRAND_LOGO_URL } from '../constants';
import { Language } from '../types';
import { translations } from '../translations';

export const RedesignedFooter: React.FC<{ lang: Language }> = ({ lang }) => {
  const t = translations[lang];
  return (
    <footer className="py-24 px-6 bg-brand-offwhite">
      <div className="max-w-7xl mx-auto space-y-20">
        <div className="flex flex-col md:flex-row justify-between items-start gap-16">
          <div className="space-y-6 max-w-xs">
            <div className="flex items-center gap-3">
              <Heart size={24} className="text-brand-rose" />
              <span className="font-display text-2xl text-brand-red">Love Love</span>
            </div>
            <p className="font-serif-italic text-brand-red/60 text-lg italic leading-relaxed">
              &ldquo;{t.footerPhilosophy}&rdquo;
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 gap-20">
            <div className="space-y-6">
              <h4 className="font-sans text-xs uppercase tracking-[0.2em] font-bold text-brand-red">{t.footerConnect}</h4>
              <ul className="space-y-4 font-serif-italic italic text-brand-red/60">
                <li><a href="https://instagram.com" className="hover:text-brand-red transition-colors flex items-center gap-2"><Instagram size={14} /> Instagram</a></li>
                <li><a href="mailto:love@lovelove.ink" className="hover:text-brand-red transition-colors flex items-center gap-2"><Mail size={14} /> Email</a></li>
              </ul>
            </div>
            <div className="space-y-6">
              <h4 className="font-sans text-xs uppercase tracking-[0.2em] font-bold text-brand-red">{t.footerMeaning}</h4>
              <ul className="space-y-4 font-serif-italic italic text-brand-red/60">
                <li><a href="#join" className="hover:text-brand-red transition-colors">{lang === 'en' ? 'Community' : 'Comunidad'}</a></li>
                <li><a href="#explore" className="hover:text-brand-red transition-colors">{t.ourCause}</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-brand-sand/30 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] uppercase tracking-[0.2em] text-brand-red/30 font-medium">
          <p>© {new Date().getFullYear()} Love Love. {lang === 'en' ? 'Made with tenderness.' : 'Hecho con ternura.'}</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-brand-red transition-colors">{lang === 'en' ? 'Privacy' : 'Privacidad'}</a>
            <a href="#" className="hover:text-brand-red transition-colors">{lang === 'en' ? 'Terms' : 'Términos'}</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
