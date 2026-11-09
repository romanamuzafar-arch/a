import React from 'react';
import { HeartHandshake, Brain, ShieldCheck, Users, Trophy, Sparkles } from 'lucide-react';
import { schoolConfig } from '../config/schoolConfig';

export const WhyChooseUs: React.FC = () => {
  // Mapping icons to string names in config
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'HeartHandshake':
        return <HeartHandshake className="w-6 h-6 text-amber-500" />;
      case 'Brain':
        return <Brain className="w-6 h-6 text-blue-600" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-6 h-6 text-emerald-600" />;
      case 'Users':
        return <Users className="w-6 h-6 text-indigo-600" />;
      case 'Trophy':
        return <Trophy className="w-6 h-6 text-amber-600" />;
      case 'Sparkles':
      default:
        return <Sparkles className="w-6 h-6 text-amber-500" />;
    }
  };

  return (
    <section className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-amber-700 bg-amber-50 inline-block px-3 py-1 rounded-full border border-amber-200 mb-3">
            Institutional Strengths
          </p>
          <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0f244a] tracking-tight">
            Why Choose Achievers Grammar School?
          </h2>
          <p className="mt-4 text-slate-600 text-base sm:text-lg">
            We provide a balanced ecosystem where high academic standards meet warm, values-driven mentorship to build confidence in every student.
          </p>
        </div>

        {/* 6-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {schoolConfig.whyChooseUs.map((item, index) => (
            <div
              key={index}
              className="bg-slate-50/80 p-8 rounded-2xl border border-slate-200/90 hover:border-blue-400 hover:bg-white hover:shadow-lg transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center mb-6 shadow-xs group-hover:scale-105 transition-transform">
                {getIcon(item.icon)}
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-[#0f244a] mb-2 group-hover:text-blue-900 transition-colors">
                {item.title}
              </h3>

              <p className="text-slate-600 text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Affirmation Banner */}
        <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#0f244a] via-[#1a386b] to-[#0f244a] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="text-lg sm:text-xl font-bold text-white">
              Looking for Quality Education in Lahore?
            </h4>
            <p className="text-slate-300 text-sm">
              Our campus doors are open for parent visits, diagnostic evaluations, and classroom tours.
            </p>
          </div>
          <a
            href={schoolConfig.getWhatsAppUrl("Assalam-o-Alaikum! I want to schedule a campus visit for Achievers Grammar School & Academy.")}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 px-6 py-3 text-sm font-bold text-[#0f244a] bg-amber-400 hover:bg-amber-300 rounded-xl transition-colors shadow-md"
          >
            Schedule Campus Visit
          </a>
        </div>

      </div>
    </section>
  );
};
