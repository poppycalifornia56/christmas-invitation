'use client';

import { useState } from 'react';
import { Copy, Sparkles, Send, CheckCircle2, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function GeneratorPage() {
  const [guestName, setGuestName] = useState('');
  const [generatedLink, setGeneratedLink] = useState('');
  const [copied, setCopied] = useState(false);

  const handleGenerate = () => {
    if (!guestName.trim()) return;
    const baseUrl = window.location.origin;
    const link = `${baseUrl}/invite/${encodeURIComponent(guestName.trim())}`;
    setGeneratedLink(link);
    setCopied(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareToWhatsApp = () => {
    const text = `🎄 Hi ${guestName}! I've created a special Christmas invitation for you. Open it here: ${generatedLink}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#051a15] flex flex-col items-center justify-center p-6 relative overflow-hidden font-body">
      <div className="bg-noise"></div>

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#0f4c3a] via-[#051a15] to-black opacity-80"></div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full relative z-10"
      >
        <div className="backdrop-blur-xl bg-black/40 border border-white/10 p-8 rounded-3xl shadow-2xl relative overflow-hidden group">
          
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent opacity-50 blur-sm"></div>

          <div className="text-center mb-8">
            <motion.div 
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/20 text-[#d4af37] text-[10px] font-bold tracking-[0.2em] uppercase mb-4"
            >
              {/* <Sparkles size={10} /> */}
              GMS Frankfurt
            </motion.div>
            <h1 className="font-christmas text-5xl text-white mb-2">Guest List</h1>
            {/* <p className="text-white/40 text-sm">Create a personalized digital experience.</p> */}
          </div>

          <div className="space-y-4">
            <div className="relative">
              <input
                type="text"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                placeholder="Enter Guest Name"
                className="w-full bg-white/5 text-white placeholder-white/20 border border-white/10 rounded-2xl px-6 py-5 focus:outline-none focus:bg-white/10 focus:border-[#d4af37]/50 transition-all text-center text-xl font-serif"
                onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleGenerate}
              disabled={!guestName}
              className="w-full bg-[#d4af37] hover:bg-[#c5a028] text-[#051a15] py-5 rounded-2xl font-bold transition-all shadow-lg shadow-[#d4af37]/20 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>Generate Invitation</span>
              <ArrowRight size={18} />
            </motion.button>
          </div>

          <AnimatePresence>
            {generatedLink && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="mt-8 pt-6 border-t border-white/10 space-y-3">
                  <div className="p-4 bg-black/50 rounded-xl border border-white/5 flex items-center justify-between">
                     <p className="text-white/60 text-xs truncate mr-4">{generatedLink}</p>
                     <button onClick={copyToClipboard} className="text-[#d4af37] hover:text-white transition-colors">
                        {copied ? <CheckCircle2 size={18} /> : <Copy size={18} />}
                     </button>
                  </div>
                  
                  <button 
                    onClick={shareToWhatsApp}
                    className="w-full bg-[#25D366]/90 hover:bg-[#25D366] text-white py-4 rounded-xl font-bold text-sm tracking-wide uppercase flex items-center justify-center gap-2 transition-all"
                  >
                    <Send size={16} />
                    Send via WhatsApp
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}