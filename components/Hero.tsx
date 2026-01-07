
import React from 'react';
import { motion, useTransform, MotionValue } from 'framer-motion';
import { PSIcons } from '../constants';

interface HeroProps {
  isVisible: boolean;
  scrollProgress: MotionValue<number>;
}

const Hero: React.FC<HeroProps> = ({ isVisible, scrollProgress }) => {
  if (!isVisible) return null;

  // Parallax layers
  const yLayer1 = useTransform(scrollProgress, [0, 0.5], [0, -150]);
  const yLayer2 = useTransform(scrollProgress, [0, 0.5], [0, -350]);
  const yLayer3 = useTransform(scrollProgress, [0, 0.5], [0, -600]);
  const opacity = useTransform(scrollProgress, [0, 0.3], [1, 0]);
  const scale = useTransform(scrollProgress, [0, 0.3], [1, 0.9]);

  return (
    <div className="relative w-full h-full flex items-start justify-center">
      {/* Parallax Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        
        {/* Layer 1: Distant Blurred Shapes */}
        <motion.div style={{ y: yLayer1, opacity }} className="absolute top-[10%] left-[10%] w-64 h-64 text-black/[0.05] blur-xl">
          <PSIcons.Circle />
        </motion.div>
        <motion.div style={{ y: yLayer1, opacity }} className="absolute bottom-[30%] right-[10%] w-96 h-96 text-black/[0.05] blur-2xl">
          <PSIcons.Triangle />
        </motion.div>

        {/* Layer 2: Midground Sharp Icons */}
        <motion.div style={{ y: yLayer2, opacity }} className="absolute top-[5%] right-[25%] w-24 h-24 text-black/[0.08]">
          <PSIcons.Square />
        </motion.div>
        <motion.div style={{ y: yLayer2, opacity }} className="absolute bottom-[40%] left-[15%] w-32 h-32 text-black/[0.08] rotate-12">
          <PSIcons.Cross />
        </motion.div>

        {/* Layer 3: Foreground Dynamic Elements */}
        <motion.div style={{ y: yLayer3, opacity }} className="absolute top-[30%] left-[5%] w-12 h-12 text-[#FF6B00]/40">
          <PSIcons.Triangle />
        </motion.div>
        <motion.div style={{ y: yLayer3, opacity }} className="absolute bottom-[20%] right-[30%] w-16 h-16 text-[#FF6B00]/40 rotate-45">
          <PSIcons.Circle />
        </motion.div>
      </div>

      {/* Main Hero Content */}
      <motion.div 
        style={{ opacity, scale }}
        className="relative z-10 text-center space-y-8"
      >
        <div className="flex flex-col items-center">
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mono text-[10px] tracking-[0.8em] text-black/40 uppercase mb-4"
          >
            A Portal To Infinity
          </motion.div>
          <motion.h1 
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-[12vw] sst-bold leading-none tracking-tighter"
          >
            NEXT GEN
          </motion.h1>
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-8 flex flex-col items-center gap-4"
          >
            <div className="w-[1px] h-20 bg-gradient-to-b from-black/40 to-transparent" />
            <span className="mono text-[9px] tracking-[0.4em] text-black/60 uppercase">Scroll to Explore</span>
          </motion.div>
        </div>
      </motion.div>

      {/* Background Glow */}
      <motion.div 
        style={{ opacity }}
        className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#F4F4F4] z-20 pointer-events-none" 
      />
    </div>
  );
};

export default Hero;
