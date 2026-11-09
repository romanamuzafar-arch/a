import React from 'react';
import { Presentation, FlaskConical, BookOpen, Monitor, Smile, Activity, Check } from 'lucide-react';
import { schoolConfig } from '../config/schoolConfig';

export const Facilities: React.FC = () => {
  const getFacilityIcon = (iconName: string) => {
    switch (iconName) {
      case 'Presentation':
        return <Presentation className="w-5 h-5 text-blue-600" />;
      case 'FlaskConical':
        return <FlaskConical className="w-5 h-5 text-emerald-600" />;
      case 'BookOpen':
        return <BookOpen className="w-5 h-5 text-amber-600" />;
      case 'Monitor':
        return <Monitor className="w-5 h-5 text-indigo-600" />;
      case 'Smile':
        return <Smile className="w-5 h-5 text-rose-600" />;
      case 'Activity':
      default:
        return <Activity className="w-5 h-5 text-cyan-600" />;
    }
  };

  return (
    <section id="facilities" className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-blue-900 bg-blue-100/70 inline-block px-3 py-1 rounded-full border border-blue-200 mb-3">
            Campus Infrastructure
          </p>
          <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0f244a] tracking-tight">
            Our Learning Facilities
          </h2>
          <p className="mt-4 text-slate-600 text-base sm:text-lg">
            Purpose-built spaces supporting mental development, practical science demonstrations, digital literacy, and healthy physical recreation.
          </p>
        </div>

        {/* Facilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {schoolConfig.facilities.map((fac) => (
            <div
              key={fac.id}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-blue-400 hover:shadow-xl transition-all duration-300 flex flex-col group"
            >
              {/* Facility Image */}
              <div className="relative h-52 overflow-hidden bg-slate-900">
                <img
                  src={fac.image}
                  alt={`${fac.title} - Achievers Grammar School campus facility`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = '/images/hero-school-campus.jpg';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
                
                {/* Floating Icon */}
                <div className="absolute bottom-3 left-4 w-9 h-9 rounded-lg bg-white/95 backdrop-blur-xs flex items-center justify-center shadow-md">
                  {getFacilityIcon(fac.iconName)}
                </div>
              </div>

              {/* Facility Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-[#0f244a] mb-2 group-hover:text-blue-800 transition-colors">
                    {fac.title}
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4">
                    {fac.description}
                  </p>
                </div>

                {/* Features List */}
                <div className="pt-3 border-t border-slate-100 space-y-1.5">
                  {fac.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-slate-600">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Administrative Note */}
        <div className="mt-12 text-center text-xs text-slate-500">
          *Facilities list is based on current campus infrastructure in Lahore and can be adjusted anytime via configuration.
        </div>

      </div>
    </section>
  );
};
