
import React from 'react';
import { motion } from 'framer-motion';
import { PSIcons } from '../../constants';

const FeaturesOverlay: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }} 
      animate={{ opacity: 1, scale: 1 }} 
      exit={{ opacity: 0, scale: 1.05 }}
      className="fixed inset-0 z-[110] bg-[#F4F4F4] p-12 overflow-y-auto"
    >
      <div className="max-w-6xl mx-auto space-y-20">
        <div className="flex justify-between items-end">
          <div className="space-y-4">
            <span className="mono text-[10px] tracking-[0.4em] text-black/40 uppercase">Technical Deep Dive</span>
            <h2 className="text-8xl sst-bold leading-none">SYSTEM ARCHITECTURE.</h2>
          </div>
          <button onClick={onClose} className="w-16 h-16 bg-black text-white rounded-2xl flex items-center justify-center hover:bg-[#FFE135] hover:text-black transition-colors shadow-2xl">
            <div className="w-8 h-8"><PSIcons.Cross /></div>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: PSIcons.Triangle, title: 'RAY TRACING', desc: 'Immerse yourself in worlds with a new level of realism as rays of light are individually simulated, creating true-to-life shadows and reflections.' },
            { icon: PSIcons.Circle, title: 'PSSR AI', desc: 'PlayStation Spectral Super Resolution (PSSR) uses AI-driven technology to reconstruct image clarity for razor-sharp detail.' },
            { icon: PSIcons.Cross, title: 'TEMPEST 3D', desc: 'From the roar of a crowd to the whisper of a breeze, experience sound that feels like it’s coming from every direction.' },
            { icon: PSIcons.Square, title: 'HAPTIC FEEDBACK', desc: 'Feel the impact of every action in-game with dual actuators which replace traditional rumble motors.' },
            { icon: PSIcons.Triangle, title: 'ADAPTIVE TRIGGERS', desc: 'Experience varying levels of force and tension as you interact with your in-game gear and environments.' },
            { icon: PSIcons.Circle, title: 'SSD THROUGHPUT', desc: 'Integrated I/O allows developers to pull data from the SSD so quickly that they can design games in ways never before possible.' }
          ].map((feat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-10 rounded-[3rem] shadow-xl hover:shadow-2xl transition-all border border-black/5 group"
            >
              <div className="w-12 h-12 text-[#FFE135] mb-8 group-hover:scale-110 transition-transform">
                <feat.icon />
              </div>
              <h4 className="sst-bold text-2xl mb-4">{feat.title}</h4>
              <p className="mono text-[11px] text-black/40 leading-relaxed uppercase">{feat.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default FeaturesOverlay;
