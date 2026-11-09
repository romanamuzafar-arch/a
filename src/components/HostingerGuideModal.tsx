import React, { useState } from 'react';
import { X, Server, Terminal, Copy, Check, FileCode, Globe, Shield, ArrowRight } from 'lucide-react';

interface HostingerGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HostingerGuideModal: React.FC<HostingerGuideModalProps> = ({ isOpen, onClose }) => {
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  if (!isOpen) return null;

  const copyToClipboard = (text: string, sectionId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(sectionId);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const htaccessContent = `<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>`;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-3xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-6 bg-[#0f244a] text-white flex items-center justify-between border-b border-blue-900">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-[#0f244a] flex items-center justify-center font-bold">
              <Server className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">
                Hostinger & Production Deployment Guide
              </h3>
              <p className="text-xs text-slate-300">
                Achievers Grammar School & Academy · Production Deployment Handbook
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-300 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close Guide"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-sm text-slate-700">
          
          {/* Step 1: Local Run */}
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-2">
            <div className="flex items-center gap-2 font-bold text-[#0f244a]">
              <Terminal className="w-4 h-4 text-blue-700" />
              <h4>1. How to Run Locally</h4>
            </div>
            <p className="text-xs text-slate-600">
              To test and run this project on your personal computer:
            </p>
            <div className="bg-slate-900 text-slate-100 p-3 rounded-lg font-mono text-xs relative">
              <code>
                npm install<br />
                npm run dev
              </code>
              <button
                type="button"
                onClick={() => copyToClipboard('npm install\nnpm run dev', 'local')}
                className="absolute top-2 right-2 p-1.5 text-slate-400 hover:text-white bg-slate-800 rounded cursor-pointer"
              >
                {copiedSection === 'local' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Step 2: Build for Production */}
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-2">
            <div className="flex items-center gap-2 font-bold text-[#0f244a]">
              <FileCode className="w-4 h-4 text-emerald-700" />
              <h4>2. Build for Production</h4>
            </div>
            <p className="text-xs text-slate-600">
              Run the Vite build command to generate the minified, production-ready static assets:
            </p>
            <div className="bg-slate-900 text-slate-100 p-3 rounded-lg font-mono text-xs relative">
              <code>npm run build</code>
              <button
                type="button"
                onClick={() => copyToClipboard('npm run build', 'build')}
                className="absolute top-2 right-2 p-1.5 text-slate-400 hover:text-white bg-slate-800 rounded cursor-pointer"
              >
                {copiedSection === 'build' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
            <p className="text-xs text-slate-500">
              This outputs all static HTML, CSS, JavaScript, and images into the <code className="font-mono text-blue-900">dist/</code> folder.
            </p>
          </div>

          {/* Step 3: Uploading to Hostinger */}
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
            <div className="flex items-center gap-2 font-bold text-[#0f244a]">
              <Globe className="w-4 h-4 text-amber-600" />
              <h4>3. Deploying to Hostinger Web Hosting (hPanel)</h4>
            </div>
            <ol className="text-xs space-y-2 list-decimal list-inside text-slate-600">
              <li>Log in to your <strong>Hostinger hPanel</strong> account.</li>
              <li>Navigate to <strong>Websites</strong> &rarr; Select your domain &rarr; Click <strong>File Manager</strong>.</li>
              <li>Open the <code className="font-mono bg-white px-1.5 py-0.5 rounded border">public_html</code> directory.</li>
              <li>Upload all files and folders located inside the local <code className="font-mono bg-white px-1.5 py-0.5 rounded border">dist/</code> directory directly into <code className="font-mono bg-white px-1.5 py-0.5 rounded border">public_html</code>.</li>
              <li>Ensure <code className="font-mono bg-white px-1.5 py-0.5 rounded border">index.html</code> is directly at the root of <code className="font-mono bg-white px-1.5 py-0.5 rounded border">public_html/index.html</code>.</li>
            </ol>
          </div>

          {/* Step 4: .htaccess for Hostinger */}
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-2">
            <div className="flex items-center gap-2 font-bold text-[#0f244a]">
              <Shield className="w-4 h-4 text-indigo-700" />
              <h4>4. Single Page Application (.htaccess) for Hostinger Apache</h4>
            </div>
            <p className="text-xs text-slate-600">
              To support direct browser reloads and smooth routing on Hostinger, create a file named <code className="font-mono bg-white px-1.5 py-0.5 rounded border">.htaccess</code> inside <code className="font-mono bg-white px-1.5 py-0.5 rounded border">public_html</code> with this content:
            </p>
            <div className="bg-slate-900 text-slate-100 p-3 rounded-lg font-mono text-xs relative overflow-x-auto">
              <pre>{htaccessContent}</pre>
              <button
                type="button"
                onClick={() => copyToClipboard(htaccessContent, 'htaccess')}
                className="absolute top-2 right-2 p-1.5 text-slate-400 hover:text-white bg-slate-800 rounded cursor-pointer"
              >
                {copiedSection === 'htaccess' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Step 5: Netlify Deployment */}
          <div className="bg-emerald-50/70 p-5 rounded-2xl border border-emerald-200 space-y-3">
            <div className="flex items-center gap-2 font-bold text-emerald-950">
              <Globe className="w-4 h-4 text-emerald-700" />
              <h4>5. Deploying to Netlify (Continuous Deployment & Drag-and-Drop)</h4>
            </div>
            <p className="text-xs text-emerald-900">
              All images are placed in <code className="font-mono bg-white px-1.5 py-0.5 rounded border">public/images/</code> and automatically bundled into <code className="font-mono bg-white px-1.5 py-0.5 rounded border">dist/images/</code> on build:
            </p>
            <ul className="text-xs space-y-1.5 list-disc list-inside text-emerald-900">
              <li><strong>Build Command:</strong> <code className="font-mono bg-white px-1.5 py-0.5 rounded">npm run build</code></li>
              <li><strong>Publish Directory:</strong> <code className="font-mono bg-white px-1.5 py-0.5 rounded">dist</code></li>
              <li><strong>SPA Redirects:</strong> Configured in <code className="font-mono bg-white px-1.5 py-0.5 rounded">public/_redirects</code> and <code className="font-mono bg-white px-1.5 py-0.5 rounded">netlify.toml</code>.</li>
              <li><strong>Image Paths:</strong> Canonical paths like <code className="font-mono bg-white px-1.5 py-0.5 rounded">/images/hero-school-campus.jpg</code> work seamlessly in both local and production environments.</li>
            </ul>
          </div>

          {/* Step 5: Updating School Content */}
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-950 text-xs space-y-1">
            <p className="font-bold">How to Edit School Content Anytime:</p>
            <p>
              Open <code className="font-mono bg-white px-1.5 py-0.5 rounded border">src/config/schoolConfig.ts</code>. You can change the school phone number (<code className="font-mono">0321 7540210</code>), WhatsApp number, campus address, teacher profiles, academic programs, and testimonials in one central place.
            </p>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-100 border-t border-slate-200 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 text-xs sm:text-sm font-bold text-white bg-[#0f244a] hover:bg-[#183669] rounded-xl transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};
