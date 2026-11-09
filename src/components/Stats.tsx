import React from 'react';
import { Users, GraduationCap, BookOpen, Heart } from 'lucide-react';
import { schoolConfig } from '../config/schoolConfig';

export const Stats: React.FC = () => {
  const getStatIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Users className="w-6 h-6 text-amber-400" />;
      case 1:
        return <Heart className="w-6 h-6 text-rose-400" />;
      case 2:
        return <BookOpen className="w-6 h-6 text-blue-400" />;
      case 3:
      default:
        return <GraduationCap className="w-6 h-6 text-emerald-400" />;
    }
  };

  return (
    <section className="py-16 bg-[#0f244a] text-white relative overflow-hidden border-y border-blue-950">
      
      {/* Subtle Pattern Backdrops */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Intro */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-xs uppercase tracking-widest text-amber-400 font-bold mb-2">
            Institutional Benchmarks
          </p>
          <h3 className="font-serif-display text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Excellence in Numbers & Commitment
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 mt-2">
            Figures representative of our dedicated instructional capacity and standard operating ratios.
          </p>
        </div>

        {/* 4-Stat Column Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {schoolConfig.statistics.map((stat, idx) => (
            <div
              key={idx}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 hover:border-amber-400/40 transition-all duration-300 group"
            >
              <div className="w-12 h-12 mx-auto rounded-xl bg-white/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                {getStatIcon(idx)}
              </div>
              <div className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-amber-400 tracking-tight mb-1 tabular-nums">
                {stat.value}
              </div>
              <p className="text-sm sm:text-base font-bold text-white mb-1">
                {stat.label}
              </p>
              <p className="text-xs text-slate-300">
                {stat.description}
              </p>
            </div>
          ))}
        </div>

        {/* Administrative Accuracy Note */}
        <div className="mt-8 text-center">
          <p className="text-[11px] text-slate-400">
            *Verified administrative placeholders. Exact figures are routinely calibrated in school records.
          </p>
        </div>

      </div>
    </section>
  );
};
