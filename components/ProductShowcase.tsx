
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GoogleGenAI } from '@google/genai';
import Scene3D from './Scene3D';
import GLBViewer from './GLBViewer';
import { Product, ProductDetail } from '../types';
import { PSIcons } from '../constants';

interface ProductShowcaseProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductShowcase: React.FC<ProductShowcaseProps> = ({ product, onAddToCart }) => {
  const [activeDetail, setActiveDetail] = useState<ProductDetail | null>(null);
  const [aiDescription, setAiDescription] = useState<string>('');
  const [isAiLoading, setIsAiLoading] = useState(false);

  useEffect(() => {
    setActiveDetail(null);
    setAiDescription('');
  }, [product.id]);

  const handleExploreDetail = async (detail: ProductDetail) => {
    setActiveDetail(detail);
    setIsAiLoading(true);
    try {
      // Create new instance with direct API_KEY from environment
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Describe this detail of ${product.name}: ${detail.name}. Industrial hardware style, 2 sentences.`,
        config: { systemInstruction: "You are a technical document writer. Be precise.", temperature: 0.5 }
      });
      setAiDescription(response.text || detail.description_fallback);
    } catch (e) {
      setAiDescription(detail.description_fallback);
    } finally {
      setIsAiLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 h-full items-start gap-12 relative">
      <div className="lg:col-span-4 z-10 flex flex-col justify-start">
        <motion.div 
          className="space-y-8 p-10 bg-white/40 backdrop-blur-3xl rounded-[2.5rem] border border-white/60 shadow-lg"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
        >
          <div className="flex items-center gap-3">
            <span className="bg-[#121314] text-white px-2 py-0.5 mono text-[9px] font-bold rounded">REV_2024</span>
            <span className="mono text-[9px] tracking-[0.3em] text-black/40 uppercase">Hardware Manifest</span>
          </div>

          <h1 className="text-7xl md:text-8xl sst-bold tracking-tight leading-[0.85] text-[#121314]">
            {product.name.split(' ').map((word, i) => (
              <span key={i} className="block">{word}</span>
            ))}
          </h1>

          <div className="flex gap-12 items-start py-6 border-y border-black/5">
            <div className="flex flex-col gap-1">
              <span className="mono text-[8px] uppercase tracking-widest text-black/30">MSRP</span>
              <span className="text-3xl sst-bold text-[#121314]">{product.price}</span>
            </div>
          </div>

          <p className="text-xs mono leading-relaxed text-black/50 max-w-sm font-medium">
            {product.description.toUpperCase()}
          </p>

          <div className="space-y-4">
             <div className="flex items-center gap-3">
               <div className="w-4 h-4 bg-[#FFE135] rounded-full flex items-center justify-center text-black scale-75 shadow-[0_0_15px_rgba(255,225,53,0.4)]">
                 <div className="w-2 h-2 border-t-2 border-r-2 border-black rotate-45 translate-x-[-1px] translate-y-[1px]" />
               </div>
               <span className="mono text-[9px] font-bold tracking-widest text-black/80 uppercase">Core Systems</span>
             </div>
             <ul className="grid grid-cols-1 gap-2">
               {product.features.map(f => (
                 <li key={f}>
                   <motion.div 
                     whileHover={{ scale: 1.02, x: 6 }}
                     className="flex items-center gap-2 group cursor-pointer"
                   >
                     <div className="w-1.5 h-1.5 bg-black/10 group-hover:bg-[#FFE135] transition-colors" />
                     <span className="mono text-[10px] text-black/30 group-hover:text-black transition-all">{f}</span>
                   </motion.div>
                 </li>
               ))}
             </ul>
          </div>
        </motion.div>
      </div>

      <div className="lg:col-span-5 h-[70vh] relative z-10 flex items-start">
        <div className="w-full h-full -mt-12">
          {product.modelType === 'console' ? (
            <GLBViewer src="/ps5.glb" />
          ) : (
            <Scene3D 
              type={product.modelType} 
              color={product.color} 
              id={product.id} 
              details={product.details}
              onDetailClick={handleExploreDetail}
              isExploring={!!activeDetail}
            />
          )}
        </div>
      </div>

      <div className="lg:col-span-3 z-10 h-full flex items-start">
        <AnimatePresence mode="wait">
          {activeDetail ? (
             <motion.div
               key="detail"
               initial={{ opacity: 0, x: 40 }}
               animate={{ opacity: 1, x: 0 }}
               exit={{ opacity: 0, x: 40 }}
               className="bg-[#121314] text-white p-10 rounded-[3rem] shadow-2xl relative overflow-hidden"
             >
                <button 
                  onClick={() => setActiveDetail(null)}
                  className="mb-10 mono text-[9px] tracking-widest text-[#FFE135] flex items-center gap-2 hover:translate-x-[-4px] transition-transform"
                >
                  [ ← ESC ]
                </button>
                <h3 className="text-4xl sst-bold mb-6 tracking-tight leading-none uppercase">{activeDetail.name}</h3>
                <p className="mono text-[11px] leading-relaxed text-white/60">
                  {isAiLoading ? "FETCHING..." : aiDescription.toUpperCase()}
                </p>
             </motion.div>
          ) : (
            <motion.div
              key="specs"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 40 }}
              className="space-y-10 w-full"
            >
              <div className="space-y-6 bg-white/40 backdrop-blur-2xl p-8 rounded-[2.5rem] border border-white/60 shadow-lg">
                <div className="flex justify-between items-end border-b border-black/10 pb-2">
                  <span className="mono text-[9px] font-bold text-black/80">TECHNICAL_SPECS</span>
                  <div className="w-2 h-2 bg-[#FFE135] rounded-sm" />
                </div>
                {Object.entries(product.specs).map(([k, v]) => (
                  <div key={k} className="flex justify-between items-baseline gap-4 group">
                    <span className="mono text-[8px] uppercase tracking-widest text-black/30">{k}</span>
                    <span className="mono text-[10px] font-bold text-[#121314]">{v}</span>
                  </div>
                ))}
              </div>
              
              <div className="p-8 bg-[#FFE135] rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
                <p className="mono text-[9px] text-black font-bold mb-6 leading-relaxed relative z-10">
                  READY FOR DEPLOYMENT. ADD TO CART FOR PROCUREMENT.
                </p>
                <button 
                  onClick={() => onAddToCart(product)}
                  className="w-full bg-[#121314] text-white p-4 rounded-2xl sst-bold text-[10px] tracking-widest uppercase hover:scale-[1.02] transition-all flex justify-between items-center relative z-10"
                >
                  <span>Order Now</span>
                  <div className="w-4 h-4"><PSIcons.Cross /></div>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ProductShowcase;
