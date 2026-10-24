import React from 'react';
import { clinicInfo, clinicalServices } from '../data/clinicData';

export default function ServicesPage({ onSelectService, onBookService }) {
  const getIconClass = (icon) => {
    switch (icon) {
      case 'vial': return 'fa-solid fa-vial';
      case 'pills': return 'fa-solid fa-pills';
      case 'droplet': return 'fa-solid fa-bottle-droplet';
      case 'syringe': return 'fa-solid fa-syringe';
      case 'radiation': return 'fa-solid fa-radiation';
      case 'first-aid': return 'fa-solid fa-kit-medical';
      case 'lungs': return 'fa-solid fa-lungs';
      default: return 'fa-solid fa-notes-medical';
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-royal-dark via-royal to-purple-900 text-white py-12 md:py-16 border-b border-purple-800">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 bg-white/15 px-3.5 py-1 rounded-full text-xs font-bold text-purple-200">
              <i className="fa-solid fa-notes-medical text-pink-300"></i> Walk-in Clinical Facilities
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display tracking-tight text-white">
              Clinical Procedures & Emergency Care
            </h1>
            <p className="text-xs sm:text-sm text-purple-100 max-w-2xl leading-relaxed">
              No long hospital waiting times! Walk in immediately to Dr. Jerri Poly Clinic for doctor-supervised Saline IV rehydration, sterile injections, tetanus shots, first aid wound suturing, and nebulizer breathing therapy.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 -mt-6 relative z-10 space-y-8">
        
        {/* Services Full Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clinicalServices.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-3xl p-6 border border-purple-200 shadow-md hover:shadow-xl hover:border-royal transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl font-bold bg-royal text-white shadow-md shadow-royal/20 group-hover:scale-105 transition-transform">
                    <i className={getIconClass(service.icon)}></i>
                  </div>
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-purple-50 text-royal-dark border border-purple-100">
                    {service.badge}
                  </span>
                </div>

                <h3 className="font-black text-lg text-royal-dark mb-2 font-display">
                  {service.title}
                </h3>
                
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {service.detailedDesc || service.shortDesc}
                </p>

                {/* Highlights list */}
                {service.highlights && (
                  <div className="space-y-1.5 mb-5 bg-purple-50/50 p-3 rounded-2xl border border-purple-100 text-xs">
                    {service.highlights.map((h, i) => (
                      <div key={i} className="flex items-start gap-2 text-slate-700">
                        <i className="fa-solid fa-circle-check text-royal text-[11px] mt-0.5 shrink-0"></i>
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-purple-100 flex items-center justify-between gap-2">
                <button
                  onClick={() => onSelectService(service)}
                  className="text-xs font-bold text-royal hover:text-royal-dark flex items-center gap-1.5 transition py-1"
                >
                  <span>Highlights</span>
                  <i className="fa-solid fa-arrow-right text-[10px]"></i>
                </button>
                <button
                  onClick={() => onBookService(service.title)}
                  className="bg-royal hover:bg-royal-dark text-white text-xs font-bold px-4 py-2.5 rounded-xl transition shadow-sm active:scale-95 flex items-center gap-1.5"
                >
                  <i className="fa-regular fa-calendar-check text-[11px]"></i>
                  <span>Avail Service</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Emergency Notice Card */}
        <div className="bg-gradient-to-r from-royal via-purple-800 to-royal-dark text-white rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="w-14 h-14 rounded-2xl bg-white/20 text-white flex items-center justify-center text-2xl shrink-0">
              <i className="fa-solid fa-hospital-user"></i>
            </div>
            <div>
              <h3 className="font-black text-lg sm:text-xl font-display">Need Immediate Saline or First Aid?</h3>
              <p className="text-xs text-purple-100 max-w-xl mt-0.5">
                Walk directly into Dr. Jerri Poly Clinic at ECIL South Kamala Nagar. Clean air-conditioned day-care beds, continuous vitals monitoring, and licensed nurses are always on duty.
              </p>
            </div>
          </div>

          <a
            href={`tel:${clinicInfo.phone}`}
            className="bg-white text-royal-dark hover:bg-purple-50 active:scale-95 font-black py-3 px-6 rounded-2xl text-xs sm:text-sm transition shadow shrink-0 flex items-center gap-2"
          >
            <i className="fa-solid fa-phone text-royal text-base"></i>
            <span>Emergency Call: {clinicInfo.phone}</span>
          </a>
        </div>

      </div>

    </div>
  );
}
