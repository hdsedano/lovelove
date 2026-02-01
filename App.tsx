
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductCard from './components/ProductCard';
import MissionSection from './components/MissionSection';
import ChatWidget from './components/ChatWidget';
import CartDrawer from './components/CartDrawer';
import { Language, Product, CartItem } from './types';
import { PRODUCTS, BRAND_LOGO_URL } from './constants';
import { translations } from './translations';
import { Instagram, Facebook, Mail, MapPin } from 'lucide-react';

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('es');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const t = translations[lang];

  // Load cart from storage
  useEffect(() => {
    const saved = localStorage.getItem('lovelove_cart');
    if (saved) setCart(JSON.parse(saved));
  }, []);

  // Save cart to storage
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

  return (
    <div className="min-h-screen selection:bg-[#e5989b] selection:text-white bg-[#fdfaf7]">
      {/* Structured Data for SEO */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Store",
          "name": "Love Love",
          "url": "https://lovelove.ink",
          "logo": "https://lovelove.ink/input_file_0.png",
          "description": "Ethical apparel and accessories spreading love over individualism.",
          "address": {
            "@type": "PostalAddress",
            "addressCountry": "Global"
          }
        })}
      </script>

      <Header 
        lang={lang} 
        setLang={setLang} 
        cart={cart} 
        onCartToggle={() => setIsCartOpen(true)} 
      />

      <main>
        <Hero lang={lang} />

        {/* Featured Section */}
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
              />
            ))}
          </div>
        </section>

        <MissionSection lang={lang} />

        {/* Newsletter/Call to Action */}
        <section className="py-24 bg-[#faf3ef]">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h3 className="font-serif text-3xl md:text-4xl text-[#6d1a1d] mb-6">
              {lang === 'en' ? 'Stay in the Loop of Love' : 'Mantente en el círculo del amor'}
            </h3>
            <p className="text-[#6d1a1d]/70 mb-10 leading-relaxed italic">
              {lang === 'en' 
                ? 'Subscribe to get love notes, early access to new collections, and stories from our cause.' 
                : 'Suscríbete para recibir notas de amor, acceso anticipado y noticias de nuestra causa.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <input 
                type="email" 
                placeholder={lang === 'en' ? "Your heartfelt email" : "Tu correo con corazón"} 
                className="flex-1 px-6 py-4 rounded-2xl border border-[#e5989b]/30 focus:outline-none focus:ring-2 focus:ring-[#e5989b]/50 bg-white"
              />
              <button className="px-8 py-4 bg-[#6d1a1d] text-white rounded-2xl font-bold uppercase tracking-widest hover:bg-[#a32a2e] transition-all">
                {lang === 'en' ? 'Join Us' : 'Únete'}
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-[#e5989b]/10 py-16">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2 space-y-6">
            <div className="flex items-center space-x-3">
              <img src={BRAND_LOGO_URL} alt="Love Love" className="h-10 w-auto object-contain" />
              <span className="font-serif text-xl font-black text-[#6d1a1d]">Love Love</span>
            </div>
            <p className="text-[#6d1a1d]/60 max-w-sm leading-relaxed text-sm">
              {t.footerInfo}
            </p>
            <div className="flex space-x-6 text-[#6d1a1d]/40">
              <Instagram className="hover:text-[#e5989b] cursor-pointer transition-colors" size={20} />
              <Facebook className="hover:text-[#e5989b] cursor-pointer transition-colors" size={20} />
              <Mail className="hover:text-[#e5989b] cursor-pointer transition-colors" size={20} />
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-[#6d1a1d] uppercase tracking-widest text-xs mb-6">Explore</h4>
            <ul className="space-y-4 text-sm text-[#6d1a1d]/70">
              <li><a href="#shop" className="hover:text-[#e5989b] transition-colors">{t.shopNow}</a></li>
              <li><a href="#cause" className="hover:text-[#e5989b] transition-colors">{t.ourCause}</a></li>
              <li><a href="#" className="hover:text-[#e5989b] transition-colors">{lang === 'en' ? 'Terms' : 'Términos'}</a></li>
              <li><a href="#" className="hover:text-[#e5989b] transition-colors">{lang === 'en' ? 'Privacy' : 'Privacidad'}</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-bold text-[#6d1a1d] uppercase tracking-widest text-xs mb-6">Contact</h4>
            <div className="flex items-start space-x-3 text-sm text-[#6d1a1d]/70">
              <MapPin size={18} className="mt-1 flex-shrink-0 text-[#e5989b]" />
              <p>lovelove.ink<br/>Global Solidarity Movement</p>
            </div>
            <p className="text-[10px] text-[#6d1a1d]/40 mt-8 pt-8 border-t border-pink-50">
              © {new Date().getFullYear()} {t.rights}
            </p>
          </div>
        </div>
      </footer>

      {/* Overlays */}
      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        lang={lang} 
        items={cart} 
        onUpdateQuantity={updateQuantity}
        onRemove={removeProduct}
      />
      <ChatWidget lang={lang} />
    </div>
  );
};

export default App;
