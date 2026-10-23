import React, { useState } from 'react';
import { faqs } from '../data/clinicData';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section className="py-8 md:py-14 bg-royal-subtle border-b border-royal-border">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-royal bg-white px-3 py-1 rounded-full uppercase tracking-wider mb-2 border border-purple-200">
            <i className="fa-solid fa-circle-question text-royal"></i> Need Information?
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-royal-dark font-display tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Common questions regarding doctor tokens, diagnostics, pharmacy, and walk-in saline procedures.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-purple-200 shadow-sm overflow-hidden transition-all"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-3 text-xs sm:text-sm font-bold text-royal-dark hover:text-royal transition"
                >
                  <span>{faq.question}</span>
                  <div className={`w-7 h-7 rounded-full bg-purple-50 flex items-center justify-center text-xs text-royal shrink-0 transition-transform ${isOpen ? 'rotate-180 bg-royal text-white' : ''}`}>
                    <i className="fa-solid fa-chevron-down"></i>
                  </div>
                </button>

                {isOpen && (
                  <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-purple-100 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
