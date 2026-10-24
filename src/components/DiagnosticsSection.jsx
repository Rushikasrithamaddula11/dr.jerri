import React from 'react';
import { diagnosticsPackages, clinicInfo } from '../data/clinicData';

export default function DiagnosticsSection({ onBookDiagnostics }) {
  return (
    <section id="diagnostics-section" className="py-8 md:py-14 bg-white border-b border-royal-border">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-royal bg-purple-100 px-3 py-1 rounded-full uppercase tracking-wider mb-2 border border-purple-200">
              <i className="fa-solid fa-microscope text-royal"></i> Advanced Diagnostics & Scans
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-royal-dark font-display tracking-tight">
              Dr. Jerri Diagnostic Lab & Ultrasound
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
              Certified automated clinical analyzers & diagnostic ultrasound imaging. Accurate results delivered quickly to your WhatsApp with free doctor review.
            </p>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => onBookDiagnostics('Diagnostics / Lab Test')}
              className="w-full sm:w-auto bg-royal hover:bg-royal-dark active:scale-95 text-white font-bold px-4 py-2.5 rounded-xl text-xs sm:text-sm shadow-md shadow-royal/20 transition flex items-center justify-center gap-1.5"
            >
              <i className="fa-solid fa-calendar-check"></i>
              <span>Book Lab Test / Scan</span>
            </button>
          </div>
        </div>

        {/* Feature Badges Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3 mb-6 sm:mb-8">
          <div className="bg-royal-subtle p-3 sm:p-3.5 rounded-2xl border border-purple-200 flex items-center gap-2.5 sm:gap-3">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-royal text-white flex items-center justify-center shrink-0 text-xs sm:text-sm">
              <i className="fa-solid fa-clock-rotate-left"></i>
            </div>
            <div className="min-w-0">
              <h4 className="font-bold text-xs text-royal-dark truncate">Same-Day Reports</h4>
              <p className="text-[10px] sm:text-[11px] text-slate-500 truncate">Fast digital delivery</p>
            </div>
          </div>

          <div className="bg-royal-subtle p-3 sm:p-3.5 rounded-2xl border border-purple-200 flex items-center gap-2.5 sm:gap-3">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-royal text-white flex items-center justify-center shrink-0 text-xs sm:text-sm">
              <i className="fa-solid fa-house-medical"></i>
            </div>
            <div className="min-w-0">
              <h4 className="font-bold text-xs text-royal-dark truncate">Home Sample Pickup</h4>
              <p className="text-[10px] sm:text-[11px] text-slate-500 truncate">ECIL & Kamala Nagar</p>
            </div>
          </div>

          <div className="bg-royal-subtle p-3 sm:p-3.5 rounded-2xl border border-purple-200 flex items-center gap-2.5 sm:gap-3">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-royal text-white flex items-center justify-center shrink-0 text-xs sm:text-sm">
              <i className="fa-solid fa-radiation"></i>
            </div>
            <div className="min-w-0">
              <h4 className="font-bold text-xs text-royal-dark truncate">Ultrasound Scans</h4>
              <p className="text-[10px] sm:text-[11px] text-slate-500 truncate">Abdomen, Pelvic & Pregnancy</p>
            </div>
          </div>

          <div className="bg-royal-subtle p-3 sm:p-3.5 rounded-2xl border border-purple-200 flex items-center gap-2.5 sm:gap-3">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-royal text-white flex items-center justify-center shrink-0 text-xs sm:text-sm">
              <i className="fa-solid fa-shield-halved"></i>
            </div>
            <div className="min-w-0">
              <h4 className="font-bold text-xs text-royal-dark truncate">100% Sterile & Precise</h4>
              <p className="text-[10px] sm:text-[11px] text-slate-500 truncate">Calibrated equipment</p>
            </div>
          </div>
        </div>

        {/* Diagnostics Packages Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {diagnosticsPackages.map((pkg) => (
            <div
              key={pkg.id}
              className="bg-white rounded-3xl p-5 border border-purple-200 shadow-sm hover:shadow-lg hover:border-royal transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-purple-100 text-royal-dark border border-purple-200 uppercase">
                    {pkg.badge}
                  </span>
                  <div className="w-8 h-8 rounded-xl bg-royal-subtle text-royal flex items-center justify-center text-xs group-hover:bg-royal group-hover:text-white transition">
                    <i className="fa-solid fa-vial"></i>
                  </div>
                </div>

                <h3 className="font-black text-sm sm:text-base text-royal-dark font-display mb-1.5">
                  {pkg.title}
                </h3>
                
                <p className="text-[11px] text-royal font-bold mb-2">
                  <i className="fa-solid fa-sparkles mr-1"></i> {pkg.highlight}
                </p>

                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 text-xs text-slate-600 mb-4 leading-relaxed">
                  <span className="font-bold text-slate-800 text-[11px] block mb-1">Includes:</span>
                  {pkg.tests}
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center gap-2">
                <button
                  onClick={() => onBookDiagnostics(pkg.title)}
                  className="w-full bg-royal hover:bg-royal-dark text-white font-bold py-2.5 rounded-xl text-xs transition shadow-sm flex items-center justify-center gap-1.5"
                >
                  <i className="fa-regular fa-calendar-check"></i>
                  <span>Book This Test</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Home Collection Callout */}
        <div className="mt-8 bg-gradient-to-r from-royal via-purple-800 to-royal-dark rounded-3xl p-5 sm:p-6 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-12 h-12 rounded-2xl bg-white/20 text-white flex items-center justify-center text-2xl shrink-0">
              <i className="fa-solid fa-truck-medical"></i>
            </div>
            <div>
              <h4 className="font-black text-base sm:text-lg font-display">Need Home Sample Collection for Blood Tests?</h4>
              <p className="text-xs text-purple-200">Our trained phlebotomist visits your doorstep anywhere in ECIL and South Kamala Nagar.</p>
            </div>
          </div>
          
          <a
            href={`https://wa.me/${clinicInfo.whatsapp}?text=Hello%20Dr.%20Jerri%20Diagnostics,%20I%20would%20like%20to%20book%20a%20Home%20Sample%20Collection`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto text-center bg-white hover:bg-purple-50 text-royal-dark font-black py-3 px-6 rounded-2xl text-xs sm:text-sm transition shadow shrink-0"
          >
            <i className="fa-brands fa-whatsapp text-royal text-base mr-1.5"></i>
            <span>Book Home Collection</span>
          </a>
        </div>

      </div>
    </section>
  );
}
