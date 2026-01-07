
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PSIcons } from '../../constants';
import { Product } from '../../types';

interface CheckoutOverlayProps {
  cart: Product[];
  onClose: () => void;
  onClearCart: () => void;
}

const CheckoutOverlay: React.FC<CheckoutOverlayProps> = ({ cart, onClose, onClearCart }) => {
  const [step, setStep] = useState<'cart' | 'details' | 'success'>('cart');
  const [form, setForm] = useState({ name: '', email: '', address: '' });

  const total = cart.reduce((acc, item) => acc + parseFloat(item.price.replace('$', '')), 0);

  const handleFinish = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('success');
    setTimeout(() => {
      onClearCart();
    }, 2000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }} 
      animate={{ opacity: 1, y: 0 }} 
      exit={{ opacity: 0, y: 50 }}
      className="fixed inset-0 z-[120] bg-black/60 backdrop-blur-3xl flex items-center justify-center p-6"
    >
      <div className="bg-white w-full max-w-5xl h-[85vh] rounded-[3rem] shadow-2xl overflow-hidden flex flex-col md:flex-row">
        {/* Left Side: Summary/Image */}
        <div className="md:w-1/3 bg-[#121314] text-white p-12 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10 sst-bold text-9xl">BUY</div>
          <div className="space-y-6 z-10">
            <span className="mono text-[10px] text-[#FFE135] tracking-[0.4em] uppercase">Order Registry</span>
            <h2 className="text-5xl sst-bold leading-none">PROCURE YOUR ARRAY.</h2>
            <div className="space-y-4 pt-12">
               {cart.map((item, i) => (
                 <div key={i} className="flex justify-between items-center text-xs mono">
                   <span className="text-white/40">{item.name}</span>
                   <span>{item.price}</span>
                 </div>
               ))}
               <div className="border-t border-white/10 pt-4 flex justify-between items-center sst-bold text-xl">
                 <span className="text-[#FFE135]">TOTAL</span>
                 <span>${total.toFixed(2)}</span>
               </div>
            </div>
          </div>
          <div className="mono text-[8px] text-white/20 uppercase tracking-[0.4em]">PlayStation Nexus // Secure Portal</div>
        </div>

        {/* Right Side: Flow */}
        <div className="md:w-2/3 p-12 relative flex flex-col">
          <button onClick={onClose} className="absolute top-8 right-8 text-black opacity-20 hover:opacity-100 transition-opacity">
            <div className="w-8 h-8"><PSIcons.Cross /></div>
          </button>

          <AnimatePresence mode="wait">
            {step === 'cart' && (
              <motion.div key="cart" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex-1 flex flex-col gap-12">
                <div className="space-y-4">
                  <h3 className="text-4xl sst-bold uppercase tracking-tight">Review Payload</h3>
                  <p className="mono text-[10px] text-black/40 uppercase">CONFIRM THE ITEMS IN YOUR DISPATCH ARRAY BEFORE PROCEEDING.</p>
                </div>
                {cart.length === 0 ? (
                  <div className="flex-1 flex flex-col items-center justify-center text-black/20 gap-4">
                    <div className="w-16 h-16"><PSIcons.Circle /></div>
                    <span className="mono text-[10px] tracking-widest font-bold">ARRAY_EMPTY</span>
                  </div>
                ) : (
                  <div className="flex-1 overflow-y-auto space-y-4 pr-4">
                    {cart.map((item, i) => (
                      <div key={i} className="bg-black/5 p-6 rounded-2xl flex justify-between items-center">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-black text-white rounded-xl flex items-center justify-center"><PSIcons.Triangle /></div>
                          <span className="sst-bold uppercase">{item.name}</span>
                        </div>
                        <span className="mono font-bold">{item.price}</span>
                      </div>
                    ))}
                  </div>
                )}
                <button 
                  disabled={cart.length === 0}
                  onClick={() => setStep('details')}
                  className="w-full bg-[#121314] text-white p-6 rounded-2xl sst-bold text-xs tracking-widest uppercase hover:bg-[#FFE135] hover:text-black transition-all disabled:opacity-20"
                >
                  Enter Shipping Protocol
                </button>
              </motion.div>
            )}

            {step === 'details' && (
              <motion.div key="details" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex-1 flex flex-col gap-12">
                <div className="space-y-4">
                  <h3 className="text-4xl sst-bold uppercase tracking-tight">Delivery Node</h3>
                  <p className="mono text-[10px] text-black/40 uppercase">INPUT RECIPIENT DATA FOR NEXUS LOGISTICS DISPATCH.</p>
                </div>
                <form onSubmit={handleFinish} className="flex-1 space-y-6">
                  <div className="space-y-2">
                    <label className="mono text-[8px] uppercase tracking-widest text-black/30">Registry Name</label>
                    <input required value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full border-b border-black/10 p-2 mono text-xs focus:outline-none focus:border-[#FFE135] transition-colors" placeholder="ENTER FULL NAME" />
                  </div>
                  <div className="space-y-2">
                    <label className="mono text-[8px] uppercase tracking-widest text-black/30">Comm Link Email</label>
                    <input required type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="w-full border-b border-black/10 p-2 mono text-xs focus:outline-none focus:border-[#FFE135] transition-colors" placeholder="USER@DOMAIN.COM" />
                  </div>
                  <div className="space-y-2">
                    <label className="mono text-[8px] uppercase tracking-widest text-black/30">Deployment Address</label>
                    <textarea required value={form.address} onChange={e => setForm({...form, address: e.target.value})} className="w-full border-b border-black/10 p-2 mono text-xs focus:outline-none focus:border-[#FFE135] transition-colors h-24 resize-none" placeholder="UNIT / STREET / CITY / HUB" />
                  </div>
                  <button type="submit" className="w-full bg-[#FFE135] text-black p-6 rounded-2xl sst-bold text-xs tracking-widest uppercase hover:scale-105 transition-all shadow-xl">
                    Authorize Dispatch
                  </button>
                </form>
              </motion.div>
            )}

            {step === 'success' && (
              <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex-1 flex flex-col items-center justify-center text-center gap-8">
                <motion.div 
                  initial={{ rotate: -90, opacity: 0 }} 
                  animate={{ rotate: 0, opacity: 1 }} 
                  className="w-32 h-32 text-[#FFE135]"
                >
                  <PSIcons.Triangle />
                </motion.div>
                <div className="space-y-4">
                  <h3 className="text-5xl sst-bold uppercase">DISPATCH AUTHORIZED.</h3>
                  <p className="mono text-xs text-black/40 uppercase max-w-sm">YOUR ARRAY HAS BEEN REGISTERED. MONITOR YOUR COMM LINK FOR DEPLOYMENT UPDATES.</p>
                </div>
                <button onClick={onClose} className="mono text-[10px] font-bold border-b-2 border-black pb-1 hover:text-[#FFE135] hover:border-[#FFE135] transition-all">
                  RETURN TO NEXUS
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default CheckoutOverlay;
