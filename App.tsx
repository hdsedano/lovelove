
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductCard from './components/ProductCard';
import ProductModal from './components/ProductModal';
import MissionSection from './components/MissionSection';
import ChatWidget from './components/ChatWidget';
import CartDrawer from './components/CartDrawer';
import { Language, Product, CartItem } from './types';
import { PRODUCTS, BRAND_LOGO_URL } from './constants';
import { translations } from './translations';
import { Instagram, Facebook, Mail, MapPin, Heart, Send, Sparkles, AlertCircle } from 'lucide-react';

// URL de tu Script de Google (Paso 2 abajo)
const GOOGLE_SHEETS_URL = "TU_URL_DE_GOOGLE_APPS_SCRIPT_AQUI";

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('es');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [footerLogoError, setFooterLogoError] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  
  const t = translations[lang];

  useEffect(() => {
    const saved = localStorage.getItem('lovelove_cart');
    if (saved) setCart(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('lovelove_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) {
        return prev.map(i => i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(0, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const removeProduct = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || newsletterStatus === 'loading') return;
    
    setNewsletterStatus('loading');

    try {
      // Usamos el modo 'no-cors' si el script de Google no tiene cabeceras CORS
      // O 'cors' si el script está configurado para devolver JSON con cabeceras
      const response = await fetch(GOOGLE_SHEETS_URL, {
        method: 'POST',
        mode: 'no-cors', // Truco estándar para Google Scripts
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email: newsletterEmail, 
          date: new Date().toLocaleString(),
          lang: lang
        }),
      });

      // Con no-cors no podemos leer la respuesta, pero asumimos éxito si no hay error de red
      setNewsletterStatus('success');
      setNewsletterEmail('');
    } catch (error) {
      console.error("Error al suscribirse:", error);
      // Si la URL es la de ejemplo o falla, mostramos éxito en demo pero error en log
      if (GOOGLE_SHEETS_URL.includes("TU_URL")) {
          setTimeout(() => setNewsletterStatus('success'), 1000); // Para que veas el efecto en la demo
      } else {
          setNewsletterStatus('error');
      }
    }
  };

  return (
    <div className="min-h-screen selection:bg-[#e5989b] selection:text-white bg-[#fdfaf7]">
      <Header 
        lang={lang} 
        setLang={setLang} 
        cart={cart} 
        onCartToggle={() => setIsCartOpen(true)} 
      />

      <main>
        <Hero lang={lang} />
        
        <section id="shop" className="py-24 max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-black text-[#6d1a1d] mb-4">
              {t.featuredProducts}
            </h2>
            <div className="w-24 h-1 bg-[#e5989b] mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {PRODUCTS.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                lang={lang} 
                onAddToCart={addToCart} 
                onViewProduct={setSelectedProduct}
              />
            ))}
          </div>
        </section>

        <MissionSection lang={lang} />

        {/* Newsletter Section */}
        <section className="py-24 bg-[#faf3ef] border-y border-[#e5989b]/10">
          <div className="max-w-4xl mx-auto px-4 text-center">
            {newsletterStatus === 'success' ? (
              <div className="animate-fade-in py-12">
                <div className="w-20 h-20 bg-[#6d1a1d] rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                  <Heart className="text-white fill-current animate-pulse" size={32} />
                </div>
                <h3 className="font-serif text-3xl font-black text-[#6d1a1d] mb-4">
                  {t.newsletterSuccess}
                </h3>
              </div>
            ) : (
              <div className="space-y-8">
                <div className="flex items-center justify-center space-x-2 text-[#e5989b]">
                  <Sparkles size={20} />
                  <span className="font-bold uppercase tracking-[0.3em] text-xs">{lang === 'es' ? 'COMUNIDAD' : 'COMMUNITY'}</span>
                  <Sparkles size={20} />
                </div>
                
                <h2 className="font-serif text-4xl md:text-5xl font-black text-[#6d1a1d]">
                  {t.newsletterTitle}
                </h2>
                
                <p className="text-[#6d1a1d]/70 text-lg md:text-xl font-light max-w-2xl mx-auto italic">
                  &ldquo;{t.newsletterSubtitle}&rdquo;
                </p>

                <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto relative group">
                  <input 
                    type="email" 
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder={t.newsletterPlaceholder}
                    required
                    className="w-full pl-8 pr-44 py-5 bg-white border border-[#e5989b]/30 rounded-full focus:outline-none focus:ring-4 focus:ring-[#e5989b]/20 transition-all shadow-sm group-hover:shadow-md text-[#6d1a1d]"
                  />
                  <button 
                    type="submit"
                    disabled={newsletterStatus === 'loading'}
                    className="absolute right-2 top-2 bottom-2 px-6 bg-[#6d1a1d] text-white rounded-full font-bold uppercase tracking-widest text-[11px] hover:bg-[#a32a2e] transition-all disabled:opacity-50 flex items-center space-x-2"
                  >
                    {newsletterStatus === 'loading' ? (
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    ) : (
                      <>
                        <span>{t.newsletterButton}</span>
                        <Send size={12} />
                      </>
                    )}
                  </button>
                </form>

                {newsletterStatus === 'error' && (
                  <div className="flex items-center justify-center space-x-2 text-red-500 text-sm mt-4 animate-fade-in">
                    <AlertCircle size={16} />
                    <span>Algo ha fallado. Inténtalo de nuevo.</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
      </main>

      <footer className="bg-white border-t border-[#e5989b]/10 py-16">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12 text-center md:text-left">
          <div className="col-span-1 md:col-span-2 space-y-6">
            <div className="flex items-center justify-center md:justify-start space-x-3">
              {!footerLogoError ? (
                <img 
                  src={BRAND_LOGO_URL} 
                  alt="Love Love" 
                  className="h-10 w-auto object-contain" 
                  onError={() => setFooterLogoError(true)}
                />
              ) : (
                <div className="w-10 h-10 bg-[#e5989b]/20 rounded-full flex items-center justify-center text-[#6d1a1d]">
                  <Heart size={20} fill="currentColor" />
                </div>
              )}
              <span className="font-serif text-xl font-black text-[#6d1a1d]">Love Love</span>
            </div>
            <p className="text-[#6d1a1d]/60 max-w-sm mx-auto md:mx-0 leading-relaxed text-sm italic">
              "{t.mantra}"
            </p>
            <div className="flex justify-center md:justify-start space-x-6 text-[#6d1a1d]/40 mt-4">
              <Instagram className="hover:text-[#e5989b] cursor-pointer transition-colors" size={20} />
              <Facebook className="hover:text-[#e5989b] cursor-pointer transition-colors" size={20} />
              <Mail className="hover:text-[#e5989b] cursor-pointer transition-colors" size={20} />
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-[#6d1a1d] uppercase tracking-widest text-xs mb-6">{lang === 'en' ? 'Explore' : (lang === 'ca' ? 'Explorar' : 'Explorar')}</h4>
            <ul className="space-y-4 text-sm text-[#6d1a1d]/70">
              <li><a href="#shop" className="hover:text-[#e5989b] transition-colors">{t.shopNow}</a></li>
              <li><a href="#cause" className="hover:text-[#e5989b] transition-colors">{t.ourCause}</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-bold text-[#6d1a1d] uppercase tracking-widest text-xs mb-6">{lang === 'en' ? 'Contact' : (lang === 'ca' ? 'Contacte' : 'Contacto')}</h4>
            <div className="flex items-center justify-center md:justify-start space-x-3 text-sm text-[#6d1a1d]/70">
              <MapPin size={18} className="text-[#e5989b]" />
              <p>lovelove.ink</p>
            </div>
            <p className="text-[10px] text-[#6d1a1d]/40 mt-8">
              © {new Date().getFullYear()} {t.rights}
            </p>
          </div>
        </div>
      </footer>

      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        lang={lang} 
        items={cart} 
        onUpdateQuantity={updateQuantity}
        onRemove={removeProduct}
      />
      
      <ProductModal 
        isOpen={!!selectedProduct} 
        product={selectedProduct} 
        onClose={() => setSelectedProduct(null)} 
        lang={lang} 
        onAddToCart={addToCart} 
      />

      <ChatWidget lang={lang} />
    </div>
  );
};

export default App;
