
import React from 'react';
import { motion } from 'framer-motion';
import { PSIcons } from '../../constants';

const InfoOverlay: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[110] bg-[#F4F4F4]/95 backdrop-blur-3xl flex items-center justify-center p-12"
    >
      <button onClick={onClose} className="absolute top-12 right-12 w-12 h-12 bg-black text-white rounded-full flex items-center justify-center hover:bg-[#FFE135] hover:text-black transition-colors">
        <div className="w-6 h-6"><PSIcons.Cross /></div>
      </button>

      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-20">
        <div className="space-y-8">
          <span className="mono text-[10px] tracking-[0.4em] text-black/40 uppercase">Ecosystem / 01</span>
          <h2 className="text-7xl sst-bold leading-none">THE PORTAL TO INFINITY.</h2>
          <p className="mono text-xs leading-relaxed text-black/60">
            PLAYSTATION 5 IS NOT JUST HARDWARE. IT IS A MULTI-DIMENSIONAL PORTAL BUILT ON THREE PILLARS:
            STUNNING VISUALS, DEEP IMMERSION, AND LIGHTNING SPEED.
          </p>
          <div className="flex gap-4">
             {[PSIcons.Triangle, PSIcons.Circle, PSIcons.Cross, PSIcons.Square].map((Icon, i) => (
               <div key={i} className="w-8 h-8 text-[#FFE135]"><Icon /></div>
             ))}
          </div>
        </div>

        <div className="space-y-12">
           {[
             { title: 'LIGHTNING SPEED', desc: 'Harness the power of a custom CPU, GPU, and SSD with Integrated I/O that rewrite the rules of what a PlayStation console can do.' },
             { title: 'STUNNING GAMES', desc: 'Marvel at incredible graphics and experience new PS5 features. Marvel at ray tracing, 4K-TV gaming, and up to 120fps with 120Hz output.' },
             { title: 'BREATH-TAKING IMMERSION', desc: 'Discover a deeper gaming experience with support for haptic feedback, adaptive triggers, and 3D Audio technology.' }
           ].map((item, i) => (
             <div key={i} className="space-y-2 group">
               <h4 className="sst-bold text-xl group-hover:text-[#FFE135] transition-colors">{item.title}</h4>
               <p className="mono text-[10px] text-black/40 leading-relaxed uppercase">{item.desc}</p>
             </div>
           ))}
        </div>
      </div>
    </motion.div>
  );
};

export default InfoOverlay;
