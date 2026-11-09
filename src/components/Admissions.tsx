import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, MessageCircle, Phone, Calendar, User, BookOpen, Clock } from 'lucide-react';
import { schoolConfig } from '../config/schoolConfig';

interface AdmissionsProps {
  preselectedProgram?: string;
}

export const Admissions: React.FC<AdmissionsProps> = ({ preselectedProgram }) => {
  const [formData, setFormData] = useState({
    parentName: '',
    studentName: '',
    phone: '',
    selectedClass: preselectedProgram || schoolConfig.classesList[0],
    programShift: 'Regular Morning School',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [lastSubmissionData, setLastSubmissionData] = useState<typeof formData | null>(null);

  // Update selected class if preselectedProgram prop changes
  React.useEffect(() => {
    if (preselectedProgram) {
      setFormData((prev) => ({
        ...prev,
        selectedClass: preselectedProgram,
      }));
    }
  }, [preselectedProgram]);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.parentName.trim()) {
      newErrors.parentName = 'Parent/Guardian name is required.';
    }

    if (!formData.studentName.trim()) {
      newErrors.studentName = 'Student name is required.';
    }

    const cleanPhone = formData.phone.replace(/[\s-]/g, '');
    if (!cleanPhone) {
      newErrors.phone = 'Contact phone number is required.';
    } else if (!/^03\d{9}$/.test(cleanPhone) && !/^\+923\d{9}$/.test(cleanPhone) && cleanPhone.length < 10) {
      newErrors.phone = 'Please enter a valid Pakistani mobile number (e.g., 0321 7540210).';
    }

    if (!formData.selectedClass) {
      newErrors.selectedClass = 'Please select the class applying for.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitted(true);
      setLastSubmissionData({ ...formData });
    }
  };

  const resetForm = () => {
    setFormData({
      parentName: '',
      studentName: '',
      phone: '',
      selectedClass: schoolConfig.classesList[0],
      programShift: 'Regular Morning School',
      message: '',
    });
    setErrors({});
    setIsSubmitted(false);
    setLastSubmissionData(null);
  };

  // Generate customized WhatsApp query from form data
  const getWhatsAppEnquiryUrl = () => {
    if (!lastSubmissionData) return schoolConfig.getWhatsAppUrl();
    const query = `Assalam-o-Alaikum! I have submitted an admission enquiry for Achievers Grammar School & Academy:
- Parent: ${lastSubmissionData.parentName}
- Student: ${lastSubmissionData.studentName}
- Class Applying For: ${lastSubmissionData.selectedClass} (${lastSubmissionData.programShift})
- Phone: ${lastSubmissionData.phone}
${lastSubmissionData.message ? `- Query: ${lastSubmissionData.message}` : ''}
Please guide me about the fee structure and admission test date.`;
    return schoolConfig.getWhatsAppUrl(query);
  };

  return (
    <section id="admissions" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-amber-700 bg-amber-50 inline-block px-3 py-1 rounded-full border border-amber-200 mb-3">
            Admissions Open 2026–2027
          </p>
          <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0f244a] tracking-tight">
            Give Your Child a Bright Start
          </h2>
          <p className="mt-4 text-slate-600 text-base sm:text-lg">
            Invest in a foundational education that champions critical thinking, moral development, and academic success. Join the Achievers family in Lahore today.
          </p>
        </div>

        {/* 4 Steps to Apply Grid */}
        <div className="mb-16">
          <h3 className="text-xl font-bold text-[#0f244a] mb-6 text-center">
            Simple 4-Step Admission Procedure
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {schoolConfig.admissionSteps.map((step) => (
              <div
                key={step.stepNumber}
                className="bg-slate-50 p-6 rounded-2xl border border-slate-200 relative group hover:border-blue-400 hover:shadow-md transition-all"
              >
                <div className="text-3xl font-extrabold text-amber-500 font-serif-display mb-3">
                  {step.stepNumber}
                </div>
                <h4 className="font-bold text-[#0f244a] text-base mb-2">
                  {step.title}
                </h4>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Form & Information Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start bg-slate-50 rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm">
          
          {/* Left Column: Admission Office Highlights */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-900 bg-blue-100 px-2.5 py-1 rounded">
                Official Campus Desk
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-[#0f244a] mt-3 font-serif-display">
                Admission Enquiry & Registration
              </h3>
              <p className="text-slate-600 text-sm mt-3 leading-relaxed">
                Our admissions committee welcomes prospective parents to discuss syllabus standards, curriculum balance, and class capacities.
              </p>
            </div>

            {/* Office Timing Card */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-3 shadow-xs">
              <div className="flex items-center gap-3 text-slate-800">
                <Clock className="w-5 h-5 text-amber-600 shrink-0" />
                <div>
                  <p className="text-xs font-bold uppercase text-slate-500">Admissions Desk Hours</p>
                  <p className="text-sm font-semibold">{schoolConfig.contact.hours.adminOffice}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-slate-800 pt-2 border-t border-slate-100">
                <Phone className="w-5 h-5 text-blue-800 shrink-0" />
                <div>
                  <p className="text-xs font-bold uppercase text-slate-500">Call Directly</p>
                  <p className="text-sm font-semibold">{schoolConfig.contact.phone}</p>
                </div>
              </div>
            </div>

            {/* Required Documents Checklist */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-2.5 shadow-xs">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-900">
                Documents Needed for Final Registration:
              </p>
              <ul className="text-xs text-slate-600 space-y-1.5 list-disc list-inside">
                <li>Child’s NADRA B-Form or Birth Certificate copy</li>
                <li>Father / Mother / Guardian CNIC copy</li>
                <li>Four recent passport-size student photographs</li>
                <li>Previous school progress report card (for Class 1 and above)</li>
              </ul>
            </div>

            {/* Direct WhatsApp Callout */}
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-center justify-between gap-4">
              <div className="text-xs">
                <p className="font-bold">Need Immediate Assistance?</p>
                <p className="text-emerald-700">Chat directly with the admissions officer on WhatsApp.</p>
              </div>
              <a
                href={schoolConfig.getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 px-3.5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-xs flex items-center gap-1.5"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>
            </div>

          </div>

          {/* Right Column: Admission Enquiry Form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-md">
            
            {isSubmitted ? (
              <div className="py-8 text-center space-y-5 animate-fadeIn">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                
                <div>
                  <h4 className="text-2xl font-bold text-[#0f244a]">
                    Enquiry Submitted Successfully!
                  </h4>
                  <p className="text-slate-600 text-sm mt-2 max-w-md mx-auto">
                    Thank you, <strong>{lastSubmissionData?.parentName}</strong>. Your enquiry for <strong>{lastSubmissionData?.studentName}</strong> ({lastSubmissionData?.selectedClass}) has been recorded.
                  </p>
                </div>

                <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 text-amber-900 text-xs max-w-lg mx-auto text-left">
                  <strong>Notice:</strong> As this is an online demo enquiry portal, our admissions team processes inquiries during school hours. For immediate confirmation, fee schedule, and test booking, send a copy directly to our official WhatsApp.
                </div>

                {/* Instant Send to WhatsApp Button */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                  <a
                    href={getWhatsAppEnquiryUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-md transition-colors"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>Send Enquiry to School WhatsApp</span>
                  </a>

                  <button
                    type="button"
                    onClick={resetForm}
                    className="w-full sm:w-auto px-5 py-3 text-sm font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
                  >
                    Submit Another Enquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                
                <div className="border-b border-slate-100 pb-3">
                  <h4 className="text-xl font-bold text-[#0f244a]">
                    Online Admission Enquiry Form
                  </h4>
                  <p className="text-xs text-slate-500 mt-1">
                    Fill in your details below to schedule an assessment or receive curriculum information.
                  </p>
                </div>

                {/* Parent & Student Names */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Parent / Guardian Name *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={formData.parentName}
                        onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                        placeholder="e.g. Muhammad Farooq"
                        className={`w-full px-3.5 py-2.5 text-sm rounded-lg border bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-800 ${
                          errors.parentName ? 'border-red-500 bg-red-50/20' : 'border-slate-300'
                        }`}
                      />
                    </div>
                    {errors.parentName && (
                      <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.parentName}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Student Full Name *
                    </label>
                    <input
                      type="text"
                      value={formData.studentName}
                      onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                      placeholder="e.g. Ayesha Farooq"
                      className={`w-full px-3.5 py-2.5 text-sm rounded-lg border bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-800 ${
                        errors.studentName ? 'border-red-500 bg-red-50/20' : 'border-slate-300'
                      }`}
                    />
                    {errors.studentName && (
                      <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.studentName}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Phone & Program Shift */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Phone / Mobile Number *
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
                    <span className="text-[11px] text-slate-400 mt-0.5 block">Format: 03XX XXXXXXX</span>
                    {errors.phone && (
                      <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.phone}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Preferred Shift / Program
                    </label>
                    <select
                      value={formData.programShift}
                      onChange={(e) => setFormData({ ...formData, programShift: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-800"
                    >
                      <option value="Regular Morning School">Regular Morning School (7:30 AM – 2:00 PM)</option>
                      <option value="Achievers Evening Academy">Achievers Evening Academy (3:30 PM – 7:30 PM)</option>
                      <option value="Both School & Evening Coaching">Both School & Evening Coaching</option>
                    </select>
                  </div>
                </div>

                {/* Class Applying For */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Class Applying For *
                  </label>
                  <select
                    value={formData.selectedClass}
                    onChange={(e) => setFormData({ ...formData, selectedClass: e.target.value })}
                    className={`w-full px-3.5 py-2.5 text-sm rounded-lg border bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-800 ${
                      errors.selectedClass ? 'border-red-500 bg-red-50/20' : 'border-slate-300'
                    }`}
                  >
                    {schoolConfig.classesList.map((cls, idx) => (
                      <option key={idx} value={cls}>
                        {cls}
                      </option>
                    ))}
                  </select>
                  {errors.selectedClass && (
                    <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.selectedClass}</span>
                    </p>
                  )}
                </div>

                {/* Message / Additional Query */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Message / Questions (Optional)
                  </label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about previous schooling, specific subjects of interest, or transport requirements..."
                    className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-800"
                  />
                </div>

                {/* Submit Action */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-8 py-3 text-sm font-bold text-white bg-[#0f244a] hover:bg-[#183669] rounded-xl shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4 text-amber-400" />
                    <span>Submit Admission Enquiry</span>
                  </button>

                  <a
                    href={schoolConfig.getWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1.5"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Or Chat on WhatsApp: {schoolConfig.contact.whatsappNumber}</span>
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
