import React, { useState } from 'react';
import { BookOpen, Check, ArrowRight, X, Clock, Sparkles } from 'lucide-react';
import { schoolConfig, AcademicProgram } from '../config/schoolConfig';

interface AcademicsProps {
  onSelectProgramForAdmission: (programTitle: string) => void;
}

export const Academics: React.FC<AcademicsProps> = ({ onSelectProgramForAdmission }) => {
  const [selectedProgram, setSelectedProgram] = useState<AcademicProgram | null>(null);

  return (
    <section id="academics" className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-blue-900 bg-blue-100/70 inline-block px-3 py-1 rounded-full border border-blue-200 mb-3">
            Comprehensive Curriculum
          </p>
          <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0f244a] tracking-tight">
            Academic Programs for Every Learning Stage
          </h2>
          <p className="mt-4 text-slate-600 text-base sm:text-lg">
            Structured educational pathways tailored to cultivate cognitive ability, moral resilience, and competitive excellence from early childhood through secondary board levels.
          </p>
        </div>

        {/* Academic Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {schoolConfig.programs.map((program) => (
            <div
              key={program.id}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-blue-500 hover:shadow-xl transition-all duration-300 flex flex-col group"
            >
              {/* Program Card Image with Category Tag */}
              <div className="relative h-56 overflow-hidden bg-slate-900">
                <img
                  src={program.image}
                  alt={program.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent pointer-events-none" />
                
                {/* Floating Grade Span Badge */}
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white text-xs font-semibold">
                  <span className="bg-[#0f244a]/90 backdrop-blur-xs px-2.5 py-1 rounded border border-white/20">
                    {program.category}
                  </span>
                  <span className="text-amber-300 flex items-center gap-1 font-bold">
                    <Clock className="w-3.5 h-3.5" />
                    {program.timing}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
                      {program.gradeSpan}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-[#0f244a] mb-2 group-hover:text-blue-800 transition-colors">
                    {program.title}
                  </h3>

                  <p className="text-slate-600 text-sm line-clamp-3 mb-4 leading-relaxed">
                    {program.description}
                  </p>

                  {/* Program Highlights */}
                  <div className="space-y-2 mb-6 pt-3 border-t border-slate-100">
                    {program.keyFeatures.slice(0, 3).map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card CTA Actions */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedProgram(program)}
                    className="text-xs sm:text-sm font-bold text-blue-900 hover:text-blue-700 flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>View Curriculum</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => onSelectProgramForAdmission(program.title)}
                    className="px-3 py-1.5 text-xs font-bold text-white bg-[#0f244a] hover:bg-[#183669] rounded-lg transition-colors cursor-pointer shadow-xs"
                  >
                    Enquire Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Informative Note on Customization */}
        <div className="mt-12 text-center">
          <p className="text-xs text-slate-500">
            *All academic levels, timings, and curriculum details are fully editable in <code className="text-blue-800 font-mono">src/config/schoolConfig.ts</code>.
          </p>
        </div>

      </div>

      {/* Program Detail Modal */}
      {selectedProgram && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200">
            
            {/* Modal Header Image */}
            <div className="relative h-56 bg-slate-900">
              <img
                src={selectedProgram.image}
                alt={selectedProgram.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f244a] via-black/40 to-transparent" />
              
              <button
                type="button"
                onClick={() => setSelectedProgram(null)}
                className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 left-6 right-6 text-white">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-300 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-600/50">
                  {selectedProgram.category}
                </span>
                <h3 className="text-2xl font-bold mt-1 text-white">
                  {selectedProgram.title}
                </h3>
                <p className="text-xs text-slate-200">
                  {selectedProgram.gradeSpan} · Timing: {selectedProgram.timing}
                </p>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 sm:p-8 space-y-6">
              <div>
                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">
                  Program Overview
                </h4>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {selectedProgram.description}
                </p>
              </div>

              <div>
                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">
                  Key Instructional Strengths
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {selectedProgram.keyFeatures.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedProgram(null)}
                  className="w-full sm:w-auto px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const title = selectedProgram.title;
                    setSelectedProgram(null);
                    onSelectProgramForAdmission(title);
                  }}
                  className="w-full sm:w-auto px-6 py-2.5 text-sm font-bold text-white bg-[#0f244a] hover:bg-[#183669] rounded-lg transition-colors cursor-pointer shadow-md"
                >
                  Apply for this Class
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
