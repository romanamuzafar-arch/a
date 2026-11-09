import React from 'react';
import { ArrowRight, MessageCircle, ShieldCheck, Award, Sparkles, BookOpen, CheckCircle2 } from 'lucide-react';
import { schoolConfig } from '../config/schoolConfig';

interface HeroProps {
  onOpenAdmissionModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenAdmissionModal }) => {
  return (
    <section id="home" className="relative bg-gradient-to-b from-slate-50 via-white to-slate-50/80 overflow-hidden pt-6 pb-16 lg:py-20 border-b border-slate-200">
      
      {/* Subtle Background Geometric Accents */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-blue-100/40 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-amber-100/30 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Text & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6">
            
            {/* Small Label Kicker */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-900 text-xs sm:text-sm font-bold tracking-wide">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>WELCOME TO ACHIEVERS GRAMMAR SCHOOL & ACADEMY</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#0f244a] leading-[1.15]">
              Inspiring Young Minds, <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0f244a] via-[#1d4ed8] to-[#0f244a]">
                Building Brighter Futures
              </span>
            </h1>

            {/* Supporting Paragraph */}
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl font-normal">
              Providing holistic education with a proven commitment to conceptual clarity, moral character building, and academic excellence in Lahore, Pakistan. From foundational Montessori years to Matriculation and evening academy coaching, we equip students with the knowledge and confidence to lead.
            </p>

            {/* Key Value Prop Checkmarks */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 text-sm font-medium text-slate-700 w-full max-w-xl">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Montessori to Matriculation (Morning)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Specialized Evening Academy & Test Sessions</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Experienced Faculty & Personalized Guidance</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Modern Science, Computer Labs & Library</span>
              </div>
            </div>

            {/* Action Buttons Row */}
            <div className="pt-3 flex flex-wrap items-center gap-3 sm:gap-4 w-full">
              <a
                href="#academics"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm sm:text-base font-bold text-white bg-[#0f244a] hover:bg-[#183669] rounded-xl shadow-lg shadow-blue-950/20 transition-all cursor-pointer group"
              >
                <span>Explore Our School</span>
                <ArrowRight className="w-4 h-4 text-amber-400 group-hover:translate-x-1 transition-transform" />
              </a>

              <button
                type="button"
                onClick={onOpenAdmissionModal}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm sm:text-base font-bold text-[#0f244a] bg-amber-400 hover:bg-amber-300 rounded-xl shadow-md shadow-amber-500/20 transition-all cursor-pointer"
              >
                <span>Admission Enquiry</span>
                <BookOpen className="w-4 h-4 text-[#0f244a]" />
              </button>

              <a
                href={schoolConfig.getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm sm:text-base font-bold text-emerald-900 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 rounded-xl transition-all shadow-xs"
                title="Direct WhatsApp chat with admissions staff"
              >
                <MessageCircle className="w-5 h-5 text-emerald-600" />
                <span>WhatsApp: {schoolConfig.contact.whatsappNumber}</span>
              </a>
            </div>

            {/* Location & Trust markers */}
            <div className="pt-2 text-xs text-slate-500 flex flex-wrap items-center gap-2">
              <span className="font-semibold text-slate-700">Campus Location:</span>
              <span>Lahore, Punjab, Pakistan</span>
              <span aria-hidden="true">·</span>
              <span>Morning Shift: 7:30 AM – 2:00 PM</span>
              <span aria-hidden="true">·</span>
              <span>Academy Shift: 3:30 PM – 7:30 PM</span>
            </div>

          </div>

          {/* Right Column: Hero Educational Image & Badges */}
          <div className="lg:col-span-5 relative">
            
            {/* Visual Frame Container */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-slate-900 group">
              
              {/* Main Image */}
              <img
                src="/src/assets/images/hero_school_campus_learning_1794229427042.jpg"
                alt="Interactive classroom environment at Achievers Grammar School & Academy"
                className="w-full h-[380px] sm:h-[460px] lg:h-[490px] object-cover object-center group-hover:scale-102 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />

              {/* Gradient Scrim for Contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f244a]/90 via-[#0f244a]/30 to-transparent pointer-events-none" />

              {/* Bottom Card Overlay */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-white/95 backdrop-blur-md border border-white/40 shadow-lg">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#0f244a] text-amber-400 flex items-center justify-center shrink-0">
                      <Award className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-amber-700">
                        Academic Distinction
                      </p>
                      <p className="text-sm font-extrabold text-[#0f244a]">
                        Excellence in Conceptual Education
                      </p>
                    </div>
                  </div>
                  <span className="text-[11px] font-semibold text-slate-500 hidden sm:inline">
                    Lahore Campus
                  </span>
                </div>
              </div>

              {/* Top Floating Badge */}
              <div className="absolute top-4 right-4 bg-[#0f244a]/90 text-white backdrop-blur-sm px-3.5 py-1.5 rounded-lg text-xs font-bold border border-white/20 flex items-center gap-1.5 shadow-md">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Admissions Open 2026–27</span>
              </div>
            </div>

            {/* Educational Disclaimer Label */}
            <p className="text-[11px] text-slate-400 mt-2 text-center italic">
              *Royalty-free educational sample photography shown for demo purposes. Official campus photos can be integrated directly.
            </p>

          </div>

        </div>
      </div>
    </section>
  );
};
