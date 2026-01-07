
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import { motion, AnimatePresence } from 'framer-motion';
import { Product } from '../types';
import { PSIcons } from '../constants';

interface GeminiAssistantProps {
  activeProduct: Product;
}

const GeminiAssistant: React.FC<GeminiAssistantProps> = ({ activeProduct }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<{role: 'user' | 'ai', text: string}[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleAsk = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || isLoading) return;

    const userMessage = query;
    setQuery('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      // Initialize ai instance with process.env.API_KEY as per the rules
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `User is viewing: ${activeProduct.name} (${activeProduct.category}). 
                  Features: ${activeProduct.features.join(', ')}. 
                  Specs: ${JSON.stringify(activeProduct.specs)}.
                  User question: ${userMessage}`,
        config: {
          systemInstruction: "You are an elite PlayStation Product Expert. Be concise, cinematic, and professional. Use terms like 'next-gen immersion' and 'play has no limits'. Help the user understand the benefits of the PS5 hardware ecosystem. Keep answers under 3 sentences.",
          temperature: 0.7,
        }
      });

      setMessages(prev => [...prev, { role: 'ai', text: response.text || "I'm having trouble connecting to the network right now." }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'ai', text: "Systems offline. Please check your network connection." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[60]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="mb-4 w-80 md:w-96 bg-black/80 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[500px]"
          >
            <div className="p-4 border-b border-white/10 flex justify-between items-center bg-white/5">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                <span className="sst-bold text-[10px] tracking-widest uppercase">Nexus AI Assistant</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="opacity-40 hover:opacity-100">
                <div className="w-4 h-4"><PSIcons.Cross /></div>
              </button>
            </div>

            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 text-sm sst-roman">
              {messages.length === 0 && (
                <div className="text-white/40 text-center py-10 px-4">
                  <div className="w-8 h-8 mx-auto mb-4 text-white/10"><PSIcons.Circle /></div>
                  Welcome to the PS5 Dimension. Ask me anything about the {activeProduct.name}.
                </div>
              )}
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] px-4 py-2 rounded-xl ${
                    msg.role === 'user' 
                      ? 'bg-white/10 text-white' 
                      : 'bg-accent/10 border border-accent/20 text-accent'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/5 px-4 py-2 rounded-xl animate-pulse text-white/40">Nexus is processing...</div>
                </div>
              )}
            </div>

            <form onSubmit={handleAsk} className="p-4 border-t border-white/10 bg-black/40">
              <div className="relative">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Ask about specs, compatibility..."
                  className="w-full bg-white/5 border border-white/10 rounded-full px-4 py-2 text-xs focus:outline-none focus:border-accent/50 transition-colors"
                />
                <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 text-accent">
                   <div className="w-4 h-4 rotate-45"><PSIcons.Triangle /></div>
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-white text-black rounded-full shadow-xl flex items-center justify-center group relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
        <div className="relative z-10 w-8 h-8 text-black group-hover:rotate-90 transition-transform duration-500">
          <PSIcons.Circle />
        </div>
      </motion.button>
    </div>
  );
};

export default GeminiAssistant;
