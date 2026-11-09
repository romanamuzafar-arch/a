import React from 'react';
import { GraduationCap, Phone, MapPin, Mail, Clock, MessageCircle, ArrowUp, ExternalLink, HelpCircle } from 'lucide-react';
import { schoolConfig } from '../config/schoolConfig';

interface FooterProps {
  onOpenHostingerGuide: () => void;
  onOpenAdmissionModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenHostingerGuide, onOpenAdmissionModal }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#081220] text-slate-300 border-t border-slate-800">
      
      {/* Top Banner with Quick WhatsApp & Admission Notice */}
      <div className="bg-[#0f244a] py-6 border-b border-blue-900/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <h4 className="text-base sm:text-lg font-bold text-white flex items-center justify-center md:justify-start gap-2">
              <span>Enroll Your Child at Achievers Grammar School & Academy</span>
            </h4>
            <p className="text-xs text-slate-300 mt-0.5">
              Montessori to Matriculation & Evening Coaching Academy in Lahore, Pakistan.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={onOpenAdmissionModal}
              className="px-5 py-2 text-xs sm:text-sm font-bold text-[#0f244a] bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors shadow-xs cursor-pointer"
            >
              Apply for Admission
            </button>
            <a
              href={schoolConfig.getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-bold text-emerald-300 bg-emerald-950/80 border border-emerald-600/60 hover:bg-emerald-900/80 rounded-lg transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>WhatsApp: 0321 7540210</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Brand & Introduction (Col 1-4) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-700 to-blue-900 text-amber-400 flex items-center justify-center shadow-md border border-blue-800">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <span className="font-extrabold text-lg tracking-tight text-white block leading-none">
                  ACHIEVERS
                </span>
                <span className="text-xs text-slate-400 font-medium tracking-normal">
                  Grammar School & Academy · Lahore
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Dedicated to delivering an inspiring, conceptually rich educational journey in Lahore. Building character, nurturing intellect, and preparing tomorrow's achievers with integrity and academic distinction.
            </p>

            <div className="pt-2 text-xs text-slate-400 space-y-1">
              <p><strong className="text-slate-200">School Reg:</strong> Lahore, Punjab, Pakistan</p>
              <p><strong className="text-slate-200">Shifts:</strong> Morning School & Evening Academy</p>
            </div>
          </div>

          {/* Quick Links (Col 5-6) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li><a href="#home" className="hover:text-amber-400 transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-amber-400 transition-colors">About Our School</a></li>
              <li><a href="#academics" className="hover:text-amber-400 transition-colors">Academic Programs</a></li>
              <li><a href="#admissions" className="hover:text-amber-400 transition-colors">Admissions 2026–27</a></li>
              <li><a href="#facilities" className="hover:text-amber-400 transition-colors">Campus Facilities</a></li>
              <li><a href="#gallery" className="hover:text-amber-400 transition-colors">School Gallery</a></li>
              <li><a href="#contact" className="hover:text-amber-400 transition-colors">Contact & Location</a></li>
            </ul>
          </div>

          {/* Academic Offerings (Col 7-9) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Academic Wings
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-400">
              <li>Montessori & Early Childhood (Playgroup to Prep)</li>
              <li>Primary School (Grades 1 to 5)</li>
              <li>Middle School Wing (Grades 6 to 8)</li>
              <li>Secondary Matriculation Wing (Classes 9 & 10)</li>
              <li>Achievers Evening Academy (Board Prep & Test Series)</li>
              <li>Remedial Subject Coaching & Guidance</li>
            </ul>
          </div>

          {/* Contact Details & WhatsApp (Col 10-12) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Campus Contact
            </h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>{schoolConfig.institution.addressPlaceholder}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <a href={`tel:${schoolConfig.contact.phone.replace(/\s+/g, '')}`} className="hover:text-white">
                  {schoolConfig.contact.phone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href={schoolConfig.getWhatsAppUrl()} target="_blank" rel="noopener noreferrer" className="hover:text-emerald-300 font-medium">
                  WhatsApp: 0321 7540210
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{schoolConfig.contact.email}</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>{schoolConfig.contact.hours.morningSchool}</span>
              </div>
            </div>

            {/* Social media placeholders */}
            <div className="pt-2">
              <span className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold block mb-2">
                Connect With Us
              </span>
              <div className="flex items-center gap-2">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-blue-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors text-xs font-bold"
                  title="Facebook (Placeholder)"
                >
                  f
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-red-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors text-xs font-bold"
                  title="YouTube (Placeholder)"
                >
                  ▶
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-pink-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors text-xs font-bold"
                  title="Instagram (Placeholder)"
                >
                  ig
                </a>
              </div>
            </div>

          </div>

        </div>

        {/* Bottom Bar: Copyright, Deployment Guide trigger & Back to Top */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} {schoolConfig.institution.fullName} – Lahore, Pakistan. All Rights Reserved.
          </div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={onOpenHostingerGuide}
              className="inline-flex items-center gap-1.5 text-amber-400 hover:text-amber-300 font-medium transition-colors cursor-pointer"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Hostinger & Deployment Guide</span>
            </button>

            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1 text-slate-400 hover:text-white transition-colors cursor-pointer p-1"
              aria-label="Back to top"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
