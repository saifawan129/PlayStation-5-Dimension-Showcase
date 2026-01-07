
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductShowcase from './components/ProductShowcase';
import GeminiAssistant from './components/GeminiAssistant';
import InfoOverlay from './components/overlays/InfoOverlay';
import NewsOverlay from './components/overlays/NewsOverlay';
import FeaturesOverlay from './components/overlays/FeaturesOverlay';
import CheckoutOverlay from './components/overlays/CheckoutOverlay';
import { PRODUCTS } from './constants';
import { Product } from './types';

const App: React.FC = () => {
  const [activeProduct, setActiveProduct] = useState<Product>(PRODUCTS[0]);
  const [activePage, setActivePage] = useState<'home' | 'info' | 'news' | 'features' | 'checkout'>('home');
  const [cart, setCart] = useState<Product[]>([]);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    container: containerRef
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const textY = useTransform(scrollYProgress, [0, 0.5], ['-50%', '-30%']);

  const addToCart = (product: Product) => {
    setCart(prev => [...prev, product]);
    setActivePage('checkout');
  };

  const closeOverlay = () => setActivePage('home');

  return (
    <div className="relative w-full h-full text-[#121314] overflow-hidden select-none bg-[#F4F4F4]">
      <div className="grain" />
      
      {/* Background Layer */}
      <div className="absolute inset-0 z-0 pointer-events-none flex">
        <div className="absolute inset-0 bg-[#F4F4F4]" />
        <div 
          className="absolute inset-0 bg-[#FFE135]"
          style={{ clipPath: 'polygon(55% 0, 100% 0, 100% 100%, 40% 100%)' }}
        />
        <motion.div 
          style={{ y: bgY }}
          className="absolute inset-0 bg-cover bg-center mix-blend-multiply opacity-20 grayscale-[10%]"
        >
          <div 
            className="w-full h-[120%] bg-cover bg-center"
            style={{ 
              backgroundImage: `url('https://images.unsplash.com/photo-1622233114216-183fa5464b56?auto=format&fit=crop&q=80&w=2000')`,
              filter: 'contrast(1.1) brightness(1.2)'
            }}
          />
        </motion.div>
        <motion.div 
          style={{ y: textY }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 sst-bold text-[38vw] text-black/[0.03] leading-none whitespace-nowrap"
        >
          PS5
        </motion.div>
      </div>

      <Header 
        activeProductId={activeProduct.id} 
        onSelectProduct={setActiveProduct} 
        onNavigate={setActivePage}
        cartCount={cart.length}
      />

      <div ref={containerRef} className="relative z-10 w-full h-full overflow-y-auto overflow-x-hidden snap-y snap-mandatory no-scrollbar">
        <section className="w-full h-full snap-start flex items-start justify-center pt-[15vh]">
          <Hero isVisible={activePage === 'home'} scrollProgress={scrollYProgress} />
        </section>

        <section id="showcase" className="w-full h-full snap-start pt-28 px-12 relative flex items-start">
          <ProductShowcase product={activeProduct} onAddToCart={addToCart} />
        </section>

        <div className="absolute bottom-6 left-12 right-12 flex justify-between items-end z-20 pointer-events-none">
          <div className="mono text-[9px] uppercase tracking-[0.4em] text-black/30 flex gap-12">
            <span>{activeProduct.category} // OS_SYNC_STABLE</span>
            <span>©2024 PLAYSTATION</span>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {activePage === 'info' && <InfoOverlay onClose={closeOverlay} />}
        {activePage === 'news' && <NewsOverlay onClose={closeOverlay} />}
        {activePage === 'features' && <FeaturesOverlay onClose={closeOverlay} />}
        {activePage === 'checkout' && (
          <CheckoutOverlay 
            cart={cart} 
            onClose={closeOverlay} 
            onClearCart={() => setCart([])} 
          />
        )}
      </AnimatePresence>

      <GeminiAssistant activeProduct={activeProduct} />
    </div>
  );
};

export default App;
