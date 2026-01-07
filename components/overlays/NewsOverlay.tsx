
import React from 'react';
import { motion } from 'framer-motion';
import { PSIcons } from '../../constants';

const NewsOverlay: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const newsItems = [
    { tag: 'EVENT', title: 'State of Play: Winter 2024 Recap', date: 'DEC 12' },
    { tag: 'TECH', title: 'PSSR: The Future of AI Image Reconstruction', date: 'DEC 05' },
    { tag: 'HARDWARE', title: 'INZONE M10S: Co-developed with Fnatic', date: 'NOV 28' },
    { tag: 'COMMUNITY', title: 'PlayStation Stars: New Rewards Array', date: 'NOV 15' }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, x: '100%' }} 
      animate={{ opacity: 1, x: 0 }} 
      exit={{ opacity: 0, x: '100%' }}
      className="fixed inset-0 z-[110] bg-[#121314] text-white flex items-center justify-end"
    >
      <button onClick={onClose} className="absolute top-12 left-12 w-12 h-12 border border-white/20 rounded-full flex items-center justify-center hover:bg-[#FFE135] hover:text-black transition-colors">
        <div className="w-6 h-6 rotate-180"><PSIcons.Triangle /></div>
      </button>

      <div className="w-full md:w-1/2 h-full bg-white/5 backdrop-blur-xl p-20 flex flex-col justify-center gap-12 overflow-y-auto">
        <div className="space-y-4">
          <span className="mono text-[10px] tracking-[0.4em] text-white/40 uppercase">Communications / Feed</span>
          <h2 className="text-6xl sst-bold leading-none uppercase">Nexus Feed</h2>
        </div>

        <div className="space-y-8">
          {newsItems.map((item, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: i * 0.1 }}
              className="group cursor-pointer border-b border-white/10 pb-8 flex justify-between items-end"
            >
              <div className="space-y-2">
                <span className="mono text-[9px] text-[#FFE135] font-bold tracking-widest">{item.tag} // {item.date}</span>
                <h3 className="text-2xl sst-bold group-hover:translate-x-4 transition-transform uppercase">{item.title}</h3>
              </div>
              <div className="w-8 h-8 opacity-20 group-hover:opacity-100 group-hover:text-[#FFE135] transition-all">
                <PSIcons.Cross />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default NewsOverlay;
