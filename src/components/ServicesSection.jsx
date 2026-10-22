import React from 'react';
import { clinicalServices } from '../data/clinicData';

export default function ServicesSection({ onSelectService, onBookService, filteredServices }) {
  const getIconClass = (icon) => {
    switch (icon) {
      case 'droplet': return 'fa-solid fa-bottle-droplet';
      case 'syringe': return 'fa-solid fa-syringe';
      case 'vial': return 'fa-solid fa-vial';
      case 'radiation': return 'fa-solid fa-radiation';
      case 'first-aid': return 'fa-solid fa-kit-medical';
      case 'lungs': return 'fa-solid fa-lungs';
      default: return 'fa-solid fa-notes-medical';
    }
  };

  return (
    <section id="services-section" className="py-8 md:py-14 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 md:mb-10 gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-full uppercase tracking-wider mb-2">
              <i className="fa-solid fa-plus text-[10px]"></i> In-House Clinical Facilities
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 font-display tracking-tight">
              Clinical Procedures & Diagnostic Support
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xl">
              Fast, sterile and safe procedures conducted on-site with zero unnecessary waiting times.
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <span className="text-xs font-semibold text-emerald-800 bg-emerald-100/80 px-3 py-1 rounded-full border border-emerald-300">
              <i className="fa-solid fa-circle-check text-emerald-600 mr-1"></i> Walk-ins Welcome 7 Days
            </span>
          </div>
        </div>

        {/* Services Grid (Responsive: 2 columns on mobile, 3 on tablet, 3 or 6 on desktop) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 sm:gap-6">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200 shadow-sm hover:shadow-md hover:border-teal-500/80 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-start justify-between mb-3">
                  <div className={`w-11 h-11 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center text-lg sm:text-xl font-bold shadow-sm ${service.iconColor} group-hover:scale-105 transition-transform`}>
                    <i className={getIconClass(service.icon)}></i>
                  </div>
                  <span className="text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                    {service.badge}
                  </span>
                </div>

                <h3 className="font-bold text-sm sm:text-base text-slate-900 mb-1 font-display">
                  {service.title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed mb-3">
                  {service.shortDesc}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                <button
                  onClick={() => onSelectService(service)}
                  className="text-xs font-bold text-teal-700 hover:text-teal-900 flex items-center gap-1 transition"
                >
                  <span>Details</span>
                  <i className="fa-solid fa-arrow-right text-[10px]"></i>
                </button>
                <button
                  onClick={() => onBookService(service.title)}
                  className="bg-slate-100 hover:bg-teal-600 hover:text-white text-slate-700 text-[11px] font-bold px-2.5 py-1 rounded-lg transition"
                >
                  Avail Service
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Highlight Banner for emergency requests */}
        <div className="mt-8 bg-gradient-to-r from-teal-800 to-slate-900 rounded-2xl p-4 sm:p-6 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
          <div className="flex items-center gap-3.5 text-center sm:text-left">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-2xl shrink-0">
              <i className="fa-solid fa-truck-medical"></i>
            </div>
            <div>
              <h4 className="font-bold text-sm sm:text-base font-display">Need Immediate Saline, Injections, or First Aid?</h4>
              <p className="text-xs text-teal-200">No appointment necessary. Walk directly into our ECIL clinic or call ahead.</p>
            </div>
          </div>
          <a
            href="tel:9533551700"
            className="w-full sm:w-auto text-center bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white font-bold py-2.5 px-5 rounded-xl text-xs sm:text-sm transition shadow shrink-0"
          >
            <i className="fa-solid fa-phone mr-1.5"></i> Call Helpline: 9533551700
          </a>
        </div>

      </div>
    </section>
  );
}
