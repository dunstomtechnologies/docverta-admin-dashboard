import React from 'react';
import { HelpCircle } from 'lucide-react';

export const FAQsPage: React.FC = () => {
  const faqs = [
    {
      q: 'How does doctor credentialing and NMC license verification work?',
      a: 'Admins verify submitted medical council registration certificates and degrees against NMC/State registries before issuing active consultation permissions.',
    },
    {
      q: 'What is the privacy policy for patient Family Member records?',
      a: 'Under the Docverta security model, family member records are read-only for administrators. Modifying or exporting personal identification details is strictly disabled.',
    },
    {
      q: 'How are online video appointments secured?',
      a: 'All teleconsultation calls are encrypted end-to-end via WebRTC protocols and compliant with telemedicine practice guidelines.',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="text-base font-bold text-slate-900">FAQ & Knowledge Base Management</h3>
        <p className="text-xs text-slate-500 mt-0.5">
          Frequently asked questions shown in Doctor and Patient mobile apps
        </p>

        <div className="mt-5 space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="rounded-xl border border-slate-200 p-4 bg-slate-50/50">
              <h4 className="text-xs font-bold text-slate-900 flex items-center gap-2">
                <HelpCircle className="h-4 w-4 text-blue-600 shrink-0" />
                {faq.q}
              </h4>
              <p className="mt-1.5 text-xs text-slate-600 pl-6 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
