import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { schoolConfig } from '../config/schoolConfig';

export const FloatingWhatsApp: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-end gap-3 select-none">
      
      {/* Interactive Tooltip Bubble */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2 bg-white text-slate-800 text-xs py-2 px-3.5 rounded-2xl shadow-xl border border-slate-200 animate-bounce">
          <div className="flex flex-col">
            <span className="font-bold text-[#0f244a]">Achievers Admissions Desk</span>
            <span className="text-[11px] text-slate-500">Need help? Chat on WhatsApp</span>
          </div>
          <button
            type="button"
            onClick={() => setShowTooltip(false)}
            className="text-slate-400 hover:text-slate-600 p-0.5 rounded transition-colors cursor-pointer"
            aria-label="Dismiss tooltip"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Action Button */}
      <a
        href={schoolConfig.getWhatsAppUrl()}
        target="_blank"
        rel="noopener noreferrer"
        className="relative group w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white flex items-center justify-center shadow-2xl hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-emerald-400/50"
        aria-label="Chat with Achievers Grammar School on WhatsApp"
        title="Chat with Achievers Grammar School on WhatsApp (0321 7540210)"
      >
        {/* Subtle Pulse Ring */}
        <span className="absolute -inset-1 rounded-full bg-emerald-500/30 animate-ping pointer-events-none" />

        <MessageCircle className="w-8 h-8 fill-white text-white drop-shadow-md" />

        {/* Small Online Indicator Dot */}
        <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-emerald-300 border-2 border-white rounded-full" />
      </a>

    </div>
  );
};
