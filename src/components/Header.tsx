import React, { useState, useEffect } from 'react';
import { Phone, Clock, MapPin, MessageCircle, Menu, X, ArrowRight, GraduationCap } from 'lucide-react';
import { schoolConfig } from '../config/schoolConfig';

interface HeaderProps {
  onOpenAdmissionModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenAdmissionModal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About Us', href: '#about' },
    { name: 'Academics', href: '#academics' },
    { name: 'Admissions', href: '#admissions' },
    { name: 'Facilities', href: '#facilities' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Contact Us', href: '#contact' },
  ];

  return (
    <>
      {/* Top Utility Information Bar */}
      <div className="bg-[#0b172a] text-slate-300 text-xs border-b border-slate-800/80 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-col md:flex-row justify-between items-center gap-2">
          {/* Left contact info */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 sm:gap-6 text-slate-300">
            <a 
              href={`tel:${schoolConfig.contact.phone.replace(/\s+/g, '')}`} 
              className="flex items-center gap-1.5 hover:text-amber-400 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>{schoolConfig.contact.phone}</span>
            </a>
            <div className="hidden sm:flex items-center gap-1.5 text-slate-400">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span>{schoolConfig.institution.city}, {schoolConfig.institution.country}</span>
            </div>
            <div className="hidden lg:flex items-center gap-1.5 text-slate-400">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>Morning School & Evening Academy</span>
            </div>
          </div>

          {/* Right quick actions */}
          <div className="flex items-center gap-4 text-xs">
            <span className="hidden sm:inline-block text-amber-300 font-medium bg-amber-950/60 border border-amber-600/40 px-2 py-0.5 rounded text-[11px]">
              Admissions Open 2026–2027
            </span>
            <a
              href={schoolConfig.getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp: {schoolConfig.contact.whatsappNumber}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Navigation Bar */}
      <header 
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-md py-3 border-b border-slate-200' 
            : 'bg-white py-4 border-b border-slate-100'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          
          {/* School Brand & Logo */}
          <a href="#home" className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-blue-800 rounded-lg p-1">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-[#0f244a] to-[#1e3a8a] text-white flex items-center justify-center shadow-md shadow-blue-950/20 border border-blue-900 group-hover:scale-105 transition-transform">
              <GraduationCap className="w-6 h-6 text-amber-400" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight text-[#0f244a]">
                  ACHIEVERS
                </span>
                <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                  Lahore
                </span>
              </div>
              <span className="text-xs sm:text-sm font-medium text-slate-600 tracking-normal">
                Grammar School & Academy
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-semibold text-slate-700 hover:text-blue-900 transition-colors relative py-1 hover:border-b-2 hover:border-amber-500"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Header Action Buttons (Apply for Admission & WhatsApp) */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            {/* WhatsApp Us CTA */}
            <a
              href={schoolConfig.getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 rounded-lg transition-all shadow-xs"
              title="Chat directly with our admissions office on WhatsApp"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span>WhatsApp Us</span>
            </a>

            {/* Apply for Admission Primary Button */}
            <button
              type="button"
              onClick={onOpenAdmissionModal}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-bold text-white bg-[#0f244a] hover:bg-[#183669] rounded-lg transition-all shadow-md shadow-blue-950/15 group cursor-pointer"
            >
              <span>Apply for Admission</span>
              <ArrowRight className="w-4 h-4 text-amber-400 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-700 hover:text-blue-950 hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-900"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-slate-200 shadow-xl px-4 pt-3 pb-6 animate-fadeIn">
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 text-base font-semibold text-slate-800 hover:bg-blue-50 hover:text-blue-900 rounded-md transition-colors"
                >
                  {link.name}
                </a>
              ))}
              
              <div className="pt-3 border-t border-slate-200 flex flex-col gap-2.5">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAdmissionModal();
                  }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-bold text-white bg-[#0f244a] hover:bg-[#183669] rounded-lg shadow-sm"
                >
                  <span>Apply for Admission</span>
                  <ArrowRight className="w-4 h-4 text-amber-400" />
                </button>
                
                <a
                  href={schoolConfig.getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-bold text-emerald-800 bg-emerald-50 border border-emerald-300 rounded-lg hover:bg-emerald-100 transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-600" />
                  <span>WhatsApp Us (0321 7540210)</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
