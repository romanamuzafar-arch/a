import React from 'react';
import { Award, BookOpen, GraduationCap } from 'lucide-react';
import { schoolConfig } from '../config/schoolConfig';

export const Faculty: React.FC = () => {
  return (
    <section className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-blue-900 bg-blue-100/70 inline-block px-3 py-1 rounded-full border border-blue-200 mb-3">
            Academic Mentorship
          </p>
          <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0f244a] tracking-tight">
            Our Dedicated Faculty
          </h2>
          <p className="mt-4 text-slate-600 text-base sm:text-lg">
            Experienced pedagogues and subject specialists passionate about conceptual mastery, board exam techniques, and personal character development.
          </p>
        </div>

        {/* Teachers Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {schoolConfig.faculty.map((teacher) => (
            <div
              key={teacher.id}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-blue-400 hover:shadow-xl transition-all duration-300 flex flex-col group"
            >
              {/* Teacher Image */}
              <div className="relative h-60 bg-slate-900 overflow-hidden">
                <img
                  src={teacher.image}
                  alt={teacher.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                
                {/* Floating Experience */}
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white text-xs">
                  <span className="bg-[#0f244a]/90 backdrop-blur-xs px-2 py-0.5 rounded text-[11px] font-semibold border border-white/20">
                    {teacher.experience}
                  </span>
                </div>
              </div>

              {/* Card Details */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-[#0f244a] group-hover:text-blue-800 transition-colors">
                    {teacher.name}
                  </h3>
                  <p className="text-xs font-semibold text-amber-700 uppercase tracking-wider mt-0.5 mb-2">
                    {teacher.subject}
                  </p>
                  
                  <div className="flex items-start gap-1.5 text-xs text-slate-600 mb-3 bg-slate-50 p-2 rounded-lg border border-slate-100">
                    <GraduationCap className="w-3.5 h-3.5 text-blue-700 shrink-0 mt-0.5" />
                    <span>{teacher.qualification}</span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {teacher.bio}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Teacher Section Note */}
        <div className="mt-12 text-center max-w-2xl mx-auto p-4 bg-white rounded-xl border border-slate-200 text-xs text-slate-500">
          <p>
            <strong>Note for School Management:</strong> Staff profiles, designations, and portraits above are structured demo placeholders. School leadership can update real faculty photos, bios, and qualifications in <code className="text-blue-800 font-mono">src/config/schoolConfig.ts</code>.
          </p>
        </div>

      </div>
    </section>
  );
};
