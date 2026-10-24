import React from 'react';
import { diagnosticsPackages, clinicInfo } from '../data/clinicData';

export default function DiagnosticsSection({ onBookDiagnostics }) {
  return (
    <section id="diagnostics-section" className="py-10 md:py-14 bg-slate-50 border-b border-purple-100">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-3">
          <div>
            <h2 className="text-xl sm:text-3xl font-black text-royal-dark font-display tracking-tight">
              Diagnostics Lab & Scans
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Certified automated blood tests & ultrasound scans with same-day reports on WhatsApp.
            </p>
          </div>
        </div>

        {/* 4 Clean Packages Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {diagnosticsPackages.map((pkg) => (
            <div
              key={pkg.id}
              className="bg-white rounded-2xl p-4 sm:p-5 border border-purple-100 flex flex-col justify-between hover:shadow-md transition"
            >
              <div>
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-purple-50 text-royal border border-purple-100">
                  {pkg.badge}
                </span>

                <h3 className="font-bold text-sm sm:text-base text-royal-dark mt-2 mb-1 leading-snug">
                  {pkg.title}
                </h3>
                
                <p className="text-[11px] text-purple-700 font-semibold mb-2">
                  {pkg.highlight}
                </p>

                <p className="text-xs text-slate-500 bg-purple-50/50 p-2.5 rounded-xl border border-purple-50 leading-relaxed mb-4">
                  {pkg.tests}
                </p>
              </div>

              <button
                onClick={() => onBookDiagnostics(pkg.title)}
                className="w-full bg-royal hover:bg-royal-dark active:scale-95 text-white font-bold py-2 rounded-xl text-xs transition"
              >
                Book Test
              </button>
            </div>
          ))}
        </div>

        {/* Clean Home Sample Callout */}
        <div className="mt-6 bg-white rounded-2xl p-4 sm:p-5 border border-purple-100 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-100 text-royal flex items-center justify-center text-lg shrink-0">
              <i className="fa-solid fa-house-medical"></i>
            </div>
            <div>
              <h4 className="font-bold text-xs sm:text-sm text-royal-dark">Home Blood Sample Collection Available</h4>
              <p className="text-[11px] text-slate-500">Trained phlebotomists visit your home anywhere in ECIL and South Kamala Nagar.</p>
            </div>
          </div>

          <a
            href={`https://wa.me/${clinicInfo.whatsapp}?text=Hello%20Dr.%20Jerri%20Diagnostics,%20I%20would%20like%20to%20book%20a%20Home%20Sample%20Collection`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto bg-purple-50 hover:bg-royal hover:text-white text-royal border border-purple-200 font-bold text-xs px-4 py-2 rounded-xl transition text-center shrink-0"
          >
            Book Home Collection
          </a>
        </div>

      </div>
    </section>
  );
}
