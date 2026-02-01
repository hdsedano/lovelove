
import React from 'react';
// Fixed: ShoppingHeart is defined locally at the bottom of the file
import { Globe, Menu, X } from 'lucide-react';
import { Language, CartItem } from '../types';
import { translations } from '../translations';
import { BRAND_LOGO_URL } from '../constants';

interface HeaderProps {
  lang: Language;
  setLang: (lang: Language) => void;
  cart: CartItem[];
  onCartToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ lang, setLang, cart, onCartToggle }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [logoError, setLogoError] = React.useState(false);
  const t = translations[lang];

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 bg-[#fdfaf7]/95 backdrop-blur-md border-b border-[#e5989b]/20">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden p-2 text-[#6d1a1d]"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Logo Container */}
        <a href="/" className="flex items-center space-x-3 group" onClick={(e) => { e.preventDefault(); window.scrollTo({top: 0, behavior: 'smooth'}); }}>
          <div className="relative h-12 w-12 flex items-center justify-center">
            {!logoError ? (
              <img 
                src={BRAND_LOGO_URL} 
                alt="Love Love" 
                className="h-full w-auto object-contain transition-transform group-hover:scale-110"
                onError={() => setLogoError(true)}
              />
            ) : (
              <div className="w-10 h-10 bg-[#e5989b]/20 rounded-full flex items-center justify-center text-[#6d1a1d]">
                ♥
              </div>
            )}
          </div>
          <span className="font-serif text-2xl font-black text-[#6d1a1d] tracking-tight">
            Love Love
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-10 text-[#6d1a1d] font-bold uppercase tracking-[0.2em] text-xs">
          <a href="#shop" className="hover:text-[#e5989b] transition-colors py-2">{t.shopNow}</a>
          <a href="#cause" className="hover:text-[#e5989b] transition-colors py-2">{t.ourCause}</a>
        </nav>

        {/* Actions */}
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => setLang(lang === 'en' ? 'es' : 'en')}
            className="flex items-center space-x-2 text-[#6d1a1d] hover:text-[#e5989b] text-xs font-black transition-colors px-2 py-1"
          >
            <Globe size={14} />
            <span className="uppercase">{lang}</span>
          </button>
          
          <button 
            onClick={onCartToggle}
            className="relative p-2.5 text-[#6d1a1d] hover:bg-[#e5989b]/10 rounded-full transition-all"
            aria-label="Cart"
          >
            <ShoppingHeart size={24} />
            {totalItems > 0 && (
              <span className="absolute top-1 right-1 bg-[#e5989b] text-white text-[9px] font-black w-5 h-5 flex items-center justify-center rounded-full shadow-sm">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#fdfaf7] border-b border-[#e5989b]/10 p-8 space-y-6 shadow-2xl animate-fade-in">
          <a href="#shop" className="block text-[#6d1a1d] font-black text-xl border-b border-pink-50 pb-2" onClick={() => setIsMobileMenuOpen(false)}>{t.shopNow}</a>
          <a href="#cause" className="block text-[#6d1a1d] font-black text-xl border-b border-pink-50 pb-2" onClick={() => setIsMobileMenuOpen(false)}>{t.ourCause}</a>
          <div className="pt-4 flex items-center text-[#e5989b] font-bold italic">
            "Es tan sencillo por siempre amor"
          </div>
        </div>
      )}
    </header>
  );
};

// Custom SVG component for ShoppingHeart
const ShoppingHeart = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/><path d="M12 14.5a2.5 2.5 0 1 0-5 0c0 3 5 5 5 5s5-2 5-5a2.5 2.5 0 1 0-5 0Z"/>
  </svg>
);

export default Header;
