
import React from 'react';
import { motion } from 'framer-motion';
import { PRODUCTS, PSIcons } from '../constants';
import { Product } from '../types';

interface HeaderProps {
  activeProductId: string;
  onSelectProduct: (product: Product) => void;
  onNavigate: (page: 'home' | 'info' | 'news' | 'features' | 'checkout') => void;
  cartCount: number;
}

const Header: React.FC<HeaderProps> = ({ activeProductId, onSelectProduct, onNavigate, cartCount }) => {
  const handleProductSelect = (product: Product) => {
    onSelectProduct(product);
    onNavigate('home');
    const showcase = document.getElementById('showcase');
    showcase?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] p-6 flex justify-between items-center">
      <div 
        className="flex items-center gap-3 bg-[#121314] text-white p-2.5 px-4 rounded-2xl shadow-xl cursor-pointer hover:scale-105 transition-transform" 
        onClick={() => onNavigate('home')}
      >
        <div className="w-4 h-4 text-[#FFE135]"><PSIcons.Triangle /></div>
        <span className="mono text-[10px] font-bold tracking-widest uppercase">OS_Nexus</span>
      </div>

      <nav className="flex items-center gap-2 p-1.5 bg-black/40 backdrop-blur-3xl rounded-full border border-white/10">
        {[
          { id: 'info', label: 'INFO' },
          { id: 'news', label: 'NEWS' },
          { id: 'features', label: 'FEATURES' },
          { id: 'checkout', label: 'BUY' }
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id as any)}
            className="px-6 py-2 rounded-full text-[9px] sst-bold tracking-widest text-white/60 hover:text-[#FFE135] transition-all relative"
          >
            {item.label}
            {item.id === 'checkout' && cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#FFE135] text-black w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-bold">
                {cartCount}
              </span>
            )}
          </button>
        ))}
      </nav>

      <div className="flex items-center gap-4">
        <div className="hidden lg:flex bg-black/40 backdrop-blur-2xl border border-white/10 rounded-full px-8 py-2.5 items-center gap-6">
           <span className="mono text-[8px] uppercase tracking-[0.2em] text-white/30">Sync Link:</span>
           <div className="flex gap-4">
             {PRODUCTS.map(p => (
               <button 
                 key={p.id} 
                 onClick={() => handleProductSelect(p)}
                 className={`text-[8px] mono uppercase font-bold transition-all ${activeProductId === p.id ? 'text-[#FFE135] scale-110' : 'text-white/30 hover:text-white'}`}
               >
                 {p.id.split('-')[1]}
               </button>
             ))}
           </div>
        </div>

        <button 
          onClick={() => onNavigate('info')}
          className="bg-white text-black px-8 py-3.5 rounded-2xl sst-bold text-[10px] tracking-widest uppercase hover:bg-[#FFE135] transition-all shadow-2xl"
        >
          Join Pulse
        </button>
      </div>
    </header>
  );
};

export default Header;
