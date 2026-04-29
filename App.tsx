import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { MainNavigation } from './components/MainNavigation';
import { NarrativeHero } from './components/NarrativeHero';
import { NarrativeValues } from './components/NarrativeValues';
import { DailyPractices } from './components/DailyPractices';
import { SoulfulStore } from './components/SoulfulStore';
import { CommunitySection } from './components/CommunitySection';
import { HeartDaily } from './components/HeartDaily';
import { RedesignedFooter } from './components/RedesignedFooter';
import CartDrawer from './components/CartDrawer';
import { Language, Product, CartItem } from './types';

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('es');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    // Detect browser language
    const browserLang = navigator.language.split('-')[0];
    if (browserLang === 'en') {
      setLang('en');
    } else {
      setLang('es');
    }

    const saved = localStorage.getItem('lovelove_cart_redesign');
    if (saved) setCart(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('lovelove_cart_redesign', JSON.stringify(cart));
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
    <div className="min-h-screen bg-brand-offwhite font-sans text-brand-black">
      {/* Premium Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-brand-rose origin-left z-[100]"
        style={{ scaleX }}
      />

      <MainNavigation cartCount={cart.reduce((a, b) => a + b.quantity, 0)} onCartOpen={() => setIsCartOpen(true)} />

      <main className="relative z-10">
        <section id="hero">
          <NarrativeHero lang={lang} />
        </section>

        <section id="explore">
          <NarrativeValues lang={lang} />
        </section>

        <section id="practices">
          <DailyPractices lang={lang} />
        </section>

        <section id="join">
          <CommunitySection lang={lang} />
        </section>

        <section id="collection">
          <SoulfulStore onAddToCart={addToCart} lang={lang} />
        </section>

        <section id="heart">
          <HeartDaily lang={lang} />
        </section>

        <section className="py-48 px-6 flex flex-col items-center justify-center text-center bg-brand-offwhite">
           <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
             transition={{ duration: 2 }}
            className="space-y-8"
           >
             <p className="font-display text-3xl md:text-5xl text-brand-red italic max-w-4xl mx-auto leading-tight">
              &ldquo;{lang === 'en' ? "It's so simple, forever love, for always love." : "Es tan sencillo, por siempre amor, para siempre amor."}&rdquo;
             </p>
             <div className="w-12 h-[1px] bg-brand-red/20 mx-auto" />
           </motion.div>
        </section>
      </main>

      <RedesignedFooter lang={lang} />

      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        lang={lang} 
        items={cart} 
        onUpdateQuantity={updateQuantity} 
        onRemove={removeProduct} 
      />
    </div>
  );
};

export default App;
