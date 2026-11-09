import React from 'react';
import { Star, Quote } from 'lucide-react';
import { schoolConfig } from '../config/schoolConfig';

export const Testimonials: React.FC = () => {
  return (
    <section className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-blue-900 bg-blue-100/70 inline-block px-3 py-1 rounded-full border border-blue-200 mb-3">
            Parent Feedback & Trust
          </p>
          <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0f244a] tracking-tight">
            What Parents Say About Us
          </h2>
          <p className="mt-4 text-slate-600 text-base sm:text-lg">
            Hear reflections on our conceptual teaching, disciplined classroom environment, and communicative staff.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {schoolConfig.testimonials.map((item) => (
            <div
              key={item.id}
              className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between relative group"
            >
              <div>
                {/* Quote Icon */}
                <div className="text-amber-500 mb-4 opacity-80">
                  <Quote className="w-8 h-8" />
                </div>

                {/* Stars */}
                <div className="flex items-center gap-1 mb-4 text-amber-400">
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>

                {/* Comment */}
                <p className="text-slate-700 text-sm sm:text-base leading-relaxed italic mb-6">
                  "{item.comment}"
                </p>
              </div>

              {/* Attribution */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-[#0f244a]">
                    {item.parentName}
                  </h4>
                  <p className="text-xs text-slate-500">
                    {item.relation} · {item.studentGrade}
                  </p>
                </div>
                <span className="text-[11px] font-semibold text-slate-400">
                  Session {item.year}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Transparent Placeholder Notice */}
        <div className="mt-12 text-center max-w-xl mx-auto p-4 rounded-xl bg-white border border-slate-200 text-xs text-slate-500">
          <strong>Content Transparency:</strong> Testimonials above are structured illustrative demo placeholders. School leadership can effortlessly replace them with authenticated parent reviews inside <code className="text-blue-800 font-mono">src/config/schoolConfig.ts</code>.
        </div>

      </div>
    </section>
  );
};
