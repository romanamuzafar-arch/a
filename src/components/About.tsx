import React, { useState } from 'react';
import { Target, Eye, Compass, UserCheck, ArrowRight, BookOpen, CheckCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { schoolConfig } from '../config/schoolConfig';

interface AboutProps {
  onOpenAdmissionModal: () => void;
}

export const About: React.FC<AboutProps> = ({ onOpenAdmissionModal }) => {
  const [showExtendedHistory, setShowExtendedHistory] = useState(false);

  return (
    <section id="about" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-amber-700 bg-amber-50 inline-block px-3 py-1 rounded-full border border-amber-200 mb-3">
            About Our Institution
          </p>
          <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0f244a] tracking-tight">
            Committed to Educational Excellence & Moral Character
          </h2>
          <p className="mt-4 text-slate-600 text-base sm:text-lg">
            Achievers Grammar School & Academy in Lahore is founded on the belief that every young mind has unique potential waiting to be ignited through thoughtful mentorship, conceptual mastery, and positive discipline.
          </p>
        </div>

        {/* 2-Column Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          
          {/* Image Column */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-200">
              <img
                src="/images/school-library-hall.jpg"
                alt="Students studying in library hall at Achievers Grammar School"
                className="w-full h-[400px] object-cover"
                referrerPolicy="no-referrer"
                loading="lazy"
                onError={(e) => {
                  const target = e.currentTarget as HTMLImageElement;
                  if (!target.dataset.triedFallback) {
                    target.dataset.triedFallback = 'true';
                    target.src = '/images/school-library-hall.jpg';
                  }
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f244a]/85 via-transparent to-transparent flex items-end p-6">
                <div className="text-white">
                  <p className="text-xs uppercase tracking-widest text-amber-400 font-bold mb-1">
                    Student-Focused Pedagogy
                  </p>
                  <p className="text-lg font-bold leading-snug">
                    Cultivating a lifelong passion for inquiry, intellectual curiosity, and responsible citizenship.
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Experience Badge */}
            <div className="absolute -bottom-6 -right-6 hidden sm:flex items-center gap-3 bg-[#0f244a] text-white p-4 rounded-xl shadow-xl border-2 border-amber-400 max-w-xs">
              <div className="p-2 bg-amber-500 rounded-lg text-slate-950 font-bold text-xl">
                ★
              </div>
              <div className="text-xs">
                <p className="font-extrabold text-amber-300">Holistic Curriculum</p>
                <p className="text-slate-300">Montessori to Matriculation & Evening Academy in Lahore</p>
              </div>
            </div>
          </div>

          {/* Text Narrative Column */}
          <div className="lg:col-span-6 space-y-6">
            <h3 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#0f244a]">
              A Place Where Curiosity Meets Rigor
            </h3>
            
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
              At Achievers Grammar School & Academy, we provide students with an enriching environment that bridges modern scientific knowledge with enduring ethical grounding. Our dedicated faculty members guide students through individualized attention, interactive discussions, and regular diagnostic assessments.
            </p>

            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
              Whether preparing our youngest learners in Montessori with sensorial tools or mentoring high school students to achieve top grades in Lahore Board examinations, our methodology emphasizes deep conceptual clarity rather than mechanical memorization.
            </p>

            {/* Core Values Bullets */}
            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <p className="text-sm text-slate-700">
                  <strong className="text-slate-900">Conceptual Depth:</strong> Active learning models that encourage asking questions, solving problems, and real-world application.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <p className="text-sm text-slate-700">
                  <strong className="text-slate-900">Character & Moral Values:</strong> Instilling integrity, kindness, discipline, and respect for community and Islamic teachings.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <p className="text-sm text-slate-700">
                  <strong className="text-slate-900">Dual Academic Model:</strong> Comprehensive morning school curriculum combined with specialized evening academy test series.
                </p>
              </div>
            </div>

            {/* Action Row */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => setShowExtendedHistory(!showExtendedHistory)}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-[#0f244a] bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
              >
                <span>{showExtendedHistory ? 'Hide Campus Background' : 'Learn More & School History'}</span>
                {showExtendedHistory ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>

              <button
                type="button"
                onClick={onOpenAdmissionModal}
                className="inline-flex items-center gap-2 text-sm font-bold text-blue-900 hover:text-blue-700 transition-colors"
              >
                <span>Request Prospectus</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>

        {/* Collapsible Campus History & Administrative Background Placeholder */}
        {showExtendedHistory && (
          <div className="mb-16 p-6 sm:p-8 bg-slate-50 border border-slate-200 rounded-2xl animate-fadeIn">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-200">
              <h4 className="text-lg font-bold text-[#0f244a]">
                Institutional Background & History Details
              </h4>
              <span className="text-xs bg-amber-100 text-amber-800 px-2.5 py-1 rounded font-semibold">
                Editable Placeholder
              </span>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed mb-4">
              Achievers Grammar School & Academy was established in Lahore, Pakistan to address the growing demand for quality, accessible, and values-oriented schooling. Over the years, the institution has continually upgraded its science and computer laboratories, expanded modern early childhood Montessori wings, and formulated a structured evening coaching academy to support board examination candidates.
            </p>
            <p className="text-xs text-slate-500 italic bg-white p-3 rounded-lg border border-slate-200">
              <strong>Administrative Note:</strong> Specific foundation year, registered trust affiliations, and board registration codes can be edited directly in <code className="text-blue-800 font-mono">src/config/schoolConfig.ts</code> by school management.
            </p>
          </div>
        )}

        {/* Mission, Vision, and Philosophy Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Mission Card */}
          <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200 hover:border-blue-400 hover:shadow-lg transition-all group">
            <div className="w-12 h-12 rounded-xl bg-[#0f244a] text-amber-400 flex items-center justify-center mb-6 shadow-sm group-hover:scale-105 transition-transform">
              <Target className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-bold text-[#0f244a] mb-3">
              Our Mission
            </h4>
            <p className="text-slate-600 text-sm leading-relaxed">
              To nurture academically proficient, morally conscious, and critical-thinking young individuals who can adapt confidently to future global challenges while upholding cultural and Islamic ethics.
            </p>
          </div>

          {/* Vision Card */}
          <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200 hover:border-blue-400 hover:shadow-lg transition-all group">
            <div className="w-12 h-12 rounded-xl bg-blue-700 text-white flex items-center justify-center mb-6 shadow-sm group-hover:scale-105 transition-transform">
              <Eye className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-bold text-[#0f244a] mb-3">
              Our Vision
            </h4>
            <p className="text-slate-600 text-sm leading-relaxed">
              To be recognized among the premier educational institutions in Lahore, renowned for conceptual learning, character building, academic distinction, and dedicated parent-school collaboration.
            </p>
          </div>

          {/* Educational Philosophy Card */}
          <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200 hover:border-blue-400 hover:shadow-lg transition-all group">
            <div className="w-12 h-12 rounded-xl bg-amber-500 text-[#0f244a] flex items-center justify-center mb-6 shadow-sm group-hover:scale-105 transition-transform">
              <Compass className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-bold text-[#0f244a] mb-3">
              Our Philosophy
            </h4>
            <p className="text-slate-600 text-sm leading-relaxed">
              Education is not mere cramming; it is the ignition of an inquisitive spirit. We believe in positive reinforcement, practical application, mutual respect, and holistic student well-being.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
