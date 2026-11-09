import React, { useState } from 'react';
import { X, Send, CheckCircle2, MessageCircle, AlertCircle, Sparkles } from 'lucide-react';
import { schoolConfig } from '../config/schoolConfig';

interface QuickEnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialClass?: string;
}

export const QuickEnquiryModal: React.FC<QuickEnquiryModalProps> = ({
  isOpen,
  onClose,
  initialClass,
}) => {
  const [formData, setFormData] = useState({
    parentName: '',
    studentName: '',
    phone: '',
    selectedClass: initialClass || schoolConfig.classesList[0],
    programShift: 'Regular Morning School',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  React.useEffect(() => {
    if (initialClass) {
      setFormData((prev) => ({ ...prev, selectedClass: initialClass }));
    }
  }, [initialClass]);

  if (!isOpen) return null;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.parentName.trim()) errs.parentName = 'Parent name is required.';
    if (!formData.studentName.trim()) errs.studentName = 'Student name is required.';
    
    const cleanPhone = formData.phone.replace(/[\s-]/g, '');
    if (!cleanPhone) {
      errs.phone = 'Phone number is required.';
    } else if (cleanPhone.length < 10) {
      errs.phone = 'Please provide a valid phone number.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setSubmitted(true);
    }
  };

  const getWhatsAppSubmissionUrl = () => {
    const text = `Assalam-o-Alaikum! Admission Enquiry from Website:
- Parent: ${formData.parentName}
- Student: ${formData.studentName}
- Class: ${formData.selectedClass} (${formData.programShift})
- Phone: ${formData.phone}
${formData.message ? `- Query: ${formData.message}` : ''}
Please share the admission procedure and fee details.`;
    return schoolConfig.getWhatsAppUrl(text);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Modal Header */}
        <div className="p-6 bg-[#0f244a] text-white flex items-center justify-between border-b border-blue-900">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-400 text-[#0f244a] flex items-center justify-center font-bold">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">
                Apply for Admission 2026–2027
              </h3>
              <p className="text-xs text-slate-300">
                Achievers Grammar School & Academy · Lahore
              </p>
            </div>
          </div>
          
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-300 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto">
          {submitted ? (
            <div className="py-6 text-center space-y-4 animate-fadeIn">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <h4 className="text-xl font-bold text-[#0f244a]">
                Admission Request Recorded
              </h4>

              <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                Thank you! Your information has been successfully received. You can forward a direct copy to our admissions desk on WhatsApp for instant confirmation.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href={getWhatsAppSubmissionUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl flex items-center justify-center gap-2 shadow-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send Directly via WhatsApp</span>
                </a>

                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl"
                >
                  Close
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Parent / Guardian Name *
                  </label>
                  <input
                    type="text"
                    value={formData.parentName}
                    onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                    placeholder="e.g. Tariq Mehmood"
                    className={`w-full px-3 py-2 text-sm rounded-lg border bg-white ${
                      errors.parentName ? 'border-red-500' : 'border-slate-300'
                    }`}
                  />
                  {errors.parentName && (
                    <p className="text-xs text-red-600 mt-1">{errors.parentName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Student Name *
                  </label>
                  <input
                    type="text"
                    value={formData.studentName}
                    onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                    placeholder="e.g. Hamza Tariq"
                    className={`w-full px-3 py-2 text-sm rounded-lg border bg-white ${
                      errors.studentName ? 'border-red-500' : 'border-slate-300'
                    }`}
                  />
                  {errors.studentName && (
                    <p className="text-xs text-red-600 mt-1">{errors.studentName}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Phone / Mobile *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="0321 7540210"
                    className={`w-full px-3 py-2 text-sm rounded-lg border bg-white ${
                      errors.phone ? 'border-red-500' : 'border-slate-300'
                    }`}
                  />
                  {errors.phone && (
                    <p className="text-xs text-red-600 mt-1">{errors.phone}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Preferred Shift
                  </label>
                  <select
                    value={formData.programShift}
                    onChange={(e) => setFormData({ ...formData, programShift: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 bg-white"
                  >
                    <option value="Regular Morning School">Regular Morning School</option>
                    <option value="Evening Academy Coaching">Evening Academy Coaching</option>
                    <option value="Both School & Academy">Both School & Academy</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Class Applying For *
                </label>
                <select
                  value={formData.selectedClass}
                  onChange={(e) => setFormData({ ...formData, selectedClass: e.target.value })}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 bg-white"
                >
                  {schoolConfig.classesList.map((cls, idx) => (
                    <option key={idx} value={cls}>
                      {cls}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Message / Special Requirements
                </label>
                <textarea
                  rows={2}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Questions about syllabus, transport, or timings..."
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 bg-white"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 text-xs font-bold text-white bg-[#0f244a] hover:bg-[#183669] rounded-xl shadow-md flex items-center gap-1.5 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5 text-amber-400" />
                  <span>Submit Enquiry</span>
                </button>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};
