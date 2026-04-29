import React from 'react';
import { motion } from 'motion/react';
import { Heart, ShoppingBag } from 'lucide-react';
import { BRAND_LOGO_URL } from '../constants';

export const MainNavigation: React.FC<{ cartCount: number; onCartOpen: () => void }> = ({ cartCount, onCartOpen }) => {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-8 pointer-events-none"
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center bg-white/40 backdrop-blur-md border border-white/20 px-8 py-4 rounded-full pointer-events-auto">
        <a href="/" className="flex items-center gap-3 group">
          <Heart size={20} className="text-brand-rose group-hover:fill-brand-rose transition-all duration-500" />
          <span className="font-display text-xl text-brand-red tracking-tight">Love Love</span>
        </a>

        <div className="hidden md:flex items-center gap-10">
          <a href="#explore" className="text-sm font-medium tracking-widest text-brand-red/60 hover:text-brand-red transition-colors uppercase">Sentir</a>
          <a href="#collection" className="text-sm font-medium tracking-widest text-brand-red/60 hover:text-brand-red transition-colors uppercase">Objetos</a>
          <a href="#join" className="text-sm font-medium tracking-widest text-brand-red/60 hover:text-brand-red transition-colors uppercase">Comunidad</a>
        </div>

        <button
          onClick={onCartOpen}
          className="relative group p-2"
        >
          <ShoppingBag size={20} className="text-brand-red group-hover:scale-110 transition-transform" />
          {cartCount > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-1 -right-1 w-5 h-5 bg-brand-rose text-white text-[10px] font-bold rounded-full flex items-center justify-center"
            >
              {cartCount}
            </motion.span>
          )}
        </button>
      </div>
    </motion.nav>
  );
};
