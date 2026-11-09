import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, MessageCircle, Send, CheckCircle2, AlertCircle, ExternalLink, Navigation } from 'lucide-react';
import { schoolConfig } from '../config/schoolConfig';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: 'General Enquiry',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Please provide your full name.';
    
    const cleanPhone = formData.phone.replace(/[\s-]/g, '');
    if (!cleanPhone) {
      newErrors.phone = 'Please provide your contact phone number.';
    } else if (cleanPhone.length < 10) {
      newErrors.phone = 'Please enter a complete phone number.';
    }

    if (!formData.message.trim()) newErrors.message = 'Please enter your message or query.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setSubmitted(true);
    }
  };

  const getCustomWhatsAppUrl = () => {
    const text = `Assalam-o-Alaikum! I am reaching out from the Achievers Grammar School website:
- Name: ${formData.name || 'Parent'}
- Phone: ${formData.phone || 'N/A'}
- Subject: ${formData.subject}
- Message: ${formData.message || 'I would like more information about the school/academy.'}`;
    return schoolConfig.getWhatsAppUrl(text);
  };

  return (
    <section id="contact" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-amber-700 bg-amber-50 inline-block px-3 py-1 rounded-full border border-amber-200 mb-3">
            Get in Touch
          </p>
          <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0f244a] tracking-tight">
            Contact & Campus Location
          </h2>
          <p className="mt-4 text-slate-600 text-base sm:text-lg">
            Have questions about admissions, faculty, or evening academy schedules? Visit our campus in Lahore or connect directly with our administration.
          </p>
        </div>

        {/* 2-Column Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Contact Cards, Timing & Map */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Quick Contact Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Phone Card */}
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-900 flex items-center justify-center mb-3">
                    <Phone className="w-5 h-5" />
                  </div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Phone Numbers
                  </h4>
                  <a
                    href={`tel:${schoolConfig.contact.phone.replace(/\s+/g, '')}`}
                    className="text-base sm:text-lg font-bold text-[#0f244a] hover:text-blue-700 block mt-1"
                  >
                    {schoolConfig.contact.phone}
                  </a>
                </div>
                <span className="text-[11px] text-slate-500 mt-2 block">
                  Direct Campus Reception
                </span>
              </div>

              {/* WhatsApp Card */}
              <div className="bg-emerald-50/70 p-5 rounded-2xl border border-emerald-200 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center mb-3">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                    WhatsApp Desk
                  </h4>
                  <a
                    href={schoolConfig.getWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base sm:text-lg font-bold text-emerald-900 hover:underline block mt-1"
                  >
                    {schoolConfig.contact.whatsappNumber}
                  </a>
                </div>
                <span className="text-[11px] text-emerald-700 mt-2 block">
                  Quick Admissions & Fees Chat
                </span>
              </div>

              {/* Campus Location Card */}
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center mb-3">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Campus Address
                  </h4>
                  <p className="text-sm font-bold text-[#0f244a] mt-1 leading-snug">
                    {schoolConfig.institution.fullName}
                  </p>
                  <p className="text-xs text-slate-600 mt-1">
                    {schoolConfig.institution.addressPlaceholder}
                  </p>
                </div>
                <a
                  href={schoolConfig.institution.googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-amber-700 hover:underline flex items-center gap-1 mt-3"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Get Directions in Google Maps</span>
                </a>
              </div>

              {/* Operational Hours Card */}
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-800 flex items-center justify-center mb-3">
                    <Clock className="w-5 h-5" />
                  </div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    School & Academy Timings
                  </h4>
                  <div className="text-xs text-slate-700 mt-2 space-y-1">
                    <p><strong className="text-slate-900">Morning School:</strong> {schoolConfig.contact.hours.morningSchool}</p>
                    <p><strong className="text-slate-900">Evening Academy:</strong> {schoolConfig.contact.hours.eveningAcademy}</p>
                  </div>
                </div>
                <span className="text-[11px] text-slate-500 mt-2 block">
                  Sunday: Closed
                </span>
              </div>

            </div>

            {/* Google Maps Embed Frame */}
            <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-slate-100">
              <div className="p-3 bg-slate-800 text-white flex items-center justify-between text-xs">
                <span className="font-semibold flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-amber-400" />
                  Lahore Campus Map Location
                </span>
                <a
                  href={schoolConfig.institution.googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-400 hover:underline flex items-center gap-1 text-[11px]"
                >
                  <span>Open Full Map</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <div className="h-64 w-full">
                <iframe
                  title="Achievers Grammar School Lahore Location Map"
                  src={schoolConfig.institution.googleMapsEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

          </div>

          {/* Right Column: Contact Enquiry Form */}
          <div className="lg:col-span-6 bg-slate-50 p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm">
            <h3 className="text-2xl font-bold text-[#0f244a] mb-2 font-serif-display">
              Send an Official Message
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mb-6">
              Our front desk will review your inquiry and follow up via phone or WhatsApp.
            </p>

            {submitted ? (
              <div className="p-8 bg-white rounded-2xl border border-emerald-200 text-center space-y-4 animate-fadeIn">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold text-[#0f244a]">
                  Thank You for Contacting Us
                </h4>
                <p className="text-xs sm:text-sm text-slate-600">
                  Your message has been dispatched to our administrative queue.
                </p>
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a
                    href={getCustomWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-5 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl flex items-center justify-center gap-1.5"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Continue on WhatsApp</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', phone: '', email: '', subject: 'General Enquiry', message: '' });
                    }}
                    className="w-full sm:w-auto px-4 py-2.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl"
                  >
                    Send Another Message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Asif Ali"
                    className={`w-full px-3.5 py-2.5 text-sm rounded-lg border bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-800 ${
                      errors.name ? 'border-red-500 bg-red-50/20' : 'border-slate-300'
                    }`}
                  />
                  {errors.name && (
                    <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.name}</span>
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="0321 7540210"
                      className={`w-full px-3.5 py-2.5 text-sm rounded-lg border bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-800 ${
                        errors.phone ? 'border-red-500 bg-red-50/20' : 'border-slate-300'
                      }`}
                    />
                    {errors.phone && (
                      <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errors.phone}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Inquiry Category
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-800"
                    >
                      <option value="Admission Criteria & Class Openings">Admission Criteria & Class Openings</option>
                      <option value="Monthly Fee Structure & Registration">Monthly Fee Structure & Registration</option>
                      <option value="Evening Academy & Test Sessions">Evening Academy & Test Sessions</option>
                      <option value="Campus Tour & Meeting Appointment">Campus Tour & Meeting Appointment</option>
                      <option value="General Information">General Information</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Your Message *
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="How may our school administration assist you today?"
                    className={`w-full px-3.5 py-2.5 text-sm rounded-lg border bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-800 ${
                      errors.message ? 'border-red-500 bg-red-50/20' : 'border-slate-300'
                    }`}
                  />
                  {errors.message && (
                    <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.message}</span>
                    </p>
                  )}
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-7 py-3 text-sm font-bold text-white bg-[#0f244a] hover:bg-[#183669] rounded-xl shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4 text-amber-400" />
                    <span>Send Message</span>
                  </button>

                  <a
                    href={schoolConfig.getWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-5 py-3 text-sm font-bold text-emerald-800 bg-emerald-100 hover:bg-emerald-200 rounded-xl transition-colors flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-700" />
                    <span>Direct WhatsApp (0321 7540210)</span>
                  </a>
                </div>

              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
