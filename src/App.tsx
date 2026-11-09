import React, { useState } from 'react';
import { CreativeWritingStudio } from './components/CreativeWritingStudio';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Academics } from './components/Academics';
import { WhyChooseUs } from './components/WhyChooseUs';
import { Facilities } from './components/Facilities';
import { Stats } from './components/Stats';
import { Admissions } from './components/Admissions';
import { Faculty } from './components/Faculty';
import { Gallery } from './components/Gallery';
import { Testimonials } from './components/Testimonials';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { QuickEnquiryModal } from './components/QuickEnquiryModal';
import { HostingerGuideModal } from './components/HostingerGuideModal';
import { Feather, School, Sliders } from 'lucide-react';

export default function App() {
  // Active App View: 'writing' (Creative Writing Interface) or 'school' (Achievers Grammar School Website)
  const [activeView, setActiveView] = useState<'writing' | 'school'>('writing');

  // Modals state
  const [isAdmissionModalOpen, setIsAdmissionModalOpen] = useState(false);
  const [isHostingerGuideOpen, setIsHostingerGuideOpen] = useState(false);
  const [preselectedProgram, setPreselectedProgram] = useState<string | undefined>(undefined);

  const handleOpenAdmissionModal = (programTitle?: string) => {
    if (programTitle) {
      setPreselectedProgram(programTitle);
    }
    setIsAdmissionModalOpen(true);
  };

  const handleSelectProgramFromAcademics = (programTitle: string) => {
    setPreselectedProgram(programTitle);
    const admissionsElement = document.getElementById('admissions');
    if (admissionsElement) {
      admissionsElement.scrollIntoView({ behavior: 'smooth' });
    } else {
      setIsAdmissionModalOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans antialiased selection:bg-amber-400 selection:text-[#0f244a]">
      
      {/* Top Application Mode Switcher Bar */}
      <div className="bg-[#060d17] border-b border-slate-800 text-white px-4 py-2 sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
          
          <div className="flex items-center gap-2">
            <span className="font-bold text-amber-400">Application Mode:</span>
            <span className="text-slate-400 hidden sm:inline">
              Switch between Creative Writing AI Studio and School Website
            </span>
          </div>

          <div className="flex items-center gap-1.5 p-1 bg-slate-900/90 rounded-xl border border-slate-700/80">
            <button
              type="button"
              onClick={() => setActiveView('writing')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                activeView === 'writing'
                  ? 'bg-amber-400 text-[#0f244a] shadow-xs'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Feather className="w-3.5 h-3.5" />
              <span>Creative Writing Studio (Mood Slider)</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveView('school')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                activeView === 'school'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <School className="w-3.5 h-3.5" />
              <span>Achievers Grammar School</span>
            </button>
          </div>

        </div>
      </div>

      {activeView === 'writing' ? (
        /* ================= Creative Writing Interface ================= */
        <main>
          <CreativeWritingStudio />
        </main>
      ) : (
        /* ================= Achievers Grammar School Website ================= */
        <>
          <Header onOpenAdmissionModal={() => handleOpenAdmissionModal()} />

          <main>
            <Hero onOpenAdmissionModal={() => handleOpenAdmissionModal()} />
            <About onOpenAdmissionModal={() => handleOpenAdmissionModal()} />
            <Academics onSelectProgramForAdmission={handleSelectProgramFromAcademics} />
            <WhyChooseUs />
            <Facilities />
            <Stats />
            <Admissions preselectedProgram={preselectedProgram} />
            <Faculty />
            <Gallery />
            <Testimonials />
            <Contact />
          </main>

          <Footer 
            onOpenHostingerGuide={() => setIsHostingerGuideOpen(true)}
            onOpenAdmissionModal={() => handleOpenAdmissionModal()} 
          />

          <FloatingWhatsApp />

          <QuickEnquiryModal
            isOpen={isAdmissionModalOpen}
            onClose={() => {
              setIsAdmissionModalOpen(false);
              setPreselectedProgram(undefined);
            }}
            initialClass={preselectedProgram}
          />

          <HostingerGuideModal
            isOpen={isHostingerGuideOpen}
            onClose={() => setIsHostingerGuideOpen(false)}
          />
        </>
      )}

    </div>
  );
}
